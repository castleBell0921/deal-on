// server/routes/locationRoutes.js
const express = require('express');
const router = express.Router();
const locationController = require('../location/locationController'); // 컨트롤러 불러오기

// GET /api/get-address 요청이 들어오면 locationController.getAddress 함수 실행
router.get('/get-address', locationController.getAddress);

module.exports = router;