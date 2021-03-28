//1. Api; openweathermap
function formatDate (timestamp){
//calculate the current date; 
let date = new Date (); 

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
let day = days[date.getDay()]; // day of the week;  Sunday - Saturday : 0 - 6
let dayMth = date.getDate(); // day of the Month: 1-31; 
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let month = months[date.getMonth ()]; // month of the year: 0-11, January gives 0
let hours = date.getHours();
if (hours<10) {hours = `0${hours}`;  
}
let minutes = date.getMinutes();
if (minutes<10) { minutes = `0${minutes}`;    
} 
//console.log (date);
return `${day} ${dayMth} ${month} @${hours}:${minutes}`;
}


function formatDateLastUpdate (timestamp){
let timeLastUpdate = new Date (timestamp); 

let hours = timeLastUpdate.getHours();
if (hours<10) {hours = `0${hours}`;  
}
let minutes = timeLastUpdate.getMinutes();
if (minutes<10) { minutes = `0${minutes}`;    
} 
return `${hours}:${minutes}`;
}

function getNameOfDay(timestamp) {
  let date = new Date(timestamp)
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  let day = days[date.getDay()];
  return day;
}

function displayTemperature(response) {
    console.log (response.data.timezone);
    celsiusTemperature = Math.round(response.data.main.temp);
    celsiusRealFeal = Math.round(response.data.main.feels_like);
    let latitude = response.data.coord.lat;
    let longitude = response.data.coord.lon;
    fetchForecast(latitude,longitude);
    let currentCity = response.data.name; 
    let temperature = Math.round(celsiusTemperature);
    let temperatureFeelsLike = Math.round(celsiusRealFeal);
    let humidity = Math.round(response.data.main.humidity)  ;
    let windSpeed = Math.round(response.data.wind.speed);
    let description = response.data.weather[0].description;
    let date = formatDate(response.data.dt*1000); 
    let lastUpdate = formatDateLastUpdate(response.data.dt*1000); 
    let icon = response.data.weather[0].icon;

    let cityElement = document.querySelector ("#current-city");
    let temperatureElement = document.querySelector ("#temperature-now");
    let temperatureRealFeel = document.querySelector ("#real-feel");
    let humidityElement = document.querySelector ("#humidity");
    let windElement = document.querySelector ("#wind");
    let descriptionElement = document.querySelector("#weather-description");
    let dateElement = document.querySelector ("#date");
    let lastUpdateElement = document.querySelector ("#lastUpdate");
    let iconElement = document.querySelector ("#icon");
   
    cityElement.innerHTML = currentCity; 
    temperatureElement.innerHTML = `${temperature}°`;
    temperatureRealFeel.innerHTML = temperatureFeelsLike;
    humidityElement.innerHTML = humidity;
    windElement.innerHTML = windSpeed;
    descriptionElement.innerHTML = description; 
    dateElement.innerHTML = date;  
    lastUpdateElement.innerHTML = lastUpdate;  
    iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${icon}@2x.png`)

}



//2. search engine
function search(city) {
let temperatureUnitCelsius = "metric";
let apiKey = "8d17eb2f64026eb70f16e29b12bf932a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${temperatureUnitCelsius}` ;
axios.get(apiUrl).then(displayTemperature);
}

// forecast api based on coordinates
function displayForecast (response) {
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = null;
let forecast = null; 
let icon = null;
let description = null;


for (let index = 0; index < 6; index++) {
  forecast = response.data.daily[index];
  celsiusMaxDay0 = Math.round(response.data.daily[0].temp.max);
  celsiusMaxDay1 = Math.round(response.data.daily[1].temp.max);
  celsiusMaxDay2 = Math.round(response.data.daily[2].temp.max);
  celsiusMaxDay3 = Math.round(response.data.daily[3].temp.max);
  celsiusMaxDay4 = Math.round(response.data.daily[4].temp.max);
  celsiusMaxDay5 = Math.round(response.data.daily[5].temp.max);
  
  celsiusMinDay0 = Math.round(response.data.daily[0].temp.min);
  celsiusMinDay1 = Math.round(response.data.daily[1].temp.min);
  celsiusMinDay2 = Math.round(response.data.daily[2].temp.min);
  celsiusMinDay3 = Math.round(response.data.daily[3].temp.min);
  celsiusMinDay4 = Math.round(response.data.daily[4].temp.min);
  celsiusMinDay5 = Math.round(response.data.daily[5].temp.min);
 

    //console.log (response.data.daily[0].temp.min);  
    
    forecastElement.innerHTML += `
            <div class="col-3">
            <h3 class = "day">${getNameOfDay(forecast.dt*1000)}</h3>
            </div>
            <div class="col-3"><img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt = ""></div>
            <div class="col-3 weather-forecast-temperature">
            <i class="fas fa-long-arrow-alt-up max_temperature" id = "forecast-max${index}"></i><span class="max max-day${index}">${Math.round(forecast.temp.max)}°</span>
            <span> </span>
            <i class="fas fa-long-arrow-alt-down min_temperature" id = "forecast-min${index}"></i><span class="min min-day${index}">${Math.round(forecast.temp.min)}°</span>
            </div>
            <div class = "col-3 capitalize">${forecast.weather[0].description}</div>
           `
  }
}

function fetchForecast(latitude, longitude) {
let temperatureUnitCelsius = "metric";
let apiKey = "8d17eb2f64026eb70f16e29b12bf932a";
//let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${temperatureUnitCelsius}`;
let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly,alerts&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  let conversionToggle = document.querySelector("#flexSwitchCheckDefault");
  conversionToggle.checked = false;
  search(cityInputElement.value);
  //console.log (cityInputElement.value);
}

