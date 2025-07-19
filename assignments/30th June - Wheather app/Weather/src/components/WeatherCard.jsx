import React from 'react';
import './WeatherCard.css';
import WeatherSearch from './WeatherSearch.jsx';
function WeatherCard({ weather, forecast }) {
  const icon = weather?.weather?.[0]?.icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="card">
      <h2>{weather.name}</h2>
      <img className="weather-icon" src={iconUrl} alt="weather icon" />
      <p><strong>Temperature:</strong> {weather.main.temp}°C</p>
      <p><strong>Condition:</strong> {weather.weather[0].main}</p>
      <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>

      {forecast.length > 0 && (
        <>
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
        </>
      )}
    </div>
  );
}

export default WeatherCard;
