const axios = require('axios');

class WeatherController {
    constructor() {
        this.apiKey = process.env.WEATHER_API_KEY;
        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
    }

    async getWeather(req, res) {
        try {
            const { city } = req.query;
            const response = await axios.get(`${this.baseUrl}/weather`, {
                params: {
                    q: city,
                    appid: this.apiKey,
                    units: 'metric'
                }
            });

            return res.status(200).json({
                success: true,
                data: {
                    temperature: response.data.main.temp,
                    description: response.data.weather[0].description,
                    humidity: response.data.main.humidity,
                    windSpeed: response.data.wind.speed
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching weather data',
                error: error.message
            });
        }
    }

    async getForecast(req, res) {
        try {
            const { city, days = 5 } = req.query;
            const response = await axios.get(`${this.baseUrl}/forecast`, {
                params: {
                    q: city,
                    appid: this.apiKey,
                    units: 'metric',
                    cnt: days * 8
                }
            });

            const forecast = response.data.list.map(item => ({
                date: item.dt_txt,
                temperature: item.main.temp,
                description: item.weather[0].description,
                humidity: item.main.humidity
            }));

            return res.status(200).json({
                success: true,
                data: forecast
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching forecast data',
                error: error.message
            });
        }
    }
}

module.exports = new WeatherController();
