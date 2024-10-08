const express = require('express');
const customerController = require('../controllers/customerController');
const router = express.Router();

router.post('/signup', customerController.signup);
router.post('/signin', customerController.signin);
router.post('/forget-password', customerController.forgetPassword);
router.post('/reset-password', customerController.resetPassword);

module.exports = router;