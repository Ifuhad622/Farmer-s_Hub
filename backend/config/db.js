const mongoose = require('mongoose');

// MongoDB connection options
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true, // Build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, options);

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);

        // Handle connection events
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error(`Mongoose connection error: ${err}`);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected from MongoDB');
        });

        // If the Node process ends, close the Mongoose connection
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            console.log('Mongoose connection closed through app termination');
            process.exit(0);
        });

    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`.red);
        // Exit with failure
        process.exit(1);
    }
};

// Function to close database connection
const closeDatabase = async () => {
    try {
        await mongoose.connection.close();
        console.log('Database connection closed successfully');
    } catch (error) {
        console.error('Error closing database connection:', error);
        throw error;
    }
};

// Function to clear database (useful for testing)
const clearDatabase = async () => {
    if (process.env.NODE_ENV !== 'production') {
        const collections = mongoose.connection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    }
};

// Function to check database connection status
const checkConnection = () => {
    return mongoose.connection.readyState === 1;
};

module.exports = {
    connectDB,
    closeDatabase,
    clearDatabase,
    checkConnection
};
