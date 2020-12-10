//Display current date
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  return `${day} ${hours}: ${minutes}`;
}

// Search bar & Displaying current weather
function displayWeather(response) {
  document.querySelector("#city-name").innerHTML = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  let description = document.querySelector("#weather-feature");
  temperatureElement.innerHTML = temperature;

  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function search(cities) {
  let apiKey = "50a2cd96751f0c33cc1da997a8fb13b2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function searchBar(event) {
  event.preventDefault();
  let cities = document.querySelector("#search-text-input").value;
  search(cities);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searchBar);

// Location button
function searchLocation(position) {
  let apiKey = "50a2cd96751f0c33cc1da997a8fb13b2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function showCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", showCurrentWeather);

// Fahrenheit & Celsius buttons

function showFahrenheit(event) {
  event.preventDefault();
  let temperatureElem = document.querySelector("#temperature");
  let temperature = temperatureElem.innerHTML;
  temperature = Number(temperature);
  temperatureElem.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let temperatureElem = document.querySelector("#temperature");
  let temperature = temperatureElem.innerHTML;
  temperature = Number(temperature);
  temperatureElem.innerHTML = temperature;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

// Onload location
search("London");
