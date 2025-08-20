// server/products/productService.js
const db = require('../config/db');
const oracledb = require('oracledb');

const allProductService = async (filters) => {
    const connection = await db.getConnection();
    try {
        
        // 현재 실행 중인 SQL 쿼리
        sqlQuery = `
            SELECT
                P.NO AS PRODUCT_NO,
                P.NAME AS NAME,
                P.DETAIL AS DETAIL,
                TO_CHAR(P.CREATE_DATE, 'YYYY-MM-DD') AS CREATE_DATE,
                P.CATEGORY AS CATEGORY,
                P.SALES_LOCATION AS LOCATION,
                
                COALESCE(
                    TO_NUMBER(N.PRICE DEFAULT NULL ON CONVERSION ERROR),
                    A.CURRENT_PRICE
                ) AS CURRENT_PRICE_UNIFIED,
                
                COALESCE(
                    TO_NUMBER(N.VIEWS DEFAULT NULL ON CONVERSION ERROR),
                    TO_NUMBER(A.VIEWS DEFAULT NULL ON CONVERSION ERROR)
                ) AS VIEWS, 

                CASE
                    WHEN N.NO IS NOT NULL THEN 'USED'
                    WHEN A.NO IS NOT NULL THEN 'AUCTION'
                    ELSE 'UNKNOWN'
                END AS PRODUCT_TYPE,
                
                TO_CHAR(A.END_DATE, 'YYYY-MM-DD HH24:MI:SS') AS AUCTION_END_DATE,
                A.START_PRICE AS AUCTION_START_PRICE,
                A.NO2 AS AUCTION_NO,

                N.STATE AS NORMAL_STATE,
                N.REGION AS NORMAL_REGION,
                N.NO2 AS NORMAL_NO2,

                (SELECT IM.IMAGE_URL
                FROM IMAGES IM
                WHERE IM.ENTITY_TYPE = 'PRODUCT' AND IM.ENTITY_ID = P.NO
                ORDER BY IM.DISPLAY_ORDER ASC, IM.UPLOAD_DATE DESC
                FETCH FIRST 1 ROW ONLY) AS IMAGE_URL
            FROM
                PRODUCT P
            LEFT JOIN
                NORMAL N ON P.NO = N.NO2
            LEFT JOIN
                AUCTION A ON P.NO = A.NO2
            WHERE 1=1
        `;

        const binds = {};
        const conditions = [];

        // 카테고리 필터링 로직: 카테고리 이름으로 필터링
        if (filters.category) {
            conditions.push(`P.CATEGORY = (SELECT NO FROM CATEGORY WHERE NAME = :categoryName)`);
            binds.categoryName = filters.category;
        }

        if(conditions.length > 0) {
            sqlQuery += `  AND ` + conditions.join(' AND ');
        }

        sqlQuery += ` ORDER BY P.CREATE_DATE DESC`;

        const result = await connection.execute(
            sqlQuery,
            binds,
            { outFormat: oracledb.OUT_FORMAT_OBJECT } // 쿼리 결과를 객체 배열로 받도록 설정
        );

        // 서비스 레이어에서는 컨트롤러로 데이터를 반환하기 전에 로깅
        console.log('--- 백엔드 서비스: Oracle DB 쿼리 결과 (객체 배열 형식) ---');
        console.log('result.rows:', result.rows);
        console.log('result.rows가 배열인가요?', Array.isArray(result.rows));
        if (result.rows && result.rows.length > 0) {
            console.log('result.rows의 첫 번째 요소 (객체):', result.rows[0]);
        }
        console.log('----------------------------------------------------');

        return result.rows; // 쿼리 결과 반환 (이제 객체들의 배열이 됩니다.)

    } catch (err) {
        // [수정]: 메인 catch 블록의 에러 로깅을 더 안전하게
        // err가 undefined이거나 message 속성이 없을 경우를 대비
        console.error('데이터베이스 쿼리 오류 (서비스):', err ? (err.message || JSON.stringify(err)) : '알 수 없는 쿼리/연결 오류');
        // err 객체에 errorNum과 offset이 있다면 추가로 로깅 가능
        if (err && err.errorNum) {
            console.error(`Oracle Error Number: ${err.errorNum}, Offset: ${err.offset}`);
        }
        throw err; // 오류를 다시 throw하여 상위(컨트롤러)에서 처리하도록 함
    } finally {
        if (connection) {
            try {
                await connection.close(); // 연결 닫기
                console.log('데이터베이스 연결 닫힘 (서비스).');
            } catch (err) {
                // [수정]: finally 블록 안의 catch 블록 에러 로깅을 더 안전하게
                // err가 undefined이거나 message 속성이 없을 경우를 대비
                console.error('오라클 연결 닫기 오류 (서비스):', err ? (err.message || JSON.stringify(err)) : '알 수 없는 연결 종료 오류');
                // err 객체에 errorNum이 있다면 추가로 로깅 가능
                if (err && err.errorNum) {
                    console.error(`Oracle Connection Close Error Number: ${err.errorNum}`);
                }
            }
        }
    }
};

