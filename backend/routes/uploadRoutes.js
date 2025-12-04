const express = require('express');
const router = express.Router();
const { generateSignature, uploadImage } = require('../controllers/uploadController');

// Get Cloudinary signature for secure upload
router.get('/signature', generateSignature);

// Upload image via backend
router.post('/upload', uploadImage);

module.exports = router;