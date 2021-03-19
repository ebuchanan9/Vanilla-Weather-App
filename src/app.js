function displayTemperature(response){
    let cityElement = document.querySelector(`#city`);
    let temperatureElement = document.querySelector(`#temperature`);
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML=(response.data.name);
}

let apiKey ="00ccd60e50147aa10fe0e380d859f398";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=imperial`;


axios.get(apiUrl).then(displayTemperature);
