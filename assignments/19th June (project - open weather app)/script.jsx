let current = document.querySelector('.current')
let errorMsg = document.getElementById('errorMsg')

let cityInput = document.getElementById('cityInput')
let searchBtn = document.getElementById('searchBtn')

const apiKey = 'a6f84398a3f19c6c103d223707fffdcc'

async function getWeather() {
    let city = cityInput.value.trim()
    if (!city) {
        errorMsg.textContent = 'Please enter a city name.'
        current.innerHTML = ''
        return
    }
    try {
        let res = await fetch(`a6f84398a3f19c6c103d223707fffdcc`)
        let data = await res.json()
        if (data.cod !== 200) {
            errorMsg.textContent = 'City not found. Please try again.'
            current.innerHTML = ''
            return
        }
        errorMsg.textContent = ''
        current.innerHTML = `
            <h2>${data.name}</h2>
            <img class="weather-icon" src="https://i.pinimg.com/736x/77/0b/80/770b805d5c99c7931366c2e84e88f251.jpg" />
            <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
            <p><strong>Condition:</strong> ${data.weather[0].main}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `
        console.log(data)
    } catch (error) {
        console.log(error)
        errorMsg.textContent = 'Something went wrong. Try again later.'
        current.innerHTML = ''
    }
}

searchBtn.addEventListener('click', getWeather)