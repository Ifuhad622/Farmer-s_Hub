import React, { useState, useEffect } from "react";

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const city = "Freetown";

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
                let data = await response.json();
                setWeather(`${data.main.temp}°C, ${data.weather[0].description}`);
            } catch (error) {
                setError("Unable to fetch weather data.");
            }
        };

        fetchWeather();
    }, []);

    return (
        <div className="weather-container">
            <h2>Weather Forecast</h2>
            <p>Current Weather: <span>{error ? error : weather || "Loading..."}</span></p>
        </div>
    );
};

export default Weather;
