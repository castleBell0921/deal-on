// server/services/locationService.js
// const fetch = require('node-fetch'); // Node.js에서 fetch API 사용

// Google Maps API 키는 여기서는 process.env에서 직접 가져옴 (다른 곳에서 주입하는 방법도 있음)
const googleMapsApiKey = process.env.Maps_API_KEY;

const getDongFromCoordinates = async (lat, lng) => {
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleMapsApiKey}&language=ko`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        let dong = '주소 없음'; // 기본값 설정

        if (data.results && data.results.length > 0) {
            const addressComponents = data.results[0].address_components;
            const dongComponent = addressComponents.find(component =>
                component.types.includes('neighborhood') ||
                component.types.includes('sublocality_level_1') ||
                component.types.includes('sublocality')
            );

            if (dongComponent) {
                dong = dongComponent.long_name;
            } else {
                const districtComponent = addressComponents.find(component =>
                    component.types.includes('sublocality_level_2') ||
                    component.types.includes('locality')
                );
                dong = districtComponent ? districtComponent.long_name : '주소 없음';
            }
        }
        return dong; // 동 정보를 반환
    } catch (error) {
        console.error('Geocoding API 호출 중 서비스 오류 발생:', error);
        // 서비스 계층에서는 에러를 throw하여 컨트롤러에서 잡도록 함
        throw new Error('주소 변환에 실패했습니다.');
    }
};

module.exports = {
    getDongFromCoordinates,
};