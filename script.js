// Replace with your actual free API key from OpenWeatherMap
const API_KEY = "YOUR_OPENWEATHER_API_KEY"; 

document.getElementById('search-btn').addEventListener('click', fetchWeather);
document.getElementById('city-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        fetchWeather();
    }
});

async function fetchWeather() {
    const city = document.getElementById('city-input').value.trim();
    const errorMsg = document.getElementById('error-msg');
    const weatherInfo = document.getElementById('weather-info');

    if (city === '') return;

    // Standard OpenWeatherMap URL configuration using Metric units (°C)
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        
        // Hide error and show info container
        errorMsg.style.display = "none";
        weatherInfo.style.display = "block";

        // Inject the API data into the UI
        document.getElementById('city-name').innerText = `${data.name}, ${data.sys.country}`;
        document.getElementById('temp').innerText = `${Math.round(data.main.temp)}°C`;
        document.getElementById('description').innerText = data.weather[0].description;
        document.getElementById('humidity').innerText = data.main.humidity;
        document.getElementById('wind').innerText = data.wind.speed;

    } catch (error) {
        // Handle issues or misspellings gracefully
        weatherInfo.style.display = "none";
        errorMsg.style.display = "block";
        console.error("Error fetching weather data:", error);
    }
}