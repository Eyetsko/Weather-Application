function formatDate(date) {
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
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}
let updatedTime = document.querySelector(`#dateTime`);
let current = new Date();
updatedTime.innerHTML = formatDate(current);

function showWeather(response) {
  document.querySelector(`#city-name`).innerHTML = response.data.name;
}
function search(city) {
  let apiKey = "210f0105830dab42da6932b5c4b52fc7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}
function citySearch(event) {
  event.preventDefault();
  let city = document.querySelector(`#search`).value;
  search(city);
}
