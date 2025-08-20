// SocialButton.jsx (예시 - 이전 코드 활용)
import React from 'react';
import '../../../styles/LoginModal.css'; // 스타일 시트 임포트

function SocialButton() {
  /**
   * @description URL 가져오기
   */
  const fetchKakaoAuthURL = async () => {
    try {
      const response = await fetch("http://localhost:4000/social/kakao/auth-url");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const { url } = data;

      console.log(url); // 응답으로 온 url
      window.location.href = url; // URL로 리다이렉트
    } catch (error) {
      alert("카카오 로그인 URL을 가져오는 데 실패했습니다!");
      console.error(error);
    }
  };

  // Google 로그인 URL 가져오기
  const fetchGoogleAuthURL = async () => {
    try {
      const response = await fetch("http://localhost:4000/social/google/auth-url"); // 백엔드의 Google 인증 URL 엔드포인트
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const { url } = data;
      console.log('Google 인증 URL:', url);
      window.location.href = url; // Google 로그인 페이지로 리다이렉트
    } catch (error) {
      alert("구글 로그인 URL을 가져오는 데 실패했습니다!");
      console.error('구글 로그인 URL 가져오기 오류:', error);
    }
  };

  return (
      <div>
        <button className="kakao_button" onClick={fetchKakaoAuthURL}  >
          <img src="/image/kakao_login.png" alt="카카오 로그인" className="kakao_image"/>
        </button>
        <button className="gsi-material-button" onClick={fetchGoogleAuthURL}>
          <div className="gsi-material-button-state"></div>
          <div className="gsi-material-button-content-wrapper">
            <div className="gsi-material-button-icon">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" xmlnsXlink="http://www.w3.org/1999/xlink" style={{display: "block"}}>
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
            </div>
            <span className="gsi-material-button-contents">구글 로그인</span>
            <span style={{display: "none"}}>Sign in with Google</span>
          </div>
        </button>
      </div>
  );
}

export default SocialButton;