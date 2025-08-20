// social/kakao/kakaoService.js
const db = require('../../config/db'); // 데이터베이스 연결 풀 임포트

/**
 * @description socialId로 사용자 정보를 데이터베이스에서 조회합니다.
 * @param {string} socialId - 카카오에서 받은 사용자 고유 ID
 * @returns {Promise<object | undefined>} 조회된 사용자 정보 또는 undefined
 */
// const findKakaoUserBySocialId = async (socialId) => {
//     const connection = await pool.getConnection(); // 풀에서 연결 가져오기
//     try {
//         const [rows] = await connection.execute(
//             'SELECT * FROM USERS WHERE SOCIAL_ID = ?', // PROVIDER 컬럼도 함께 확인하는 것이 좋습니다.
//             [socialId]
//         );
//         return rows[0]; // 첫 번째 결과 (사용자가 있다면)
//     } catch (error) {
//         console.error('DB에서 카카오 사용자 조회 중 오류:', error);
//         throw new Error(`데이터베이스 오류: ${error.message}`);
//     } finally {
//         connection.release(); // 연결 반환
//     }
// };

const findKakaoUserBySocialId = async (socialId) => {
    const connection = await db.getConnection(); // 풀에서 연결 가져오기
    try {
        // Oracle SQL: 바인드 변수 사용. 컬럼명은 대문자.
        const result = await connection.execute(
            'SELECT * FROM USERS WHERE SOCIAL_ID = :socialId',
            { socialId: socialId }
        );
        return result.rows[0]; // Oracle의 execute 결과는 직접 객체 배열 (MySQL의 [rows]와 다름)
    } catch (error) {
        console.error('DB에서 카카오 사용자 조회 중 오류 (Oracle):', error);
        throw new Error(`데이터베이스 오류: ${error.message}`);
    } finally {
        connection.release(); // 연결 반환
    }
};

/**
 * @description 새로운 카카오 사용자 정보를 데이터베이스에 저장합니다.
 * @param {object} userInfo - 카카오에서 받은 사용자 정보 (id, nickname, profileImage 등)
 * @returns {Promise<object>} 새로 저장된 사용자 정보
 */
// const createKakaoUser = async (userInfo) => {
//     const connection = await pool.getConnection();
//     try {
//         const { id, nickname, profile_Image, email } = userInfo; // 필요한 정보 추출
//         const [result] = await connection.execute(
//             'INSERT INTO USERS (SOCIAL_ID, NICKNAME, PROFILE_IMAGE, EMAIL) VALUES (?, ?, ?, ?)',
//             [id, nickname, profile_Image, email || null] // 이메일이 없을 경우 null
//         );
//         // 삽입된 사용자 정보를 다시 조회하거나, 삽입된 ID를 반환하여 처리할 수 있습니다.
//         // 여기서는 간단히 삽입 후 해당 정보를 다시 반환한다고 가정합니다.
//         return {
//             id: result.insertId, // DB에서 생성된 ID (Auto Increment)
//             socialId: id,
//             nickname: nickname,
//             profileImage: profile_Image,
//             email: email,
//             provider: 'kakao'
//         };
//     } catch (error) {
//         console.error('DB에 카카오 사용자 저장 중 오류:', error);
//         throw new Error(`데이터베이스 오류: ${error.message}`);
//     } finally {
//         connection.release();
//     }
// };


module.exports = { findKakaoUserBySocialId };