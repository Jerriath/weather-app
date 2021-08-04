import { toCelsius, toFahrenheit } from "./getWeather.js";

export async function fillyDailyInfo(forecast, tempScale) {
    //Cache the DOM element needed
    let dailyForecast = document.querySelector("#dailyForecast")
    forecast = await forecast;
    let convertScale = null;
    if (tempScale === "c") {
        convertScale = toCelsius;
    }
    else {
        convertScale = toFahrenheit;
    }
    for (let i = 0; i < 25; i++) { //25 because I want to have 25 different hours; from now to same time tomorrow
        let newHour = document.createElement("div");
        newHour.classList.add("dailyDiv");
        let newTime = document.createElement("p");
        newTime.textContent = getHour(forecast.hourly[i].dt);
        newTime.style.fontSize = "30px";
        let newImg = document.createElement("img");
        newImg.src = "http://openweathermap.org/img/wn/" + forecast.hourly[i].weather[0].icon + "@2x.png";
        newImg.style.transform = "scale(.8)";
        let newPop = document.createElement("p");
        newPop.textContent = "Percipitation: " + Math.floor(forecast.hourly[i].pop * 10000) / 100 + "%";
        newPop.style.fontSize = "20px";
        let newTemp = document.createElement("div");
        newTemp.textContent = convertScale(forecast.hourly[i].temp) + "\xB0";
        newTemp.style.fontSize = "25px";
        
        newHour.appendChild(newTime);
        newHour.appendChild(newImg);
        newHour.appendChild(newTemp);
        newHour.appendChild(newPop);
        
        dailyForecast.appendChild(newHour);
    }
    removeAllChildren(dailyForecast);
}

//Function for getting the time of day from utc seconds
function getHour(seconds) {
    let date = new Date(0);
    date.setUTCSeconds(seconds);
    let hour = date.getHours();
    if (hour > 12) {
        hour = hour - 12 + "pm";
    }
    else if (hour == 0) {
        hour = "12am";
    }
    else if (hour == 12) {
        hour = "12pm";
    }
    else {
        hour = hour + "am"
    }
    return hour;
}

//Function to remove all child Elements from dailyForecast; Needed to remake new elements
async function removeAllChildren(dailyForecast) {
    dailyForecast = await dailyForecast;
    dailyForecast.childNodes.forEach(function(child) {
        console.log(child);
        child.remove();
    })
}