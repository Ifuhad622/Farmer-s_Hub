const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const { protect } = require('../middleware/auth');

router.get('/current', protect, weatherController.getWeather);
router.get('/forecast', protect, weatherController.getForecast);
router.get('/alerts', protect, weatherController.getWeatherAlerts);

module.exports = router;
