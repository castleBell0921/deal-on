const querystring = require('querystring'); // URL 인코딩을 위해 필요

class Kakao {
    constructor() {
        this.key = process.env.KAKAO_KEY;
        this.redirectUri = process.env.REDIRECT_URI;
        this.tokenUrl = 'https://kauth.kakao.com/oauth/token';
        this.userInfoUrl = 'https://kapi.kakao.com/v2/user/me';

    }

    /**
     * @description 카카오 인가코드를 받기위한 URL 가져오기
     */
    getAuthCodeURL() {
        return `https://kauth.kakao.com/oauth/authorize?client_id=${this.key}&redirect_uri=${this.redirectUri}&response_type=code`;
    }

    /**
     * @description 카카오 인가 코드로 토큰 받기 (fetch 사용)
     * @param {string} code
     * @returns {Promise<object>} 토큰 정보 (access_token, refresh_token 등)
     */
    async getToken(code) {
        try {
            const response = await fetch(this.tokenUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
                body: querystring.stringify({
                    grant_type: 'authorization_code',
                    client_id: this.key,
                    redirect_uri: this.redirectUri,
                    code: code,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('카카오 토큰 요청 실패:', error);
                throw new Error(`카카오 토큰 요청 실패: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('카카오 토큰 요청 중 오류:', error);
            throw error;
        }
    }

    /**
     * @description 카카오 액세스 토큰으로 사용자 정보 가져오기 (fetch 사용)
     * @param {string} accessToken
     * @returns {Promise<object>} 사용자 정보
     */
    async getUserInfo(accessToken) {
        try {
            const response = await fetch(this.userInfoUrl, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('카카오 사용자 정보 요청 실패:', error);
                throw new Error(`카카오 사용자 정보 요청 실패: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error('카카오 사용자 정보 요청 중 오류:', error);
            throw error;
        }
    }
}

module.exports = { KakaoClient: new Kakao() };