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



function displayTemperature(response) {
    //console.log (response.data.coord);

    celsiusTemperature = response.data.main.temp;
    lat = response.data.coord.lat;
    lon = response.data.coord.lon;
    window.lat = lat;
    window.lon = lon; 

    let currentCity = response.data.name; 
    let temperature = Math.round(celsiusTemperature);
    let temperatureFeelsLike = Math.round(response.data.main.feels_like);
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


console.log (lat);
console.log (lon);
    
}

function displayForecast (response) {
console.log (response.data);
}


//2. search engine
function search(city) {
let temperatureUnitCelsius = "metric";
let apiKey = "8d17eb2f64026eb70f16e29b12bf932a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${temperatureUnitCelsius}` ;
axios.get(apiUrl).then(displayTemperature);

}


function forecast(lat, lon) {
let temperatureUnitCelsius = "metric";
let apiKey = "8d17eb2f64026eb70f16e29b12bf932a";
//apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${temperatureUnitCelsius}`;
apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${apiKey}`
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


//https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/checkbox
//https://www.techiedelight.com/bind-to-checkbox-change-event-with-javascript/
//document.addEventListener('DOMContentLoaded', function() {
//  var checkboxes = document.querySelectorAll('input[type=checkbox][name=fahrenheit]');
// 
//  for (var checkbox of checkboxes) {
//    checkbox.addEventListener('change', function(event) {
//      if (event.target.checked) {
//        alert(`${event.target.value} is checked`);
//      } else {
//        alert(`${event.target.value} is unchecked`);
//      }
//    });
//  }
//}, false);



function displayFahrenheitTemperature (event) {
    event.preventDefault ();
    let temperatureElement = document.querySelector("#temperature-now");
    let fahrenheitTemperature =  (celsiusTemperature * 9) / 5 + 32;
   if (event.target.checked) {
       alert(`Temperature in Fahrenheit`);
       temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
     } else {
       alert(`Temperature in Celsius`);
       temperatureElement.innerHTML = Math.round(celsiusTemperature);
     }
;
}


let form = document.querySelector ("#search-form");
form.addEventListener ("submit", handleSubmit);

 //3. unit conversion

let fahrenheitSwitch = document.querySelectorAll ("#flexSwitchCheckDefault");
for (let checkbox of fahrenheitSwitch) {
checkbox.addEventListener ("change", displayFahrenheitTemperature);
}


let celsiusTemperature = null;  //populate in displayTemperature function from api response
let lat = null;
let lon = null;


search("New York");
forecast ("40.7143", "-74.006")





