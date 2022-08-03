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
  return ` ${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  celsiusTemp = response.data.main.temp;
  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round(celsiusTemp);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let description = document.querySelector("#description");
  let date = document.querySelector("#date-time");
  date.innerHTML = formatDate(response.data.dt * 1000);
  description.innerHTML = response.data.weather[0].description;

  let icon = document.querySelector("#icon");
  let iconLink = response.data.weather[0].icon;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconLink}@2x.png`
  );
}

function searchLocation(position) {
  let apiKey = "1b8da53efbc507799e8037efe6fb300e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function displayCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", displayCurrentWeather);

function search(city) {
  let apiKey = "1b8da53efbc507799e8037efe6fb300e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
function submit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  search(cityInput.value);
}
function showFarenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let farenheit = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(farenheit);
}
function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  let celsius = celsiusTemp;
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsius);
}

let celsiusTemp = null;

let form = document.querySelector("#search");
form.addEventListener("submit", submit);

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", showFarenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

search("New York");
