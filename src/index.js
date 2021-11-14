// date and time -->

let today = new Date();
let day = today.getDay();
let daylist = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
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

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

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
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=${units}&appid=${apiKey}`;
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
  document.querySelector(
    "#todaySunrise"
  ).innerHTML = `${response.data.main.sunrise}`;
  document.querySelector(
    "#todaySunset"
  ).innerHTML = `${response.data.main.sunset}`;
  document.querySelector("#todayTemperature-description").innerHTML =
    response.data.weather[0].main;

  let iconElement = document.querySelector("#icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  celciusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiKey = "750e6f3aa3ba2abb97151b2ee35e5ad2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

// units conversion -->

let celciusTemperature = null;

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let fahrenheittemperatureElement =
    document.querySelector("#todayTemperature");
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  fahrenheittemperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelciusTemperature(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let celciustemperatureElement = document.querySelector("#todayTemperature");
  celciustemperatureElement.innerHTML = Math.round(celciusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);

// display forecast -->

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-date">
        ${formatForecastDay(forecastDay.dt)}</div>
        ${index}
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt="" width="42" />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">
          ${Math.round(forecastDay.temp.max)}°</span>
          <span class="weather-forecast-temperature-min">
          ${Math.round(forecastDay.temp.min)}°</span>
        </div>
      </div>    
   `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// fun button -->

document
  .querySelector("#perfectWeatherbutton")
  .addEventListener("click", function favouriteWeather(event) {
    event.preventDefault();
    let favouriteTemperature = prompt("What is your favourite temperature?");
    if (favouriteTemperature.length) {
      alert("Thank you! 💌 Your order has been recieved by the Wetterfee.");

      forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
          forecastHTML =
            forecastHTML +
            `
    <div class="col-2">
      <div class="weather-forecast-date">
        ${formatForecastDay(forecastDay.dt)}</div>
      <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="" width="42" />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-max">
          ${favouriteTemperature}°</span>
          <span class="weather-forecast-temperature-min">
          ${favouriteTemperature - 1}°</span>
        </div>
      </div>    
   `;
        }
      });
      forecastHTML = forecastHTML + `</div>`;
      forecastElement.innerHTML = forecastHTML;
    } else {
      alert(
        "Warning ⚠ Without your input we cannot contact the Wetterfee to book your favourite weather."
      );
    }
  });
