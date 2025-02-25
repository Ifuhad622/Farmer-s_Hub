const Market = require('../models/Market');
const Product = require('../models/Product');

class MarketController {
    async getMarketPrices(req, res) {
        try {
            const { category, location } = req.query;
            const query = {};
            
            if (category) query.category = category;
            if (location) query.location = location;

            const prices = await Market.find(query)
                .populate('product', 'name category')
                .sort('-updatedAt');

            return res.status(200).json({
                success: true,
                data: prices
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching market prices',
                error: error.message
            });
        }
    }

    async updateMarketPrice(req, res) {
        try {
            const { productId, price, location } = req.body;

            const marketPrice = await Market.findOneAndUpdate(
                { product: productId, location },
                { price },
                { new: true, upsert: true }
            );

            return res.status(200).json({
                success: true,
                data: marketPrice
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error updating market price',
                error: error.message
            });
        }
    }

    async getPriceTrends(req, res) {
        try {
            const { productId, duration = 30 } = req.query;
            const startDate = new Date();
            startDate.setDate(startDate.getDate() - duration);

            const trends = await Market.find({
                product: productId,
                updatedAt: { $gte: startDate }
            }).sort('updatedAt');

            return res.status(200).json({
                success: true,
                data: trends
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching price trends',
                error: error.message
            });
        }
    }
}

module.exports = new MarketController();
