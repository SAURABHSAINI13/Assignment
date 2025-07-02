import React from 'react';

function WeatherCard({ weather, forecast }) {
  return (
    <div className="card">
      <h2>{weather.name}</h2>
      <img
        className="weather-icon"
        src="https://i.pinimg.com/736x/77/0b/80/770b805d5c99c7931366c2e84e88f251.jpg"
        alt="weather icon"
      />
      <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
      <p><strong>Condition:</strong> {weather.weather[0].main}</p>
      <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>

      <h3>5-Day Forecast</h3>
      <div className="forecast">
        {forecast.map((day, index) => (
          <div className="forecast-day" key={index}>
            <p><strong>{new Date(day.dt_txt).toDateString()}</strong></p>
            <p>🌡️ Temp: {day.main.temp}°C</p>
            <p>☁️ {day.weather[0].main}</p>
            <p>💧 Humidity: {day.main.humidity}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherCard;
