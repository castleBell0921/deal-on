// server/controllers/locationController.js
const locationService = require('../location/locationService'); // 서비스 불러오기

const getAddress = async (req, res) => {
    const { lat, lng } = req.query; // 클라이언트에서 쿼리 파라미터로 위도/경도 받기

    // 필수 파라미터 유효성 검사 (여기서도 할 수 있지만, 서비스 단에서 더 강력하게 하는 것이 좋음)
    if (!lat || !lng) {
        return res.status(400).json({ error: '위도(lat)와 경도(lng) 정보가 필요합니다.' });
    }

    try {
        // 서비스 계층으로 위도/경도 전달하여 주소 변환 요청
        const dong = await locationService.getDongFromCoordinates(lat, lng);
        res.json({ dong });
    } catch (error) {
        console.error('위치 컨트롤러에서 오류 발생:', error); // 서비스에서 발생한 에러를 여기서 잡아서 처리
        res.status(500).json({ error: error.message || '주소 변환에 실패했습니다.' });
    }
};

module.exports = {
    getAddress,
};