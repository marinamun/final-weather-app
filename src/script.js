//to show the current date and hour
let header3 = document.querySelector("h3");

let currentTime = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

//SHOWTEMP FUNCTION. Shows the data received from the api into our website headings.
function showWeather(response) {
  let headerCity = document.querySelector("h1");
  headerCity.innerHTML = response.data.name;

  let searchedTemp = Math.round(response.data.main.temp);
  let headerTemp = document.querySelector("#current-temp");
  headerTemp.innerHTML = `${searchedTemp}ºC`;

  let humidityLine = document.querySelector("#humidity");
  humidityLine.innerHTML = response.data.main.humidity;

  let windLine = document.querySelector("#wind");
  windLine.innerHTML = Math.round(response.data.wind.speed);

  let generalWeatherLine = document.querySelector("#weather-description");
  generalWeatherLine.innerHTML = response.data.weather[0].main;
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
