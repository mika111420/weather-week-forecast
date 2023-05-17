var apiKey = "901e7cc22bdd833a977d9e48c937d9b4";

var searchForm = document.getElementById('searchForm');
var inputCity = document.getElementById('cityInput');

var cityName = document.getElementById('cityName');
var date = document.getElementById('date');
var weatherIcon = document.getElementById('weatherIcon');
var temperature = document.getElementById('temperature');
// console.log(temperature);


var forecastCards = document.getElementById('forecastCards');
var historyList = document.getElementById('historyList');

function getWeather(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
console.log(queryURL)
    fetch(queryURL)
        .then(function (response) {
            console.log(response)
        
            return response.json();
        })
        .then(function (data) {
            var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&appid=${apiKey}`
            fetch(forecastURL)
                .then(forecast => forecast.json())
                .then(forecastData => {
                    displayCurrentWeather(data, forecastData);
                })
        })
};

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    var city = inputCity.value;
    if (city) {
        getWeather(city);
        inputCity.value = '';
        addSearchHistory(city)
    }
});

function displayCurrentWeather(currentDay, fiveDayForecast) {
console.log(currentDay);

var temperature = document.getElementById('temperature');
var humidity = document.getElementById('humidity');
var windSpeed = document.getElementById('windSpeed');
temperature.innerHTML = currentDay.main.temp
windSpeed.innerHTML = currentDay.wind.speed
humidity.innerHTML = currentDay.main.humidity


    // -------------
    const day = fiveDayForecast.list
    
    forecastCards.innerHTML = '';
    let count = 0
    for (i = 0; i < day.length; i++) {
        if (day[i].dt_txt.split(' ')[1] == "12:00:00") {
            if(count == 5){
                break;
            }
            var card = document.createElement('div');
            card.classList.add('forecast-card');

            const date = document.createElement('div');
            date.textContent = day[i].dt_txt;
            card.appendChild(date);

            var temperature = document.createElement('div');
            temperature.textContent = `Temperature: ${day[i].main.temp}`;
            card.appendChild(temperature);

            var windSpeed = document.createElement('div');
            windSpeed.textContent = `Wind Speed: ${day[i].wind.speed}`;
            card.appendChild(windSpeed);

            var humidity = document.createElement('div');
            humidity.textContent = `Humidity: ${day[i].main.humidity}`;
            card.appendChild(humidity);

            forecastCards.appendChild(card);
            count++
        }

    }
}

function addSearchHistory(city) {
    var historyCity = document.createElement('li');
    historyCity.textContent = city;
    historyList.appendChild(historyCity);
}