const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const { connectDB } = require('./config/db');
const logger = require('./logger');
const { middleware: metricsMiddleware, client } = require('./metrics');
const responseTime = require('response-time');
const Sentry = require('@sentry/node');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

// Initialize express
const app = express();

// Middleware setup
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security middleware
app.use(helmet());
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api', limiter);

// Data sanitization middleware
app.use(mongoSanitize());
app.use(xss());
app.use(hpp({
    whitelist: ['price', 'rating', 'category']
}));

// Compression middleware
app.use(compression());

// Middleware for logging requests
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

// Use metrics middleware
app.use(metricsMiddleware);

// Use response-time middleware
app.use(responseTime((req, res, time) => {
    logger.info(`Response time: ${time} ms for ${req.method} ${req.url}`);
}));

// Initialize Sentry
Sentry.init({
    dsn: process.env.SENTRY_DSN, // Your Sentry DSN
    tracesSampleRate: 1.0, // Adjust this value in production
});

// Request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// Routes
const authRoutes = require('./routes/authRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const marketRoutes = require('./routes/marketRoutes');
const forumRoutes = require('./routes/forumRoutes');
const productRoutes = require('./routes/productRoutes');

// Mount routes
app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/products', productRoutes);

// Endpoint to expose metrics
app.get('/metrics', async (req, res) => {
    res.set('Content-Type', client.register.contentType);
    res.end(await client.register.metrics());
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    logger.error(err.message);
    next(err);
});

// Handle unhandled routes
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: `Can't find ${req.originalUrl} on this server`
    });
});

// Error handler must be before any other error middleware
app.use(Sentry.Handlers.errorHandler());

// Start server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...'.red);
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...'.red);
    console.log(err.name, err.message);
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});