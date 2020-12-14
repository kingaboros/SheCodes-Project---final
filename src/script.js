//Display current date
function formatDate(timestamp) {
  let date = new Date(timestamp);

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

  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

// Search bar & Displaying current weather
function displayWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let description = document.querySelector("#weather-feature");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
}

// Forecast

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-md-2">
    <h3>${formatHours(forecast.dt * 1000)}</h3>
    <img src="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png" alt="" />
    <div class="weather-forecast-temperature">
    <strong>${Math.round(
      forecast.main.temp_max
    )}&#176;</strong> |  ${Math.round(forecast.main.temp_min)}&#176;
      </div>
      </div>`;
  }
}

// API

function search(cities) {
  let apiKey = "50a2cd96751f0c33cc1da997a8fb13b2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cities}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cities}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
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

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showCurrentForecast(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("clik", showCurrentForecast);

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
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let FahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElem.innerHTML = Math.round(FahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  let temperatureElem = document.querySelector("#temperature");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElem.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

// Onload location
search("London");
