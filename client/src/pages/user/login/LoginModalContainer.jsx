import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import LoginModalPresenter from './LoginModalPresenter';
import Header from '../../common/Header';

const LoginModalContainer = ({
    isOpen,
    onRequestClose,
    onLoginSuccess,
    isLoggedIn,
    checkLoginStatus

}) => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        password: ''
    });

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevFormData =>
            ({ ...prevFormData, [name]: value }));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:4000/api/login', {
                method: 'post',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            const responseData = await response.json(); // 응답 본문을 한 번만 읽음
            console.log(responseData);
            if (response.ok && responseData.success) {
                console.log('로그인 성공:', responseData);
                alert('로그인 완료되었습니다.');
                navigate('/');
                onRequestClose();
                if (onLoginSuccess) { // 콜백 함수가 존재하면 호출
                    onLoginSuccess();
                }
            } else if (response.ok && !responseData.success) {
                console.error('로그인 실패:', responseData);
                alert('아이디 또는 비밀번호를 확인해주세요.');
            }
        } catch (error) {
            console.error('네트워크 에러:', error);
            alert('네트워크 에러');
        }
    };

    const handleSignUp = () => {
        navigate('/signUp');
    };

    return (
        <div>
            <LoginModalPresenter
                isOpen={isOpen}
                formData={formData}
                onRequestClose={onRequestClose}
                onSignUp={handleSignUp}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                checkLoginStatus={checkLoginStatus}
            />
        </div>
    );
};

export default LoginModalContainer;