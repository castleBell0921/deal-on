// server/config/db.js
const oracledb = require('oracledb');
const path = require('path');
require('dotenv').config(); // .env 파일에서 환경 변수 로드

// Oracle Instant Client 라이브러리 경로 설정
// YOUR_ACTUAL_INSTANT_CLIENT_PATH 부분을 여러분의 실제 경로로 바꿔주세요.
// 예시: Windows -> 'C:\\oracle\\instantclient_21_18'
// 예시: Linux/macOS -> '/opt/oracle/instantclient_21_18'
oracledb.initOracleClient({ libDir: process.env.ORACLE_CLIENT_LIB_DIR || 'C:\\oracle\\instantclient_21_18' }); // 경로를 다시 확인해주세요!

// Autonomous Database 연결 wallet 경로 설정
const walletPath = path.join(__dirname, '..', 'wallet');

// TNS_ADMIN 환경 변수를 설정하여 oracledb가 wallet 파일을 찾도록 합니다.
process.env.TNS_ADMIN = walletPath;

// .env 파일에서 환경 변수 가져오기
const dbUser = process.env.DB_USER || 'ADMIN';
const dbPassword = process.env.DB_PASSWORD;
const connectString = process.env.DB_CONNECT_STRING;

// 연결 풀 초기화 함수
async function initialize() {
  console.log('Attempting to initialize Oracle Connection Pool...'); // 디버깅 로그 추가
  console.log('DB_USER:', dbUser); // 디버깅 로그 추가
  console.log('DB_CONNECT_STRING:', connectString); // 디버깅 로그 추가
  console.log('TNS_ADMIN path:', process.env.TNS_ADMIN); // 디버깅 로그 추가

  try {
    await oracledb.createPool({
      user: dbUser,
      password: dbPassword,
      connectString: connectString,
      poolMin: 10,
      poolMax: 10,
      poolIncrement: 0
    });
    console.log('Oracle Connection Pool created successfully!'); // 로그 메시지 변경
  } catch (err) {
    console.error('Error creating Oracle connection pool:', err.message || err); // 에러 메시지 상세화
    console.error('Oracle connection pool initialization failed. Exiting...'); // 추가 로그
    process.exit(1);
  }
}

// 연결 풀에서 연결 가져오기
async function getConnection() {
  return oracledb.getConnection();
}

// 연결 풀 닫기 (애플리케이션 종료 시 호출)
async function closePool() {
  await oracledb.getPool().close(0);
  console.log('Oracle Connection Pool closed!');
}

// 초기화 함수를 서버 시작 시 호출하도록 내보냅니다.
module.exports = {
  initialize,
  getConnection,
  closePool
};