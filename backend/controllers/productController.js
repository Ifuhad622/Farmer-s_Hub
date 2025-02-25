const Product = require('../models/Product');

class ProductController {
    async createProduct(req, res) {
        try {
            const { name, description, price, category, stock } = req.body;
            const product = await Product.create({
                name,
                description,
                price,
                category,
                stock,
                seller: req.user.id
            });

            return res.status(201).json({
                success: true,
                data: product
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error creating product',
                error: error.message
            });
        }
    }

    async getProducts(req, res) {
        try {
            const { category, search, page = 1, limit = 10 } = req.query;
            const query = {};

            if (category) query.category = category;
            if (search) {
                query.$or = [
                    { name: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ];
            }

            const products = await Product.find(query)
                .populate('seller', 'name')
                .sort('-createdAt')
                .skip((page - 1) * limit)
                .limit(limit);

            const total = await Product.countDocuments(query);

            return res.status(200).json({
                success: true,
                data: products,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching products',
                error: error.message
            });
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const updates = req.body;

            const product = await Product.findOneAndUpdate(
                { _id: id, seller: req.user.id },
                updates,
                { new: true }
            );

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found or unauthorized'
                });
            }

            return res.status(200).json({
                success: true,
                data: product
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error updating product',
                error: error.message
            });
        }
    }

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findOneAndDelete({
                _id: id,
                seller: req.user.id
            });

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found or unauthorized'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Product deleted successfully'
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error deleting product',
                error: error.message
            });
        }
    }
}

module.exports = new ProductController();
