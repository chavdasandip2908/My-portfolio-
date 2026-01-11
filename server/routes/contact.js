const express = require('express');
const router = express.Router();
const { sendContactEmail } = require('../controllers/contactController');

// POST /api/contact/send
router.post('/send', sendContactEmail);

module.exports = router;
