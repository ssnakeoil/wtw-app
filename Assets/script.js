var weatherAPIKey = "4830514ebb8ce3f6f8d880610c75ec0e"; // weather API key
var weatherAPIUrl = "http://api.openweathermap.org/data/2.5/weather?"; // weather API url
var searches = []; // array will store searches

var searchForm = document.querySelector("#searchForm");
var searchInput = document.querySelector("#searchInput");
var searchButton = document.querySelector("#searchButton");
var forecastContainer = document.querySelector("#forecastContainer");
var currentWeatherContainer = document.querySelector(
  "#currentWeatherContainer"
);

dayjs.extend(window.dayjs_plugin_timezone); // dayjs timezone plugin
dayjs.tz.setDefault("America/New_York"); // set timezone to EST
var now = dayjs(); // get current time

// function to get weather data from API
function getWeatherData(city) {
  var apiUrl =
    weatherAPIUrl + "q=" + city + "&units=imperial&appid=" + weatherAPIKey; // build API url
  fetch(apiUrl) // fetch data from API
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayWeather(data, city);
    });
}

function renderSearches() {
  var searchHistoryItem = localStorage.getItem("search");
  if (searchHistoryItem) {
    // if there is a search history item in local storage, parse and store in searches array
    searches = JSON.parse(searchHistoryItem);
  }
  searchHistoryContainer.innerHTML = "";
  for (var i = 0; i < searches.length; i++) {
    var search = searches[i];
    var li = document.createElement("li");
    li.textContent = search.city;
    searchHistoryContainer.appendChild(li);
  }
}

function appendHistory(searched) {
  if (searches.indexOf(searched) !== -1) {
    return
  } else {
    searches.push(searched);
  }
  localStorage.setItem("search", JSON.stringify(searches));
  renderSearches();
}

function retrieveHistory() {
  var storedSearches = localStorage.getItem("search");
  if (storedSearches) {
    searches = JSON.parse(storedSearches);
  }
  renderSearches();
}

// function to display weather data of searched city
function displayWeather(weather, searchCity) {
  // clear old content
  forecastContainer.textContent = "";
  searchInput.value = "";

  // create html elements to display weather data
  var cityName = document.createElement("h3");
  cityName.textContent = searchCity + " (" + now.format("M/D/YYYY") + ") ";
  forecastContainer.appendChild(cityName);

  var temperature = document.createElement("p");
  temperature.textContent = "Temperature: " + weather.main.temp + " °F";
  forecastContainer.appendChild(temperature);

  var humidity = document.createElement("p");
  humidity.textContent = "Humidity: " + weather.main.humidity + "%";
  forecastContainer.appendChild(humidity);

  var windSpeed = document.createElement("p");
  windSpeed.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
  forecastContainer.appendChild(windSpeed);
}

// search will get data from API and be saved to local storage
searchButton.addEventListener("click", function (event) {
  event.preventDefault();
  var searchCity = searchInput.value;
  getWeatherData(searchCity);
  searches.unshift({ city: searchCity });
  localStorage.setItem("search", JSON.stringify(searches));
});

// function to display current weather at all times
function displayCurrentWeather(defaultCity, defaultWeather) {
  var defaultCity = "New York";
  var defaultWeather = getWeatherData(defaultCity);

  var currentWeather = document.createElement("div");
  currentWeatherContainer.appendChild(currentWeather);

  var currentCity = document.createElement("h3");
  currentCity.textContent = "Current Weather";
  currentWeather.appendChild(currentCity);

  var currentTemperature = document.createElement("p");
  currentTemperature.textContent = "Temperature: " + defaultWeather.main.temp + "°F";
  currentWeather.appendChild(currentTemperature);

  var currentHumidity = document.createElement("p");
  currentHumidity.textContent = "Humidity: " + defaultWeather.main.humidity + "%";
  currentWeather.appendChild(currentHumidity);

  var currentWindSpeed = document.createElement("p");
  currentWindSpeed.textContent = "Wind Speed: " + defaultWeather.wind.speed + " MPH";
  currentWeather.appendChild(currentWindSpeed);
}

displayCurrentWeather();
searchButton.addEventListener("click", displayWeather);
