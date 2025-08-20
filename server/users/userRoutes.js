// routes/userRoutes.js
const express = require('express');
const userController = require('../users/userController');
const router = express.Router();

router.post('/signUp', userController.signUp);
router.get('/checkId', userController.checkId);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/checkLogin', (req, res) => {
    if(req.session && req.session.isLoggedIn) {
        return res.json({ isLoggedIn: true, user: req.session.user});
    } else {
        return res.json({ isLoggedIn: false});
    }
});


module.exports = router;    