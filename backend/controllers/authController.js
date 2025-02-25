const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

class AuthController {
    async register(req, res) {
        try {
            const { name, email, password, role = 'farmer' } = req.body;

            // Validate input
            if (!name || !email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide all required fields: name, email, and password.'
                });
            }

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'User already exists'
                });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create user
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                role
            });

            const token = this.generateToken(user._id);

            // Generate a verification token
            const verificationToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Send verification email (implement email sending logic)
            // Example: sendEmail(user.email, `Verify your email: ${verificationToken}`);

            return res.status(201).json({
                success: true,
                message: 'Registration successful! Please verify your email.',
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error in registration',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Validate input
            if (!email || !password) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide both email and password.'
                });
            }

            // Check if user exists
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            // Verify password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            const token = this.generateToken(user._id);

            return res.status(200).json({
                success: true,
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error in login',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            });
        }
    }

    generateToken(userId) {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });
    }

    async getProfile(req, res) {
        try {
            const user = await User.findById(req.user.id).select('-password');
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }
            return res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching profile',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
            });
        }
    }

    async updateProfile(req, res) {
        try {
            // Validate input
            if (!req.body) {
                return res.status(400).json({
                    success: false,
                    message: 'Please provide data to update.'
                });
            }

            // Logic to update user profile
            const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
            if (!updatedUser) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            res.status(200).json({
                success: true,
                data: {
                    user: updatedUser,
                },
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating profile',
                error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
            });
        }
    }

    async requestPasswordReset(req, res) {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Generate a reset token (you can use JWT or a random string)
        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Send email with reset link (implement email sending logic)
        // Example: sendEmail(user.email, `Reset your password: ${resetToken}`);

        return res.status(200).json({ success: true, message: 'Password reset link sent' });
    }

    async resetPassword(req, res) {
        const { resetToken, newPassword } = req.body;

        // Verify the token
        const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Hash the new password and save it
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

        return res.status(200).json({ success: true, message: 'Password has been reset' });
    }

    async verifyEmail(req, res) {
        const { verificationToken } = req.body;

        // Verify the token
        const decoded = jwt.verify(verificationToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Mark user as verified
        user.isVerified = true;
        await user.save();

        return res.status(200).json({ success: true, message: 'Email verified successfully' });
    }
}

module.exports = new AuthController();
