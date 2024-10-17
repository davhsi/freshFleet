const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../controllers/contactController');

// POST route to send contact email
router.post('/contact', sendContactEmail);

module.exports = router;
