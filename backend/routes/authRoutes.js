const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected routes
router.get('/profile', protect, authController.getProfile);
router.put('/profile/update', protect, authController.updateProfile); // Ensure this function is defined
router.post('/password/reset-request', authController.requestPasswordReset);
router.post('/password/reset', authController.resetPassword);

module.exports = router;
