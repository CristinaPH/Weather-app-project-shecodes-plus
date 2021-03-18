
function displayTemperature(response) {
    console.log (response.data);
    let city = response.data.name; 
    let temperature = Math.round(response.data.main.temp);
    let temperatureFeelsLike = Math.round(response.data.main.feels_like);
    let humidity = Math.round(response.data.main.humidity)  ;
    let windSpeed = Math.round(response.data.wind.speed);
    let description = response.data.weather[0].description
    
    let temperatureElement = document.querySelector ("#temperature-now");
    temperatureElement.innerHTML = temperature;

   let temperatureRealFeel = document.querySelector ("#real-feel");
    temperatureRealFeel.innerHTML = temperatureFeelsLike;
  
   let humidityElement = document.querySelector ("#humidity");
    humidityElement.innerHTML = humidity;
   
    let windElement = document.querySelector ("#wind");
    windElement.innerHTML = windSpeed;

    let cityElement = document.querySelector ("#current-city");
    cityElement.innerHTML = city; 

    let descriptionElement = document.querySelector("#weather-description");
    descriptionElement.innerHTML = description; 
 
}

let cityName = "Vienna";
let temperatureUnitCelsius = "metric";
let apiKey = "8d17eb2f64026eb70f16e29b12bf932a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${temperatureUnitCelsius}` ;

axios.get(apiUrl).then(displayTemperature);
