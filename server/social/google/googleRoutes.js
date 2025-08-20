// social/google/googleRoutes.js
// 수정2차
const express = require('express');
const router = express.Router();
const { GoogleClient } = require('./googleClient'); // Google API 통신 서비스 임포트
const { findGoogleUserBySocialId, createGoogleUser } = require('./googleService'); // DB 비즈니스 로직 서비스 임포트

// --- Google 인가 코드 요청 URL 생성 및 전달 ---
router.get('/auth-url', (req, res) => {
    try {
        const authorizationUrl = GoogleClient.getAuthCodeURL(); // GoogleClient 호출
        res.json({ url: authorizationUrl });
    } catch (error) {
        console.error('Google 인증 URL 생성 오류 (Controller):', error);
        res.status(500).json({ message: 'Google 인증 URL을 가져오는 데 실패했습니다.' });
    }
});

// --- Google OAuth2 콜백 처리 (인가 코드 받기, 토큰 교환, 사용자 정보 조회, 로그인/회원가입 처리) ---
router.get('/callback', async (req, res) => {
    const { code } = req.query; // Google로부터 받은 인가 코드
    console.log('Google 인가 코드 수신 (Controller):', code);

    if (!code) {
        console.error('Google 콜백: 인가 코드가 없습니다.');
        return res.status(400).send('인가 코드가 누락되었습니다.');
    }

    try {
        // 1. Google API로부터 토큰 정보 가져오기 (GoogleClient 서비스 사용)
        const tokenData = await GoogleClient.getToken(code);
        console.log('Google 토큰 정보:', tokenData);

        // 2. 받은 액세스 토큰으로 사용자 정보 가져오기 (GoogleClient 서비스 사용)
        const userInfo = await GoogleClient.getUserInfo();
        console.log('Google 사용자 정보:', userInfo);

        // 3. 추출한 socialId (Google ID)로 데이터베이스에서 사용자 조회 (googleService 사용)
        let userInDb = await findGoogleUserBySocialId(userInfo.id);

        if (!userInDb) {
            // 사용자가 DB에 없으면 회원가입 처리 (프론트엔드로 리다이렉트하여 추가 정보 받기)
            console.log('새로운 Google 사용자 감지. 회원가입 페이지로 리다이렉트.');
            // 필수 정보만 URL 파라미터로 넘겨줍니다. 한글은 encodeURIComponent로 인코딩 필수.
            const signUpParams = new URLSearchParams({
                name: userInfo.name || '',
                email: userInfo.email || '',
                socialId: userInfo.id,
                profileImage: userInfo.picture || ''
            }).toString();

            return res.redirect(`http://localhost:5173/signUp?${signUpParams}`);
        } else {
            // 사용자가 DB에 이미 있으면 로그인 처리 (세션 저장 및 프론트엔드로 리다이렉트)
            console.log('기존 Google 사용자 로그인 처리:', userInDb.NICKNAME);
            req.session.user = {
                inform: {
                    id: userInDb.ID, // DB에서의 사용자 고유 ID
                    socialId: userInDb.SOCIAL_ID,
                    email: userInDb.EMAIL,
                    nickname: userInDb.NICKNAME, // DB에 저장된 닉네임 사용
                    profileImage: userInDb.PROFILE_IMAGE,
                },
                provider: 'google',
                googleAccessToken: tokenData.access_token, // 로그아웃 시 필요할 수 있음
                googleRefreshToken: tokenData.refresh_token, // 액세스 토큰 만료 시 갱신에 필요
            };
            req.session.isLoggedIn = true;
            return res.redirect('http://localhost:5173/?loginSuccess=true'); // 로그인 성공 정보와 함께 프론트엔드로 리다이렉트
        }

    } catch (error) {
        console.error('Google 로그인 처리 중 오류 발생 (Controller):', error);
        res.status(500).redirect(`http://localhost:5173/?loginError=${encodeURIComponent('Google 로그인 처리 중 오류가 발생했습니다.')}`);
    }
});

// --- Google 로그아웃 라우터 ---
router.post('/logout', async (req, res) => {
    const googleAccessToken = req.session.user?.googleAccessToken;

    try {
        // Google API 토큰 무효화 (GoogleClient 서비스 사용)
        if (googleAccessToken) {
            await GoogleClient.revokeAccessToken(googleAccessToken);
        }

        // 서비스 세션 삭제
        req.session.destroy((err) => {
            if (err) {
                console.error('서비스 세션 삭제 오류:', err);
                return res.status(500).json({ message: '서비스 로그아웃 실패' });
            }
            res.json({ message: '로그아웃 성공' });
        });
    } catch (error) {
        console.error('Google 로그아웃 처리 중 오류 발생 (Controller):', error);
        res.status(500).json({ message: 'Google 로그아웃 처리 중 오류가 발생했습니다.', error: error.message });
    }
});

module.exports = router;