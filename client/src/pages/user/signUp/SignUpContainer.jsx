import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import SignUpPresenter from './SignUpPresenter'; // 프레젠터 컴포넌트 임포트

const SignUpContainer = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initailNickname = queryParams.get('nickname') || '';
    const socialId = queryParams.get('socialId') || '';
    const name = queryParams.get('name') || '';
    const email = queryParams.get('email') || '';

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: '',
        password: '',
        passwordConfirm: '',
        email: email,
        name: name,
        nickname: initailNickname,
        phone: '', // 전화번호 필드 추가
        authNumberInput: '', // 사용자가 입력한 인증번호
        socialId: socialId,
    });

    const [isIdAvailable, setIsIdAvailable] = useState(null);
    const [showCheckMessage, setShowCheckMessage] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isPhoneAuthSent, setIsPhoneAuthSent] = useState(false); // 인증번호 발송 상태
    const [isPhoneAuthenticated, setIsPhoneAuthenticated] = useState(false); // 전화번호 인증 성공 상태

    useEffect(() => {
        console.log('isPhoneAuthSent updated:', isPhoneAuthSent);
    }, [isPhoneAuthSent]);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
        if (name === 'id') {
            setIsIdAvailable(null);
            setShowCheckMessage(false);
        }
    }, []);

    const checkIdAvailbility = useCallback(async (inputId) => {
        if (!inputId) {
            setIsIdAvailable(null);
            setShowCheckMessage(false);
            return;
        }
        try {
            const response = await fetch(`http://localhost:4000/api/checkId?id=${inputId}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setIsIdAvailable(data.available);
        } catch (error) {
            console.error('아이디 중복 확인 오류: ', error);
            setIsIdAvailable(false);
        }
    }, []);

    const handleIdBlur = useCallback(() => {
        checkIdAvailbility(formData.id);
        setShowCheckMessage(true);
    }, [formData.id, checkIdAvailbility]);

    const handlePwdBlur = () => {
        if (formData.password !== formData.passwordConfirm) {
            alert('비밀번호를 재확인해주세요.');
            setIsPasswordValid(false);
        } else {
            setIsPasswordValid(true);
        }
    };

    const handleSendAuthNumber = async () => {
        try {
            const phoneRegex = /^\d{10,11}$/;
            if (!phoneRegex.test(formData.phone)) {
                alert('유효한 전화번호를 입력해주세요 (10~11자리 숫자).');
                return;
            }

            console.log('Sending request with phone:', formData.phone);
            const response = await fetch('http://localhost:4000/auth/sendAuthNumber', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber: formData.phone }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('API response:', data);

            if (data.success) {
                setIsPhoneAuthSent(true);
                console.log('isPhoneAuthSent set to true');
                alert(data.message);
            } else {
                console.log('API failed:', data.message);
                alert(data.message);
            }
        } catch (error) {
            console.error('인증번호 발송 오류:', error);
            alert('인증번호 발송에 실패했습니다.');
        }
    }


    const handleVerifyAuthNumber = async () => {
        if (formData.authNumberInput.length !== 6) {
            alert('인증번호는 6자리 숫자입니다.');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/auth/verifyAuthNumber', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber: formData.phone, authNumber: formData.authNumberInput }),
            });
            const data = await response.json();
            if (data.success) {
                setIsPhoneAuthenticated(true);
                alert(data.message);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('인증번호 확인 오류:', error);
            alert('인증번호 확인에 실패했습니다.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const idRegex = /^[a-zA-Z0-9]{4,16}$/;
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

        if (!idRegex.test(formData.id)) {
            alert('아이디는 영문, 숫자 4~12자리로 입력해주세요.');
            return;
        }

        if (!passwordRegex.test(formData.password)) {
            alert('비밀번호는 영문, 숫자, 특수문자를 포함한 8~16자리로 입력해주세요.');
            return;
        }
        if (!isPasswordValid) {
            alert('비밀번호를 확인해주세요.');
            return;
        }

        if (!isPhoneAuthenticated) {
            alert('전화번호 인증을 완료해주세요.');
            return;
        }

        try {
            const signUpData = {...formData, socialId: formData.socialId};
            const response = await fetch('http://localhost:4000/api/signUp', {
                method: 'post',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(signUpData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('회원가입 성공: ' + result);
                alert('회원가입이 완료되었습니다.');
                navigate('/');

            } else {
                const errorData = await response.json();
                console.error('회원가입 실패: ' + errorData);
                alert('회원가입에 실패하였습니다.');
            }
        } catch (error) {
            console.error('네트워크 에러: ' + error);
            alert('네트워크 에러');
        }
    };



    return (
        <div>
            <SignUpPresenter
                formData={formData}
                isIdAvailable={isIdAvailable}
                showCheckMessage={showCheckMessage}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                onIdBlur={handleIdBlur}
                onPwdBlur={handlePwdBlur}
                onSendAuthNumber={handleSendAuthNumber}
                onVerifyAuthNumber={handleVerifyAuthNumber}
                isPhoneAuthSent={isPhoneAuthSent}
                onAuthNumberInputChange={(e) => setFormData({ ...formData, authNumberInput: e.target.value })}
            />
        </div>
    );
};

export default SignUpContainer;