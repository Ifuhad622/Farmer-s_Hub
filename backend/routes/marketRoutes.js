const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/prices', marketController.getMarketPrices);
router.get('/trends', marketController.getPriceTrends);

// Protected routes
router.post('/prices', protect, marketController.updateMarketPrice);
router.get('/prices/my-reports', protect, marketController.getMyPriceReports);

// Admin only routes
router.put('/prices/verify/:id', 
    protect, 
    authorize('admin'), 
    marketController.verifyMarketPrice
);

module.exports = router;
