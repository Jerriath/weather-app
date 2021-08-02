//Cache DOM
let activeCity = document.querySelector("#activeCity"); //Title for the city name
let activeImg = document.querySelector("#activeImg"); //Img for weather conditions (i.e. cloudy, rainy, etc.)
let activeWeather = document.querySelector("#activeWeather"); //<p> element for the weather description
let activeHigh = document.querySelector("#activeHigh"); //High temp
let activeLow = document.querySelector("#activeLow"); //Low temp
let activeFeels = document.querySelector("#activeFeels"); //Fells like
let activePop = document.querySelector("#activePop"); //Probability of percipitation
let activeHumidity = document.querySelector("#activeHumidity"); //Humidity
let activePressure = document.querySelector("#activePressure"); //Pressure
let activeWind = document.querySelector("#activeWind"); //Wind speed


//Function for filling in the info for the active weather div
export async function fillActiveInfo(forecast, tempScale) { //I want to refactor this function to be a wrapper function that can determine which functions to use based on params
    forecast = await forecast;
    console.log(forecast);
    activeCity.textContent = forecast.city;
    activeImg.src = "http://openweathermap.org/img/wn/" + forecast.current.weather[0].icon + "@2x.png";
    activeWeather.textContent = forecast.current.weather[0].description;
}


