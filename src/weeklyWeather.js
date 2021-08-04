import { toCelsius, toFahrenheit } from "./getWeather.js";

export async function fillWeeklyInfo(forecast, tempScale) {
    forecast = await forecast;
    let convertScale = null;
    if (tempScale === "c") {
        convertScale = toCelsius;
    }
    else {
        convertScale = toFahrenheit;
    }
    for (let i = 1; i < 8; i++) { //Loop starts at 1 in order to skip the current day; goes up to 7 for a full week forecast
        document.querySelector("#weekly" + i).textContent = getDay(forecast.daily[i].dt);
        document.querySelector("#weekly" + i).style.fontSize = "30px";
        document.querySelector("#weeklyImg" + i).src = "http://openweathermap.org/img/wn/" + forecast.daily[i].weather[0].icon + "@2x.png";
        document.querySelector("#weeklyPop" + i).textContent = "Percipitation: " + (forecast.daily[i].pop * 100) + "%";
        document.querySelector("#weeklyPop" + i).style.fontSize = "18px";
        document.querySelector("#weeklyHigh" + i).textContent = "H: " + convertScale(forecast.daily[i].temp.max) + "\xB0";
        document.querySelector("#weeklyHigh" + i).style.fontSize = "30px";
        document.querySelector("#weeklyLow" + i).textContent = "L: " + convertScale(forecast.daily[i].temp.min) + "\xB0";
        document.querySelector("#weeklyLow" + i).style.fontSize = "20px";
    }
}

//Function for getting a string representation of the day from a UTC 
function getDay(seconds) {
    let date = new Date(0);
    date.setUTCSeconds(seconds);
    let day = date.getDay();
    if (day === 0) {
        return "Sun";
    }
    else if (day === 1) {
        return "Mon";
    }
    else if (day === 2) {
        return "Tues";
    }
    else if (day === 3) {
        return "Wed";
    }
    else if (day === 4) {
        return "Thur";
    }
    else if (day === 5) {
        return "Fri";
    }
    else {
        return "Sat";
    }
}