//unit conversion
function displayFahrenheitTemperature (event) {
    event.preventDefault ();
    let temperatureElement = document.querySelector("#temperature-now");
    let realFeelElement = document.querySelector("#real-feel");
    let fahrenheitTemperature =  Math.round((celsiusTemperature * 9) / 5 + 32);
    let fahrenheitRealFeel =     Math.round((celsiusRealFeal * 9) / 5 + 32);
    
    
        //forecast conversion maddness
    let maxDay0Element = document.querySelector (".max-day0");
    let maxDay1Element = document.querySelector (".max-day1");
    let maxDay2Element = document.querySelector (".max-day2");
    let maxDay3Element = document.querySelector (".max-day3");
    let maxDay4Element = document.querySelector (".max-day4");
    let maxDay5Element = document.querySelector (".max-day5");
   
    let minDay0Element = document.querySelector (".min-day0");
    let minDay1Element = document.querySelector (".min-day1");
    let minDay2Element = document.querySelector (".min-day2");
    let minDay3Element = document.querySelector (".min-day3");
    let minDay4Element = document.querySelector (".min-day4");
    let minDay5Element = document.querySelector (".min-day5");
    
    let maxDay0Fahrenheit =  Math.round((celsiusMaxDay0* 9) / 5 + 32);
    let maxDay1Fahrenheit =  Math.round((celsiusMaxDay1* 9) / 5 + 32);
    let maxDay2Fahrenheit =  Math.round((celsiusMaxDay2* 9) / 5 + 32);
    let maxDay3Fahrenheit =  Math.round((celsiusMaxDay3* 9) / 5 + 32);
    let maxDay4Fahrenheit =  Math.round((celsiusMaxDay4* 9) / 5 + 32);
    let maxDay5Fahrenheit =  Math.round((celsiusMaxDay5* 9) / 5 + 32);
   
    let minDay0Fahrenheit =  Math.round((celsiusMinDay0* 9) / 5 + 32);
    let minDay1Fahrenheit =  Math.round((celsiusMinDay1* 9) / 5 + 32);
    let minDay2Fahrenheit =  Math.round((celsiusMinDay2* 9) / 5 + 32);
    let minDay3Fahrenheit =  Math.round((celsiusMinDay3* 9) / 5 + 32);
    let minDay4Fahrenheit =  Math.round((celsiusMinDay4* 9) / 5 + 32);
    let minDay5Fahrenheit =  Math.round((celsiusMinDay5* 9) / 5 + 32);
  


   if (event.target.checked) {
       alert(`Temperature in Fahrenheit`);
       temperatureElement.innerHTML = `${fahrenheitTemperature}°`;
       realFeelElement.innerHTML = fahrenheitRealFeel;

       maxDay0Element.innerHTML = maxDay0Fahrenheit;
       maxDay1Element.innerHTML = maxDay1Fahrenheit;
       maxDay2Element.innerHTML = maxDay2Fahrenheit;
       maxDay3Element.innerHTML = maxDay3Fahrenheit;
       maxDay4Element.innerHTML = maxDay4Fahrenheit;
       maxDay5Element.innerHTML = maxDay5Fahrenheit;
       
       minDay0Element.innerHTML = minDay0Fahrenheit;
       minDay1Element.innerHTML = minDay1Fahrenheit;
       minDay2Element.innerHTML = minDay2Fahrenheit;
       minDay3Element.innerHTML = minDay3Fahrenheit;
       minDay4Element.innerHTML = minDay4Fahrenheit;
       minDay5Element.innerHTML = minDay5Fahrenheit;
     
     
     } else {
       alert(`Temperature in Celsius`);
       temperatureElement.innerHTML = `${celsiusTemperature}°`;
       realFeelElement.innerHTML = celsiusRealFeal;

       maxDay0Element.innerHTML = celsiusMaxDay0; 
       maxDay1Element.innerHTML = celsiusMaxDay1; 
       maxDay2Element.innerHTML = celsiusMaxDay2; 
       maxDay3Element.innerHTML = celsiusMaxDay3; 
       maxDay4Element.innerHTML = celsiusMaxDay4; 
       maxDay5Element.innerHTML = celsiusMaxDay5; 
       
       minDay0Element.innerHTML = celsiusMinDay0; 
       minDay1Element.innerHTML = celsiusMinDay1; 
       minDay2Element.innerHTML = celsiusMinDay2; 
       minDay3Element.innerHTML = celsiusMinDay3; 
       minDay4Element.innerHTML = celsiusMinDay4; 
       minDay5Element.innerHTML = celsiusMinDay5; 
       
     }

}

let form = document.querySelector ("#search-form");
form.addEventListener ("submit", handleSubmit);

 //3. unit conversion
let fahrenheitSwitch = document.querySelectorAll ("#flexSwitchCheckDefault");
for (let checkbox of fahrenheitSwitch) {
checkbox.addEventListener ("change", displayFahrenheitTemperature);
}


let celsiusTemperature = null;  //populate in displayTemperature function from api response
let celsiusRealFeal = null;
let celsiusMaxDay0 = null;
let celsiusMaxDay1 = null;
let celsiusMaxDay2 = null;
let celsiusMaxDay3 = null;
let celsiusMaxDay4 = null;
let celsiusMaxDay5 = null;
let celsiusMaxDay6 = null;
let celsiusMinDay0 = null;
let celsiusMinDay1 = null;
let celsiusMinDay2 = null;
let celsiusMinDay3 = null;
let celsiusMinDay4 = null;
let celsiusMinDay5 = null;
let celsiusMinDay6 = null;



search("New York"); 






