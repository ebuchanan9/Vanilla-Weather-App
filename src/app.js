  
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
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML=(response.data.name);
    descriptionElement.innerHTML = (response.data.weather[0].description);
    humidityElement.innerHTML = (response.data.main.humidity);
    windElement.innerHTML= Math.round(response.data.wind.speed);
    dateElement.innerHTML= formatDate(response.data.dt * 1000)

    console.log(response.data);
}

let apiKey ="00ccd60e50147aa10fe0e380d859f398";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=imperial`;


axios.get(apiUrl).then(displayTemperature);
