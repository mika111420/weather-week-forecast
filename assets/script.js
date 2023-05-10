var apiKey = "901e7cc22bdd833a977d9e48c937d9b4";

var searchForm = document.getElementById('searchForm');
var inputCity = document.getElementById('cityInput');
var cityName = document.getElementById('cityName');
var date = document.getElementById('date');
var weatherIcon = document.getElementById('weatherIcon');
var temperature = document.getElementById('temperature');
var humidity = document.getElementById('humidity');
var windSpeed = document.getElementById('windSpeed');
var forecastCards = document.getElementById('forecastCards');
var historyList = document.getElementById('historyList');



searchForm.addEventListener('submit', function(event){
    event.preventDefault();
    var city = inputCity.value();
    if (city) {
        getWeather(city);
        inputCity.value = '';
    }
});

function displayForecast(dayForecast) {
    forecastCards.innerHTML = '';
    for(let day of forecast) {
        var card = document.createElement('div');
        card.classList.add('forecast-card');
        const date = document.createElement('div');
        date.textContent = day.date;
        card.appendChild(date);

        var temperature = document.createElement('div');
        temperature.textContent = `Temperature: ${day.temperature}`;
        card.appendChild(temperature);

        const windSpeed = document.createElement('div');
        windSpeed.textContent = `Wind Speed: ${day.windSpeed}`;
        card.appendChild(windSpeed);

        const humidity = document.createElement('div');
        humidity.textContent = `Humidity: ${day.humidity}`;
        card.appendChild(humidity);

        forecastCards.appendChild(card);
    }
}