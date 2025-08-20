// social/google/googleClient.js
const { google } = require('googleapis');

class GoogleClient {
    constructor() {
        // 환경 변수는 server.js 등에서 로드되었다고 가정
        this.clientId = process.env.GOOGLE_CLIENT_ID;
        this.clientSecret = process.env.GOOGLE_CLIENT_SECRET;
        this.redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:4000/social/google/callback';

        // OAuth2 클라이언트 인스턴스 (각 요청마다 토큰 설정을 위해 필요)
        // 이 인스턴스는 getToken/getUserInfo 등에서 재사용되므로 멤버 변수로 둡니다.
        this.oauth2Client = new google.auth.OAuth2(
            this.clientId,
            this.clientSecret,
            this.redirectUri
        );
    }

    /**
     * @description Google 인가 코드를 받기 위한 URL을 생성합니다.
     * @returns {string} Google 인증 URL
     */
    getAuthCodeURL() {
        const scopes = [
            'https://www.googleapis.com/auth/userinfo.email',
            'https://www.googleapis.com/auth/userinfo.profile',
        ];

        return this.oauth2Client.generateAuthUrl({
            access_type: 'offline', // refresh_token을 얻기 위해 필요
            scope: scopes.join(' '),
            include_granted_scopes: true,
        });
    }

    /**
     * @description 인가 코드로 액세스 토큰 및 리프레시 토큰을 교환하고, 클라이언트에 토큰을 설정합니다.
     * @param {string} code - Google로부터 받은 인가 코드
     * @returns {Promise<object>} 토큰 정보 (access_token, refresh_token 등)
     */
    async getToken(code) {
        try {
            const { tokens } = await this.oauth2Client.getToken(code);
            this.oauth2Client.setCredentials(tokens); // 클라이언트에 토큰 설정
            return tokens;
        } catch (error) {
            console.error('Google 토큰 교환 실패:', error);
            throw new Error(`Google 토큰 교환 중 오류 발생: ${error.message}`);
        }
    }

    /**
     * @description 설정된 토큰을 사용하여 Google 사용자 정보를 가져옵니다.
     * @returns {Promise<object>} 사용자 정보 (id, email, name, picture 등)
     */
    async getUserInfo() {
        try {
            const oauth2 = google.oauth2({
                auth: this.oauth2Client,
                version: 'v2',
            });
            const { data } = await oauth2.userinfo.get();
            return data;
        } catch (error) {
            console.error('Google 사용자 정보 요청 실패:', error);
            throw new Error(`Google 사용자 정보 가져오기 중 오류 발생: ${error.message}`);
        }
    }

    /**
     * @description Google Access Token을 무효화하여 앱의 접근 권한을 해제합니다.
     * @param {string} accessToken - 무효화할 액세스 토큰
     * @returns {Promise<void>}
     */
    async revokeAccessToken(accessToken) {
        try {
            const response = await fetch(`https://oauth2.googleapis.com/revoke?token=${accessToken}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            if (!response.ok) {
                console.error('Google Access Token 무효화 실패:', response.status, await response.text());
                // 토큰 무효화가 실패해도 서비스 세션 삭제는 진행해야 하므로, 여기서 에러를 다시 던지지는 않습니다.
            } else {
                console.log('Google Access Token 무효화 완료.');
            }
        } catch (error) {
            console.error('Google Access Token 무효화 중 오류:', error);
        }
    }

    // Refresh Token 무효화 로직이 필요하다면 여기에 추가
    // async revokeRefreshToken(refreshToken) { ... }
}

// GoogleClient의 단일 인스턴스를 내보내어 다른 모듈에서 사용할 수 있도록 합니다.
module.exports = { GoogleClient: new GoogleClient() };