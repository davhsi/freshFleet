const express = require('express');
const customerController = require('../controllers/customerController');
const router = express.Router();

router.post('/signup', customerController.signup);
router.post('/signin', customerController.signin);

module.exports = router;
