const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');
const rateLimit = require('express-rate-limit');

// Check if the authController functions are defined
if (!authController.register || !authController.login || 
    !authController.getProfile || !authController.updateProfile || 
    !authController.requestPasswordReset || !authController.resetPassword) {
    throw new Error('One or more authController functions are undefined');
}

// Create a rate limiter for login attempts
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 login attempts per windowMs
    message: 'Too many login attempts from this IP, please try again later.',
});

// Public routes
router.post('/register', authController.register);
router.post('/login', loginLimiter, authController.login);

// Protected routes
router.get('/profile', protect, authController.getProfile);
router.put('/profile/update', protect, authController.updateProfile);
router.post('/password/reset-request', authController.requestPasswordReset);
router.post('/password/reset', authController.resetPassword);

// Example of a protected route for admin
router.get('/admin', protect, authorize('admin'), (req, res) => {
    res.status(200).json({ success: true, message: 'Welcome Admin!' });
});

module.exports = router;
