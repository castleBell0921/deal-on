// social/google/googleService.js
const db = require('../../config/db'); // 데이터베이스 연결 풀 임포트 (경로에 맞게 수정 필요)

/**
 * @description Google Social ID로 데이터베이스에서 사용자 정보를 조회합니다.
 * @param {string} socialId - Google에서 받은 사용자 고유 ID
 * @returns {Promise<object | undefined>} 조회된 사용자 정보 또는 undefined
 */
// const findGoogleUserBySocialId = async (socialId) => {
//     const connection = await pool.getConnection();
//     try {
//         // 실제 USERS 테이블 스키마에 따라 쿼리 수정 (PROVIDER 컬럼을 포함하는 것이 좋습니다.)
//         const [rows] = await connection.execute(
//             'SELECT * FROM USERS WHERE SOCIAL_ID = ?',
//             [socialId]
//         );
//         return rows[0]; // 첫 번째 결과 (사용자가 있다면)
//     } catch (error) {
//         console.error('DB에서 Google 사용자 조회 중 오류:', error);
//         throw new Error(`데이터베이스 오류: ${error.message}`);
//     } finally {
//         connection.release();
//     }
// };

const findGoogleUserBySocialId = async (socialId) => {
    const connection = await db.getConnection();
    try {
        // Oracle SQL: 바인드 변수 사용. 컬럼명은 대문자.
        const result = await connection.execute(
            'SELECT * FROM USERS WHERE SOCIAL_ID = :socialId',
            { socialId: socialId }
        );
        return result.rows[0]; // Oracle의 execute 결과는 직접 객체 배열
    } catch (error) {
        console.error('DB에서 Google 사용자 조회 중 오류 (Oracle):', error);
        throw new Error(`데이터베이스 오류: ${error.message}`);
    } finally {
        connection.release();
    }
};

/**
 * @description 새로운 Google 사용자 정보를 데이터베이스에 저장합니다.
 * @param {object} userInfo - Google에서 받은 사용자 정보 (id, email, name, picture 등)
 * @returns {Promise<object>} 새로 저장된 사용자 정보 (DB에 삽입된 데이터)
 */
// const createGoogleUser = async (userInfo) => {
//     const connection = await pool.getConnection();
//     try {
//         const { id: socialId, email, name, picture: profileImage } = userInfo; // 필요한 정보 추출
//         const [result] = await connection.execute(
//             'INSERT INTO USERS (SOCIAL_ID, EMAIL, NICKNAME, PROFILE_IMAGE, PROVIDER) VALUES (?, ?, ?, ?, "google")',
//             [socialId, email, name, profileImage || null] // 프로필 이미지가 없을 경우 null
//         );

//         // 삽입된 사용자 정보를 반환 (insertId는 MySQL/MariaDB 기준)
//         return {
//             id: result.insertId,
//             socialId: socialId,
//             email: email,
//             nickname: name, // Google의 'name'을 닉네임으로 사용
//             profileImage: profileImage,
//             provider: 'google'
//         };
//     } catch (error) {
//         console.error('DB에 Google 사용자 저장 중 오류:', error);
//         throw new Error(`데이터베이스 오류: ${error.message}`);
//     } finally {
//         connection.release();
//     }
// };

module.exports = { findGoogleUserBySocialId };