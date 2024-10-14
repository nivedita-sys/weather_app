const apiKey = 'fd47a299f1a18cee28602fd50bd9f59e';  // Replace with your OpenWeather API key
const weatherBtn = document.getElementById('getWeatherBtn');
const weatherResult = document.getElementById('weatherResult');

weatherBtn.addEventListener('click', () => {
    const city = document.getElementById('city').value;
    getWeather(city);
});

function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('City not found');
            }
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            alert('Error fetching the weather data');
        });
}

function displayWeather(data) {
    const location = document.getElementById('location');
    const description = document.getElementById('description');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const weatherIcon = document.getElementById('weatherIcon');

    location.textContent = `${data.name}, ${data.sys.country}`;
    description.textContent = `Weather: ${data.weather[0].description}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    const iconCode = data.weather[0].icon;
    weatherIcon.src = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    // Reveal weather result div
    weatherResult.style.display = 'block';

    // Change background based on weather condition
    const weatherCondition = data.weather[0].main.toLowerCase();
    const body = document.body;

    // Remove the initial background and add the weather background
    body.classList.remove('initial-background');

    switch (weatherCondition) {
        case 'clear':
            body.className = 'clear-sky';
            break;
        case 'clouds':
            body.className = 'clouds';
            break;
        case 'rain':
            body.className = 'rain';
            break;
        case 'snow':
            body.className = 'snow';
            break;
        default:
            body.className = 'default-weather';
            break;
    }
}
