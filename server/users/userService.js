const bcrypt = require('bcryptjs');
const db = require('../config/db'); // DB 연결 모듈 가져오기 (pool 대신 db 객체)
const oracledb = require('oracledb'); // oracledb 모듈 추가

const userService = async (id, password, email, name, nickname, phone, socialId) => {
  const connection = await db.getConnection(); // 풀에서 연결 가져오기
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    console.log('in service!');

    // Oracle SQL: USER_NO는 IDENTITY 컬럼으로 DB에서 자동 생성되므로 INSERT 문에 포함하지 않음.
    // 바인드 변수 사용 (콜론 : 접두사)
    const result = await connection.execute(
        `INSERT INTO users (ID, PWD, PHONE, EMAIL, NICKNAME, STATE, TRUST, REGION, BADGE, CREATE_DATE, IS_ADMIN, NAME, SOCIAL_ID)
         VALUES (:id, :hash, :phone, :email, :nickname, :state, :trust, :region, :badge, SYSDATE, :isAdmin, :name, :socialId)`,
        {
          id: id,
          hash: hash,
          phone: phone,
          email: email,
          nickname: nickname,
          state: 'N',
          trust: 0,
          region: 'default',
          badge: 'default',
          isAdmin: 'N', // Oracle에서는 BOOLEAN 대신 0 또는 1
          name: name,
          socialId: socialId
        },
        { autoCommit: true } // 트랜잭션 자동 커밋
    );

    console.log('Rows inserted:', result.rowsAffected);

    return { id, email, password, phone, name, nickname }; // 실제로는 비밀번호는 반환하지 않는 것이 좋습니다.
  } catch (error) {
    console.error('회원가입 서비스 오류 (Oracle):', error);
    throw new Error(error.message);
  } finally {
    connection.release(); // 연결 반환
  }
};

const checkIdAvailability = async(id) => {
  const connection = await db.getConnection();
  
  try {
    // Oracle SQL: 별칭(alias)에 큰따옴표 사용 (대소문자 구분 안 할 경우 생략 가능)
    const result = await connection.execute(
        'SELECT COUNT(*) AS "COUNT" FROM users WHERE ID = :id', // 바인드 변수 사용
        { id: id }
    );
    
    return result.rows[0].COUNT > 0; // Oracle은 기본적으로 컬럼명을 대문자로 반환
  } catch(error) {
    console.error('아이디 중복 확인 서비스 오류 (Oracle):', error);
    throw new Error(error.message);
  } finally {
    connection.release();
  }
}

const loginService = async(id, pwd) => {
  const connection = await db.getConnection();
  try {
    // Oracle SQL: 바인드 변수 사용
    const [rows] = await connection.execute(
        'SELECT USER_NO, ID, PWD, PHONE, EMAIL, NICKNAME, STATE, TRUST, REGION, BADGE, CREATE_DATE, IS_ADMIN, NAME, SOCIAL_ID, PROFILE_IMAGE FROM users WHERE ID = :id',
        { id: id }
    );

    if(rows.length === 0) { // Oracle의 rows는 2차원 배열이 아님, 바로 데이터가 들어옴
      return { success: false, message: '존재하지 않는 아이디입니다.'};
    }

    const user = rows[0]; // Oracle의 rows는 직접 객체 배열
    const hashedPasswordFromDB = user.PWD; // Oracle은 컬럼명 대문자
    const isPasswordMatch = await bcrypt.compare(pwd, hashedPasswordFromDB);

    if(isPasswordMatch) {
      return {
        inform: {
          USER_NO: user.USER_NO,
          ID: user.ID,
          EMAIL: user.EMAIL,
          NICKNAME: user.NICKNAME,
          PHONE: user.PHONE,
          NAME: user.NAME,
          SOCIAL_ID: user.SOCIAL_ID,
          PROFILE_IMAGE: user.PROFILE_IMAGE // 소셜 로그인 사용자 프로필 이미지 추가
        },
        success: true
      };
    } else {
      return { success: false, message: '비밀번호가 일치하지 않습니다.'};
    }
  } catch(error){
    console.error('로그인 서비스 오류 (Oracle):', error);
    return { success: false, message: '로그인 처리 중 오류 발생'};
  } finally {
    connection.release();
  }
}
module.exports = { userService, checkIdAvailability, loginService };