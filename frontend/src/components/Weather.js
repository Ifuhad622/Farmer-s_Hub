import React, { useEffect, useState } from "react";

const Weather = () => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=Freetown&appid=your_api_key&units=metric`)
            .then((response) => response.json())
            .then((data) => setWeather(data))
            .catch((error) => console.error("Weather API Error:", error));
    }, []);

    return (
        <section id="weather">
            <h2>Weather Forecast</h2>
            {weather ? (
                <p>{weather.main.temp}°C, {weather.weather[0].description}</p>
            ) : (
                <p>Loading...</p>
            )}
        </section>
    );
};

export default Weather;
