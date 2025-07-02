import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([])
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_API_KEY;

  const getWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      setWeather(null)
      return;
    }

    setLoading(true)
    setError('');

    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      const data = await res.json();

      if (data.cod !== 200) {
        setError('City not found. Please try again.')
        setWeather(null);
        setForecast([]);
        setLoading(false)
        return;
      }

      setWeather(data)

      const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
      const forecastData = await forecastRes.json();

      const daily = forecastData.list.filter(item => item.dt_txt.includes('12:00:00'));
      setForecast(daily);

    } catch (err) {
      setError('Something went wrong. Try again later.')
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🌤️ Weather App</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Search</button>
      </div>
      {error && <p className="error">{error}</p>}
      {loading && <p>Loading...</p>}
      {weather && <WeatherCard weather={weather} forecast={forecast} />}
    </div>
  );
}

export default App;
