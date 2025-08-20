import React from 'react';
import Modal from 'react-modal';
import SocialButton from "./SocialButton";


import '../../../styles/LoginModal.css'; // 스타일 시트 임포트

const LoginModalPresenter = ({
    isOpen,
    onRequestClose,
    onSignUp,
    formData,
    onInputChange,
    onSubmit

}) => {
    return (

        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.6)', // 흐린 배경
                    zIndex: 1000,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                content: {
                    position: 'relative',
                    background: 'white',
                    borderRadius: '8px',
                    padding: '30px',
                    maxWidth: '400px',
                    width: '90%',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
                },
            }}
            contentLabel="로그인 모달"
        >
            <div className="login-modal-container">
                <h2 className="login-modal-logo">LOGO</h2>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="id"
                        value={formData.id}
                        placeholder="아이디를 입력하세요..."
                        onChange={onInputChange}
                        className="login-modal-input"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        placeholder="비밀번호를 입력하세요..."
                        onChange={onInputChange}
                        className="login-modal-input"
                    />

                    <button type="submit" className="login-modal-button">로그인</button>
                </form>
                <div className="login-modal-links">
                    <button className="login-modal-link-button">아이디 찾기</button>
                    <span className="login-modal-link-separator">|</span>
                    <button className="login-modal-link-button">비밀번호 찾기</button>
                    <span className="login-modal-link-separator">|</span>
                    <button className="login-modal-link-button" onClick={onSignUp}>회원가입</button>
                </div>

                <hr className="login-modal-divider" />

                <SocialButton /> {/* 버튼 컴포넌트 */}
            </div>
        </Modal>
    );
};

export default LoginModalPresenter;