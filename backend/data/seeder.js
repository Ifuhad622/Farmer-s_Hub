const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Load models
const User = require('./models/User');
const Product = require('./models/Product');
const MarketPrice = require('./models/MarketPrice');
const ForumPost = require('./models/ForumPost');

// Load  data
const {
    users,
    products,
    marketPrices,
    forumPosts
} = require('./seedData');

// Connect to DB
mongoose.connect(process.env.MONGODB_ATLAS_URI);

// Import data into DB
const importData = async () => {
    try {
        // Clear existing data
        await User.deleteMany();
        await Product.deleteMany();
        await MarketPrice.deleteMany();
        await ForumPost.deleteMany();

        // Create users first
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        // Add user reference to products
        const sampleProducts = products.map(product => {
            return { ...product, seller: adminUser };
        });

        // Create products
        const createdProducts = await Product.insertMany(sampleProducts);

        // Add product reference to market prices
        const sampleMarketPrices = marketPrices.map((price, index) => {
            return { ...price, product: createdProducts[index]._id };
        });

        // Create market prices
        await MarketPrice.insertMany(sampleMarketPrices);

        // Add user reference to forum posts
        const sampleForumPosts = forumPosts.map(post => {
            return {
                ...post,
                author: adminUser,
                comments: post.comments.map(comment => ({
                    ...comment,
                    user: adminUser
                }))
            };
        });

        // Create forum posts
        await ForumPost.insertMany(sampleForumPosts);

        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

// Delete data from DB
const destroyData = async () => {
    try {
        await User.deleteMany();
        await Product.deleteMany();
        await MarketPrice.deleteMany();
        await ForumPost.deleteMany();

        console.log('Data Destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

// Check command line argument for import or destroy
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}
