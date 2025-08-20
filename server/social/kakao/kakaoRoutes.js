// social/kakao/kakaoRoutes.js
const express = require('express');
const router = express.Router();
const { KakaoClient } = require('./kakaoClient'); // 카카오 API 통신 서비스 임포트
const { findKakaoUserBySocialId, createKakaoUser } = require('./kakaoService'); // DB 비즈니스 로직 서비스 임포트

// --- 카카오 인가 코드 요청 URL 생성 및 전달 ---
router.get('/auth-url', (req, res) => {
  try {
    const authURL = KakaoClient.getAuthCodeURL(); // 서비스 호출
    res.json({ url: authURL });
  } catch (error) {
    console.error('카카오 인증 URL 생성 오류:', error);
    res.status(500).json({ message: '카카오 인증 URL을 가져오는 데 실패했습니다.' });
  }
});

// --- 카카오 콜백 처리 (인가 코드 받기, 토큰 교환, 사용자 정보 조회, 로그인/회원가입 처리) ---
router.get('/callback', async (req, res) => {
  const { code } = req.query; // 카카오로부터 받은 인가 코드
  console.log('카카오 인가 코드 수신 (Controller):', code);

  if (!code) {
    console.error('카카오 콜백: 인가 코드가 없습니다.');
    return res.status(400).send('인가 코드가 누락되었습니다.');
  }

  try {
    // 1. 카카오 API로부터 토큰 정보 가져오기 (KakaoClient 서비스 사용)
    const tokenData = await KakaoClient.getToken(code);
    console.log('카카오 토큰 정보:', tokenData);

    // 2. 받은 액세스 토큰으로 사용자 정보 가져오기 (KakaoClient 서비스 사용)
    const userInfo = await KakaoClient.getUserInfo(tokenData.access_token);
    console.log('카카오 사용자 정보:', userInfo);

    // 카카오 사용자 정보에서 필요한 필드 추출
    const { id: socialId, properties, kakao_account } = userInfo;
    const nickname = properties?.nickname;
    const profile_Image = properties?.profile_image;
    const email = kakao_account?.email; // 이메일은 kakao_account에 있을 수 있습니다.

    // 3. 추출한 socialId로 데이터베이스에서 사용자 조회 (kakaoService 사용)
    let userInDb = await findKakaoUserBySocialId(socialId);

    if (!userInDb) {
      // 사용자가 DB에 없으면 회원가입 처리 (프론트엔드로 리다이렉트하여 추가 정보 받기)
      console.log('새로운 카카오 사용자 감지. 회원가입 페이지로 리다이렉트.');
      // 필수 정보만 URL 파라미터로 넘겨줍니다. 한글은 encodeURIComponent로 인코딩 필수.
      const signUpParams = new URLSearchParams({
        nickname: nickname || '', // 닉네임이 없을 수도 있으므로 기본값 설정
        profileImage: profile_Image || '',
        socialId: socialId,
        email: email || ''
      }).toString();

      return res.redirect(`http://localhost:5173/signUp?${signUpParams}`);
    } else {
      // 사용자가 DB에 이미 있으면 로그인 처리 (세션 저장 및 프론트엔드로 리다이렉트)
      console.log('기존 카카오 사용자 로그인 처리:', userInDb.NICKNAME);
      req.session.user = {
        inform: {
          id: userInDb.ID, // DB에서의 사용자 고유 ID
          socialId: userInDb.SOCIAL_ID,
          nickname: userInDb.NICKNAME,
          profileImage: userInDb.PROFILE_IMAGE,
          email: userInDb.EMAIL,
        },
        provider: 'kakao',
        kakaoAccessToken: tokenData.access_token, // 로그아웃 시 필요할 수 있음
        // kakaoRefreshToken: tokenData.refresh_token, // 필요 시 저장
      };
      req.session.isLoggedIn = true;
      return res.redirect('http://localhost:5173/?loginSuccess=true'); // 로그인 성공 정보와 함께 프론트엔드로 리다이렉트
    }

  } catch (error) {
    console.error('카카오 로그인 처리 중 오류 발생 (Controller):', error);
    // 에러 발생 시 프론트엔드에 에러 메시지와 함께 리다이렉트하거나 오류 페이지 보여주기
    res.status(500).redirect(`http://localhost:5173/?loginError=${encodeURIComponent('카카오 로그인 처리 중 오류가 발생했습니다.')}`);
  }
});

module.exports = router;