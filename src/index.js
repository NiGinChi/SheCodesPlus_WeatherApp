// date and time -->

let today = new Date();
let day = today.getDay();
let daylist = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday ",
  "Thursday",
  "Friday",
  "Saturday",
];
let date =
  today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();

let hour = today.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = hour + ":" + minutes;

document.getElementById("displayDate").innerHTML = daylist[day] + ", " + date;

document.getElementById("displayTime").innerHTML = time;

//  units | search bar  -->

function searchCity(city) {
  let apiKey = "750e6f3aa3ba2abb97151b2ee35e5ad2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function submittedCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let citySearch = document.querySelector("#new-form");
citySearch.addEventListener("submit", submittedCity);

function searchLocation(position) {
  let apiKey = "750e6f3aa3ba2abb97151b2ee35e5ad2";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#currentButton");
currentLocationButton.addEventListener("click", getCurrentLocation);

// weather of city -->

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#todayTemperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#todayHumidity"
  ).innerHTML = `${response.data.main.humidity}%`;
  document.querySelector("#todayWindspeed").innerHTML = `${Math.round(
    response.data.wind.speed
  )}km/h`;
  document.querySelector("#todayTemperature-description").innerHTML =
    response.data.weather[0].main;

  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
