const express = require('express');
const authController = require('./authController');
const router = express.Router();

// 인증번호 발송
router.post('/sendAuthNumber', authController.sendAuthNumber);
// 인증번호 확인
router.post('/verifyAuthNumber', authController.verifyAuthNumber);

module.exports = router;