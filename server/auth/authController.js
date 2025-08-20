// authController.js
const coolsms = require('coolsms-node-sdk').default;
require('dotenv').config({path: './env'});

const messageService = new coolsms(process.env.COOLSMS_API_KEY, process.env.COOLSMS_API_SECRET);

const generateAuthNumber = () => {
    return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
};

const sendAuthNumber = async (req, res) => {
    const {phoneNumber} = req.body;
    const authNumber = generateAuthNumber(); // 생성된 인증번호
    try {
        const result = await messageService.sendOne({
            'to': phoneNumber,
            'from': '01048545370',
            'text': `딜온 회원가입을 위한 인증번호가 도착했습니다! [${authNumber}] 를 입력하시고 가입을 완료해주세요.`
        });
        console.log('SMS 발송 결과:', result); // 발송 결과 로깅 (디버깅에 도움)

        authCache[phoneNumber] = { code: authNumber };
        res.json({ success: true, message: '인증번호를 발송했습니다.' }); // 성공 응답 전송
    } catch (error) {
        console.error('SMS 발송 오류:', error);
        res.status(500).json({ success: false, message: '인증번호 발송에 실패했습니다.' }); // 실패 응답 전송
    }
}

// 메모리 기반 임시 인증 정보 저장소
const authCache = {};

// 인증번호 확인
const verifyAuthNumber = async (req, res) => {
    const { phoneNumber, authNumber } = req.body;
    const storedAuth = authCache[phoneNumber];

    if (storedAuth && storedAuth.code == authNumber) {
        delete authCache[phoneNumber]; // 인증 성공 후 삭제
        res.json({ success: true, message: '인증에 성공했습니다.' });
    } else {
        res.status(400).json({ success: false, message: '인증번호가 일치하지 않습니다.' });
    }
};

module.exports = { sendAuthNumber, verifyAuthNumber}