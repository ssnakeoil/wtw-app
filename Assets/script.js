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
    weatherAPIUrl + "q=" + city + "&units=imperial&appid=" + weatherAPIKey;
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayWeather(data, city);
    });
}
