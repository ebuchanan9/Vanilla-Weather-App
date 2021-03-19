function displayTemperature(response){
    let cityElement = document.querySelector(`#city`);
    let temperatureElement = document.querySelector(`#temperature`);
    let descriptionElement = document. querySelector(`#description`);
    let humidityElement = document.querySelector(`#humidity`);
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML=(response.data.name);
    descriptionElement.innerHTML = (response.data.weather[0].description);
    humidityElement.innerHTML = (response.data.main.humidity);
}

let apiKey ="00ccd60e50147aa10fe0e380d859f398";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=imperial`;


axios.get(apiUrl).then(displayTemperature);
