const express = require('express');
const { register, activate, login, forgotPassword, resetPassword } = require('../controllers/auth');
const router = express.Router();

router.post('/register', register);
router.get('/activate/:token', activate);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

module.exports = router;
