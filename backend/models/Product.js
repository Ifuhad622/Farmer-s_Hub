const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide product name'],
        trim: true,
        maxLength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please provide product description'],
        maxLength: [1000, 'Description cannot exceed 1000 characters']
    },
    price: {
        type: Number,
        required: [true, 'Please provide product price'],
        min: [0, 'Price cannot be negative']
    },
    category: {
        type: String,
        required: [true, 'Please specify product category'],
        enum: ['vegetables', 'fruits', 'grains', 'dairy', 'livestock', 'other']
    },
    stock: {
        type: Number,
        required: [true, 'Please specify stock quantity'],
        min: [0, 'Stock cannot be negative']
    },
    unit: {
        type: String,
        required: [true, 'Please specify unit of measurement'],
        enum: ['kg', 'g', 'l', 'pieces']
    },
    images: [{
        type: String,
        required: false
    }],
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        default: 0,
        min: [0, 'Rating must be at least 0'],
        max: [5, 'Rating cannot exceed 5']
    },
    numReviews: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
