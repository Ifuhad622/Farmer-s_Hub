const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

class AuthController {
    async register(req, res) {
        try {
            const { name, email, password, role = 'farmer' } = req.body;

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

            return res.status(201).json({
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
                message: 'Error in registration',
                error: error.message
            });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;

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
                error: error.message
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
            return res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching profile',
                error: error.message
            });
        }
    }

    // Example implementation of updateProfile
    async updateProfile(req, res) {
        try {
            // Logic to update user profile
            const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
            res.status(200).json({
                status: 'success',
                data: {
                    user: updatedUser,
                },
            });
        } catch (error) {
            res.status(500).json({
                status: 'error',
                message: error.message,
            });
        }
    }
}

module.exports = new AuthController();
