//to show the current date and hour
let header3 = document.querySelector("h3");

let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let hour = currentTime.getHours();
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let displayDate = `${day}, ${hour}:${minutes}`;

header3.innerHTML = displayDate;

////////////////////////////////////

// SEARCH FUNCTION. prevents the default behaviour of refreshing the page after submitting a form and has access
// to the user-searched city name.

function search(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input");

  searchCity(cityName.value);
}
let cityForm = document.querySelector("form");
cityForm.addEventListener("submit", search);

//SEARCHCITY FUNCTION. Takes the name of the city and builds the apiUrl. Calls axios to request the temp info
//from the api and uses the data to call the next function.

function searchCity(city) {
  let apiKey = "2870469bf4e2d9e7713d0410e1682df1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
//

//SHOWTEMP FUNCTION. Shows the data received from the api into our website headings.
function showWeather(response) {
  let headerCity = document.querySelector("h1");
  headerCity.innerHTML = response.data.name;

  let searchedCelsiusTemp = Math.round(response.data.main.temp);
  let headerTemp = document.querySelector("#current-temp");
  headerTemp.innerHTML = `${searchedCelsiusTemp}`;

  let humidityLine = document.querySelector("#humidity");
  humidityLine.innerHTML = response.data.main.humidity;

  let windLine = document.querySelector("#wind");
  windLine.innerHTML = Math.round(response.data.wind.speed);

  let generalWeatherLine = document.querySelector("#weather-description");
  generalWeatherLine.innerHTML = response.data.weather[0].main;

  let weatherIcon = document.querySelector("#icon");
  let iconID = response.data.weather[0].icon;
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${iconID}@2x.png`
  );

  //call a function to get from there lat and long to call the function of forecast that requires them
  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  let apiKey = "f81614abe2395d5dfecd45b9298041de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

////Add current temperature button and make it work////

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showCurrentWeather);

function showCurrentWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  let apiKey = "2870469bf4e2d9e7713d0410e1682df1";
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

//Unit convertor: it's not worth it to do it, too complicated and useless. better to build 2 different apps, one for countries with F
//and other for countries with C.

//DISPLAY FORECAST

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
        <div class="weatherForecastDate" style="text-align:center">${formatDay(
          forecastDay.dt
        )}</div>

        <img src="https://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" style="width: 50px; height: 50px; display: block; margin: 0 auto;" />

        <div style="text-align:center" class="weatherForecastTemp">
          <span style="font-size:20px" class="weatherForecastTempMin">${Math.round(
            forecastDay.temp.min
          )}</span>
          <span style="font-size:20px" class="weatherForecastTempMax">/${Math.round(
            forecastDay.temp.max
          )}</span>
        </div>

      </div>
      `;
    }
  });

  forecastHTML = forecastHTML + "</div>"; // Moved this line inside the forEach loop.
  forecastElement.innerHTML = forecastHTML;
}

//Now the forecast is displayed with many numbers instead of the names of the week, so we make a function to fix it.

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//Add current temperature of Berlin as the welcome page.

function showBerlinData(response) {
  let berlinTemp = Math.round(response.data.main.temp);
  let headerTemp = document.querySelector("#current-temp");
  headerTemp.innerHTML = `${berlinTemp}`;

  let humidityLine = document.querySelector("#humidity");
  humidityLine.innerHTML = response.data.main.humidity;

  let windLine = document.querySelector("#wind");
  windLine.innerHTML = Math.round(response.data.wind.speed);

  let generalWeatherLine = document.querySelector("#weather-description");
  generalWeatherLine.innerHTML = response.data.weather[0].main;
}

function getBerlinTemp() {
  let apiKey = "2870469bf4e2d9e7713d0410e1682df1";
  let city = "Berlin";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showBerlinData);
}

getBerlinTemp();
