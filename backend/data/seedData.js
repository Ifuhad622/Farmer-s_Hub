const bcrypt = require('bcryptjs');

// Users
const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'admin',
        isVerified: true,
        location: 'New Delhi',
        phoneNumber: '+91-9876543210'
    },
    {
        name: 'John Farmer',
        email: 'farmer@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'farmer',
        isVerified: true,
        location: 'Punjab',
        phoneNumber: '+91-9876543211'
    },
    {
        name: 'Buyer User',
        email: 'buyer@example.com',
        password: bcrypt.hashSync('123456', 10),
        role: 'buyer',
        isVerified: true,
        location: 'Mumbai',
        phoneNumber: '+91-9876543212'
    }
];

// Products
const products = [
    {
        name: 'Organic Wheat',
        description: 'Fresh organic wheat from Punjab farms',
        price: 30.00,
        category: 'grains',
        stock: 1000,
        unit: 'kg',
        images: ['wheat1.jpg', 'wheat2.jpg'],
        rating: 4.5,
        numReviews: 12,
        reviews: [
            {
                name: 'John Doe',
                rating: 4,
                comment: 'Great quality wheat'
            }
        ]
    },
    {
        name: 'Fresh Tomatoes',
        description: 'Locally grown fresh tomatoes',
        price: 40.00,
        category: 'vegetables',
        stock: 500,
        unit: 'kg',
        images: ['tomatoes1.jpg'],
        rating: 4.0,
        numReviews: 8,
        reviews: [
            {
                name: 'Jane Smith',
                rating: 4,
                comment: 'Very fresh tomatoes'
            }
        ]
    },
    {
        name: 'Alphonso Mangoes',
        description: 'Premium Alphonso mangoes from Maharashtra',
        price: 500.00,
        category: 'fruits',
        stock: 200,
        unit: 'kg',
        images: ['mango1.jpg', 'mango2.jpg'],
        rating: 4.8,
        numReviews: 15,
        reviews: [
            {
                name: 'Mike Johnson',
                rating: 5,
                comment: 'Best mangoes ever!'
            }
        ]
    }
];

// Market Prices
const marketPrices = [
    {
        location: 'Delhi',
        price: 25.00,
        unit: 'kg',
        date: new Date(),
        source: 'government',
        trend: 'stable',
        priceHistory: [
            { price: 24.00, date: new Date(Date.now() - 86400000) },
            { price: 25.00, date: new Date() }
        ]
    },
    {
        location: 'Mumbai',
        price: 28.00,
        unit: 'kg',
        date: new Date(),
        source: 'market_survey',
        trend: 'rising',
        priceHistory: [
            { price: 26.00, date: new Date(Date.now() - 86400000) },
            { price: 28.00, date: new Date() }
        ]
    }
];

// Forum Posts
const forumPosts = [
    {
        title: 'Best practices for organic farming',
        content: 'Here are some tips for organic farming that I've learned over the years...',
        category: 'farming_tips',
        tags: ['organic', 'farming', 'tips'],
        isLocked: false,
        isPinned: true,
        views: 150,
        likes: 45,
        comments: [
            {
                content: 'Great tips! Thanks for sharing.',
                createdAt: new Date(),
                likes: 12
            },
            {
                content: 'This helped me a lot with my farm.',
                createdAt: new Date(),
                likes: 8
            }
        ]
    },
    {
        title: 'Weather forecast discussion',
        content: 'Let's discuss the upcoming monsoon season and its impact on crops...',
        category: 'weather',
        tags: ['weather', 'monsoon', 'farming'],
        isLocked: false,
        isPinned: false,
        views: 75,
        likes: 23,
        comments: [
            {
                content: 'The forecast looks promising this year.',
                createdAt: new Date(),
                likes: 5
            }
        ]
    },
    {
        title: 'Market price trends for wheat',
        content: 'Analysis of wheat prices over the last 3 months...',
        category: 'market_analysis',
        tags: ['market', 'prices', 'wheat'],
        isLocked: false,
        isPinned: false,
        views: 120,
        likes: 34,
        comments: [
            {
                content: 'Very helpful analysis, thank you!',
                createdAt: new Date(),
                likes: 7
            }
        ]
    }
];

// Weather Data (for testing)
const weatherData = [
    {
        city: 'Delhi',
        temperature: 32,
        description: 'Clear sky',
        humidity: 65,
        windSpeed: 12,
        forecast: [
            {
                date: new Date(Date.now() + 86400000),
                temperature: 33,
                description: 'Sunny'
            }
        ]
    },
    {
        city: 'Mumbai',
        temperature: 28,
        description: 'Partly cloudy',
        humidity: 75,
        windSpeed: 8,
        forecast: [
            {
                date: new Date(Date.now() + 86400000),
                temperature: 29,
                description: 'Light rain'
            }
        ]
    }
];

// Categories
const categories = [
    {
        name: 'Grains',
        description: 'All types of grains and cereals',
        subcategories: ['Wheat', 'Rice', 'Barley']
    },
    {
        name: 'Vegetables',
        description: 'Fresh vegetables',
        subcategories: ['Leafy Greens', 'Root Vegetables', 'Tomatoes']
    },
    {
        name: 'Fruits',
        description: 'Fresh fruits',
        subcategories: ['Tropical Fruits', 'Citrus Fruits', 'Berries']
    }
];

module.exports = {
    users,
    products,
    marketPrices,
    forumPosts,
    weatherData,
    categories
};
