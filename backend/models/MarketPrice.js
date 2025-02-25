const mongoose = require('mongoose');

const marketPriceSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    location: {
        type: String,
        required: [true, 'Please specify market location']
    },
    price: {
        type: Number,
        required: [true, 'Please specify price'],
        min: [0, 'Price cannot be negative']
    },
    unit: {
        type: String,
        required: true,
        enum: ['kg', 'g', 'l', 'pieces']
    },
    date: {
        type: Date,
        default: Date.now
    },
    source: {
        type: String,
        required: [true, 'Please specify price source'],
        enum: ['government', 'market_survey', 'user_reported', 'other']
    },
    reporter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    priceHistory: [{
        price: Number,
        date: {
            type: Date,
            default: Date.now
        }
    }],
    trend: {
        type: String,
        enum: ['rising', 'falling', 'stable'],
        default: 'stable'
    }
}, {
    timestamps: true
});

// Compound index for querying prices by product and location
marketPriceSchema.index({ product: 1, location: 1 });

// Index for date-based queries
marketPriceSchema.index({ date: -1 });

module.exports = mongoose.model('MarketPrice', marketPriceSchema);
