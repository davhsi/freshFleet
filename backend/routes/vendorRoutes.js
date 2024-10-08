// routes/vendorRoutes.js
const express = require('express');
const vendorController = require('../controllers/vendorController');
const router = express.Router();

router.post('/signup', vendorController.signup);
router.post('/signin', vendorController.signin);
router.post('/forget-password', vendorController.forgetPassword);
router.post('/reset-password', vendorController.resetPassword);

module.exports = router;