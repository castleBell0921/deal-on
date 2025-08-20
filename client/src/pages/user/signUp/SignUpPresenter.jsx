// SignUpPresenter.jsx
import '../../../styles/SignUp.css'; // 스타일 시트 임포트

const SignUpPresenter = ({
    formData,
    isIdAvailable,
    onInputChange,
    onIdBlur,
    onSubmit,
    showCheckMessage,
    onPwdBlur,
    onSendAuthNumber,
    onVerifyAuthNumber,
    isPhoneAuthSent,
    onAuthNumberInputChange,

}) => {
    console.log('SignUpPresenter isPhoneAuthSent props:', isPhoneAuthSent); // 추가
    return (
        <div className="signUpContainer">
            <h2>회원가입</h2>
            <form onSubmit={onSubmit} className="signUpForm">
                <div className="inputGroup">
                    <div className="inputWithButton">
                        <input
                            type="text"
                            id="id"
                            name="id"
                            value={formData.id}
                            onChange={onInputChange}
                            placeholder="아이디"
                            onBlur={onIdBlur}
                        />
                    </div>
                    <span
                        className={`showCheck ${showCheckMessage ? 'visible' : ''}`}
                        style={{
                            color: isIdAvailable === true ? 'green' : isIdAvailable === false ? 'red' : 'inherit',
                        }}
                    >
                        {isIdAvailable === true ? '사용 가능한 아이디입니다.' : isIdAvailable === false ? '중복된 아이디입니다.' : ''}
                    </span>
                </div>

                <div className="inputGroup">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={onInputChange}
                        placeholder="비밀번호"
                    />
                </div>

                <div className="inputGroup">
                    <input
                        type="password"
                        id="passwordConfirm"
                        name="passwordConfirm"
                        value={formData.passwordConfirm}
                        onChange={onInputChange}
                        placeholder="비밀번호 확인"
                        onBlur={onPwdBlur}
                    />
                </div>

                <div className="inputGroup">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={onInputChange}
                        placeholder="이메일 주소"
                    />
                </div>

                <div className="inputGroup">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={onInputChange}
                        placeholder="이름"
                    />
                </div>

                <div className="inputGroup">
                    <input
                        type="text"
                        id="nickname"
                        name="nickname"
                        value={formData.nickname}
                        onChange={onInputChange}
                        placeholder="닉네임"
                    />
                </div>

                <div className="inputGroup" style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={onInputChange}
                        placeholder="휴대전화번호"
                        style={{ flexGrow: 1, marginRight: '8px' }}
                    />
                    <button type="button" className="authButton" style={{ whiteSpace: 'nowrap' }} onClick={onSendAuthNumber} disabled={isPhoneAuthSent}>
                        본인인증
                    </button>
                </div>

                {isPhoneAuthSent && (
                    <div className="inputGroup" style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="text"
                            placeholder="인증번호 입력"
                            value={formData.authNumberInput}
                            onChange={onAuthNumberInputChange}
                            style={{ flexGrow: 1, marginRight: '8px' }}
                        />
                        <button type="button" onClick={onVerifyAuthNumber}>확인</button>
                    </div>
                )}

                <button type="submit" className="signUpButton">
                    가입하기
                </button>
            </form>
        </div>
    );
};

export default SignUpPresenter;