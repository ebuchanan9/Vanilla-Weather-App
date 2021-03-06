  function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
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

function displayTemperature(response){
    let cityElement = document.querySelector(`#city`);
    let temperatureElement = document.querySelector(`#temperature`);
    let descriptionElement = document. querySelector(`#description`);
    let humidityElement = document.querySelector(`#humidity`);
    let windElement = document.querySelector(`#wind`);
    let dateElement = document.querySelector(`#date`);
    let iconElement = document.querySelector(`#icon`);

    farhenheitTemperature = response.data.main.temp;

    temperatureElement.innerHTML = Math.round(farhenheitTemperature);
    cityElement.innerHTML=(response.data.name);
    descriptionElement.innerHTML = (response.data.weather[0].description);
    humidityElement.innerHTML = (response.data.main.humidity);
    windElement.innerHTML= Math.round(response.data.wind.speed);
    dateElement.innerHTML= formatDate(response.data.dt * 1000)
    iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function displayForecast(response){
    let forecastElement = document.querySelector ("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;

    for(let index = 0; index<6; index ++){
    forecast = response.data.list[index];
    forecastElement.innerHTML += 
    ` <div class = "col-2">
            <h3>
                ${formatHours(forecast.dt *1000)}
            </h3>
            <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
                <strong>${Math.round(forecast.main.temp_max)}??</strong> ${Math.round(forecast.main.temp_min)}??
            </div>
        </div>
    `;
    }
    console.log(forecast);

}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let celsiusTemperature = ((farhenheitTemperature-32)*(5/9));
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(farhenheitTemperature);
}

let celsiusTemperature = null;
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

searchCity("Miami");