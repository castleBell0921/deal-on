// test-db-connection.js
const oracledb = require('oracledb');
const path = require('path');
require('dotenv').config(); // .env 파일 로드

// 1. Oracle Instant Client 라이브러리 경로 설정 (여기만 정확히 수정하세요!)
// 예시: Windows -> 'C:\\oracle\\instantclient_21_18'
// 예시: Linux/macOS -> '/opt/oracle/instantclient_21_18'
oracledb.initOracleClient({ libDir: 'C:\\oracle\\instantclient_21_18' });

// 2. Autonomous Database 연결 지갑 경로 설정
const walletPath = path.join(__dirname, 'wallet'); // server 폴더 바로 아래 wallet 폴더를 가정

// 3. TNS_ADMIN 환경 변수 설정
process.env.TNS_ADMIN = walletPath;

// 4. .env 파일에서 환경 변수 가져오기
const dbUser = process.env.DB_USER || 'ADMIN';
const dbPassword = process.env.DB_PASSWORD;
const connectString = process.env.DB_CONNECT_STRING;

async function testConnection() {
    console.log('--- Oracle DB Connection Test Started ---');
    console.log('DB_USER:', dbUser);
    console.log('DB_CONNECT_STRING:', connectString);
    console.log('TNS_ADMIN path:', process.env.TNS_ADMIN);
    console.log('Instant Client libDir:', 'C:\\oracle\\instantclient_21_18'); // 설정된 경로 확인

    let connection;
    try {
        // 5. 연결 풀 생성 시도
        console.log('Attempting to create Oracle Connection Pool...');
        await oracledb.createPool({
            user: dbUser,
            password: dbPassword,
            connectString: connectString,
            poolMin: 1, // 테스트용으로 최소 연결 수 줄임
            poolMax: 1,
            poolIncrement: 0
        });
        console.log('Oracle Connection Pool created successfully!');

        // 6. 연결 가져오기 및 간단한 쿼리 실행 시도
        console.log('Attempting to get connection from pool and execute a query...');
        connection = await oracledb.getConnection();
        const result = await connection.execute('SELECT SYSDATE FROM DUAL');
        console.log('Query executed successfully. Result:', result.rows[0]);
        console.log('--- Oracle DB Connection Test Succeeded ---');

    } catch (err) {
        // 7. 오류 발생 시 상세 로그 출력
        console.error('--- Oracle DB Connection Test FAILED ---');
        console.error('Error code:', err.code);
        console.error('Error message:', err.message);
        console.error('Error stack:', err.stack);
    } finally {
        if (connection) {
            try {
                await connection.close(); // 연결 닫기
                console.log('Connection closed.');
            } catch (err) {
                console.error('Error closing connection:', err);
            }
        }
        // 8. 테스트 종료 후 풀 닫기 (선택 사항이지만 깔끔하게)
        if (oracledb.getPool()) {
            try {
                await oracledb.getPool().close(0);
                console.log('Connection Pool closed.');
            } catch (err) {
                console.error('Error closing connection pool:', err);
            }
        }
        console.log('--- Oracle DB Connection Test Finished ---');
    }
}

testConnection();