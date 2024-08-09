const express = require('express');
const vendorController = require('../controllers/vendorController');
const router = express.Router();

router.post('/signup', vendorController.signup);
router.post('/signin', vendorController.signin);

module.exports = router;