const auctionProductService = async(filters) => {
    const connection = await db.getConnection();
    try {
        sqlQuery = `
           SELECT 
            P.SALES_LOCATION, 
            P.NO AS PRODUCT_NO, 
            P.USER_NO, 
            P.NAME, 
            P.DETAIL, 
            TO_CHAR(P.CREATE_DATE, 'YYYY-MM-DD') AS CREATE_DATE, 
            P.CATEGORY, 
            A.NO AS AUCTION_NO,  
            A.CURRENT_PRICE AS CURRENT_PRICE,
            A.END_DATE AS END_DATE,
            A.START_PRICE AS START_PRICE,
            A.VIEWS AS VIEWS,
            (SELECT IM.IMAGE_URL
            FROM IMAGES IM
            WHERE IM.ENTITY_TYPE = 'PRODUCT' AND IM.ENTITY_ID = P.NO
            ORDER BY IM.DISPLAY_ORDER ASC, IM.UPLOAD_DATE DESC
            FETCH FIRST 1 ROW ONLY) AS IMAGE_URL
        FROM 
            PRODUCT P
        JOIN 
            AUCTION A ON P.NO = A.NO2
        WHERE 1=1
                `;

        const binds = {};
        const conditions = [];

        // 카테고리 필터링 로직: 카테고리 이름으로 필터링
        if (filters.category) {
            conditions.push(`P.CATEGORY = (SELECT NO FROM CATEGORY WHERE NAME = :categoryName)`);
            binds.categoryName = filters.category;
        }

        if(conditions.length > 0) {
            sqlQuery += `  AND ` + conditions.join(' AND ');
        }

        sqlQuery += ` ORDER BY P.CREATE_DATE DESC`;
        const result = await connection.execute(
            sqlQuery,
            binds,
            { outFormat: oracledb.OUT_FORMAT_OBJECT } // 쿼리 결과를 객체 배열로 받도록 설정
        );
        return result.rows; // 쿼리 결과 반환 (이제 객체들의 배열이 됩니다.)
    } catch(err) {
        console.error('db 조회 오류 : ' , err);
    } finally {
        await connection.close();
    }
}

const normalProductService = async(filters) => {
     const connection = await db.getConnection();
    try {
        sqlQuery = `
           SELECT 
            P.SALES_LOCATION, 
            P.NO AS PRODUCT_NO, 
            P.USER_NO, 
            P.NAME, 
            P.DETAIL, 
            TO_CHAR(P.CREATE_DATE, 'YYYY-MM-DD') AS CREATE_DATE, 
            P.CATEGORY, 
            N.NO AS NORMAL_NO,  
            N.STATE,
            N.PRICE,
            N.VIEWS,
            N.REGION,
            (SELECT IM.IMAGE_URL
            FROM IMAGES IM
            WHERE IM.ENTITY_TYPE = 'PRODUCT' AND IM.ENTITY_ID = P.NO
            ORDER BY IM.DISPLAY_ORDER ASC, IM.UPLOAD_DATE DESC
            FETCH FIRST 1 ROW ONLY) AS IMAGE_URL
        FROM 
            PRODUCT P
        JOIN 
            NORMAL N ON P.NO = N.NO2
        WHERE 1=1
                `;

        const binds = {};
        const conditions = [];


          if (filters.category) {
            conditions.push(`P.CATEGORY = (SELECT NO FROM CATEGORY WHERE NAME = :categoryName)`);
            binds.categoryName = filters.category;
        }

        if(conditions.length > 0) {
            sqlQuery += `  AND ` + conditions.join(' AND ');
        }

        sqlQuery += ` ORDER BY P.CREATE_DATE DESC`;

        const result = await connection.execute(
            sqlQuery,
            binds,
            { outFormat: oracledb.OUT_FORMAT_OBJECT } // 쿼리 결과를 객체 배열로 받도록 설정
        );
        return result.rows; // 쿼리 결과 반환 (이제 객체들의 배열이 됩니다.)
    } catch(err) {
        console.error('db 조회 오류 : ' , err);
    } finally {
        await connection.close();
    }
}

const allProductCategoryService = async(req, res) => {
    const connection = await db.getConnection();
    try {
        const sqlQuery = `select c.name
                            from category c
                            join product p on c.no = p.category
                        `;  

        const result = await connection.execute(
            sqlQuery,
            [], // 바인드 변수 (현재 없음)
            { outFormat: oracledb.OUT_FORMAT_OBJECT } // 쿼리 결과를 객체 배열로 받도록 설정
        );
        return result.rows; // 쿼리 결과 반환 (이제 객체들의 배열이 됩니다.)
    } catch(err) {
        console.error('db 조회 오류 : ' , err);
    } finally {
        await connection.close();
    }
}

const auctionProductCategoryService = async(req,res) => {
     const connection = await db.getConnection();
    try {
        const sqlQuery = `select c.name
                            from category c
                            join product p on c.no = p.category
                            where p.no = (select no2 from auction where no2 = p.no)
                        `;  

        const result = await connection.execute(
            sqlQuery,
            [], // 바인드 변수 (현재 없음)
            { outFormat: oracledb.OUT_FORMAT_OBJECT } // 쿼리 결과를 객체 배열로 받도록 설정
        );
        return result.rows; // 쿼리 결과 반환 (이제 객체들의 배열이 됩니다.)
    } catch(err) {
        console.error('db 조회 오류 : ' , err);
    } finally {
        await connection.close();
    }
}

const normalProductCategoryService = async(req,res) => {
     const connection = await db.getConnection();
    try {
        const sqlQuery = `select c.name
                            from category c
                            join product p on c.no = p.category
                            where p.no = (select no2 from normal where no2 = p.no)
                        `;  

        const result = await connection.execute(
            sqlQuery,
            [], // 바인드 변수 (현재 없음)
            { outFormat: oracledb.OUT_FORMAT_OBJECT } // 쿼리 결과를 객체 배열로 받도록 설정
        );
        return result.rows; // 쿼리 결과 반환 (이제 객체들의 배열이 됩니다.)
    } catch(err) {
        console.error('db 조회 오류 : ' , err);
    } finally {
        await connection.close();
    }
}
module.exports = { allProductService, auctionProductService, normalProductService, allProductCategoryService,auctionProductCategoryService, normalProductCategoryService };
