const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes
exports.protect = async (req, res, next) => {
    try {
        let token;

        // Check for token in Authorization header
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        // Check for token in cookies (optional)
        else if (req.cookies?.token) {
            token = req.cookies.token;
        }

        // If no token is found, return an error
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Please login to access this resource'
            });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from token and exclude password
            const user = await User.findById(decoded.id).select('-password');

            // If user is not found, return an error
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'User not found'
                });
            }

            // Check if user is active/verified
            if (!user.isVerified) {
                return res.status(401).json({
                    success: false,
                    message: 'Please verify your email first'
                });
            }

            // Add user to request object
            req.user = user;
            next();

        } catch (error) {
            // Handle token errors
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid token'
                });
            }
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    message: 'Token expired'
                });
            }
            throw error; // Rethrow unexpected errors
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server error during authentication',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Middleware to authorize user roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `User role ${req.user.role} is not authorized to access this route`
            });
        }
        next();
    };
};

// Middleware to check if user owns the resource
exports.checkOwnership = (model) => async (req, res, next) => {
    try {
        const resource = await model.findById(req.params.id);

        if (!resource) {
            return res.status(404).json({
                success: false,
                message: 'Resource not found'
            });
        }

        // Check if the resource has a user/author/seller field and if it matches the current user
        const ownerId = resource.user || resource.author || resource.seller;

        if (ownerId.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to perform this action'
            });
        }

        req.resource = resource;
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error checking resource ownership',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};

// Rate limiting middleware
exports.rateLimit = (limit, minutes) => {
    const requests = new Map();

    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User not authenticated'
            });
        }

        const userId = req.user.id;
        const now = Date.now();

        if (requests.has(userId)) {
            const userData = requests.get(userId);
            const timeDiff = now - userData.timestamp;

            if (timeDiff < minutes * 60 * 1000) {
                if (userData.count >= limit) {
                    return res.status(429).json({
                        success: false,
                        message: `Too many requests. Please try again after ${Math.ceil((minutes * 60 * 1000 - timeDiff) / 1000)} seconds`
                    });
                }
                userData.count++;
            } else {
                userData.count = 1;
                userData.timestamp = now;
            }
        } else {
            requests.set(userId, {
                count: 1,
                timestamp: now
            });
        }
        next();
    };
};
