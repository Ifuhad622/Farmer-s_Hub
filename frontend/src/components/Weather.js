import React, { useEffect, useState } from "react";

const Weather = () => {
    const [weatherInfo, setWeatherInfo] = useState('Loading...');
    const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your actual API key
    const city = "Freetown";

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setWeatherInfo(`${data.main.temp}°C, ${data.weather[0].description}`);
            } catch (error) {
                setWeatherInfo("Unable to fetch weather data.");
            }
        };

        fetchWeather();
    }, [apiKey, city]); // Dependencies for useEffect

    return (
        <section id="weather">
            <h2>Weather Forecast</h2>
            <div className="weather-container">
                <p>Current Weather: <span>{weatherInfo}</span></p>
            </div>
        </section>
    );
};

export default Weather;
