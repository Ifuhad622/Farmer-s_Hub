const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.get('/categories', productController.getCategories);

// Protected routes
router.post('/', 
    protect, 
    authorize('farmer', 'admin'), 
    productController.createProduct
);

router.put('/:id', 
    protect, 
    authorize('farmer', 'admin'), 
    productController.updateProduct
);

router.delete('/:id', 
    protect, 
    authorize('farmer', 'admin'), 
    productController.deleteProduct
);

// Review routes
router.post('/:id/reviews', 
    protect, 
    productController.createProductReview
);

router.get('/:id/reviews', productController.getProductReviews);

module.exports = router;
