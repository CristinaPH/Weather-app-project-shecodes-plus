

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
//calculate the date; 
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
    //console.log (response.data.weather[0].description);

    let city = response.data.name; 
    let temperature = Math.round(response.data.main.temp);
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
   
    cityElement.innerHTML = city; 
    temperatureElement.innerHTML = `${temperature}°`;
    temperatureRealFeel.innerHTML = temperatureFeelsLike;
    humidityElement.innerHTML = humidity;
    windElement.innerHTML = windSpeed;
    descriptionElement.innerHTML = description; 
    dateElement.innerHTML = date;  
    lastUpdateElement.innerHTML = lastUpdate;  
    iconElement.setAttribute ("src", `http://openweathermap.org/img/wn/${icon}@2x.png`)
    
}

let cityName = "Vienna";
let temperatureUnitCelsius = "metric";
let apiKey = "8d17eb2f64026eb70f16e29b12bf932a";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${temperatureUnitCelsius}` ;

axios.get(apiUrl).then(displayTemperature);
