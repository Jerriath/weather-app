import { getForecast, switchScale, getScale } from "./getWeather.js";
import { fillActiveInfo } from "./currentWeather.js"
import { fillWeeklyInfo } from "./weeklyWeather.js"
import getBackground from "./background.js"
import { fillyDailyInfo } from "./dailyWeather.js";

//Cache DOM for convenience
let search = document.querySelector("#search");
let container = document.querySelector("#container");
let backgrounds = document.querySelector("#backgrounds");
container.style.opacity = "1";



let forecast = getForecast("orlando");
loadPage();




document.querySelector("#tempScaleDiv").addEventListener("click", switchScale); //Listener for moving the tempScale slider; uses old forecast info (because only changing scale)
document.querySelector("#tempScaleDiv").addEventListener("click", function() {
    toggleOpacity();
    window.setTimeout(toggleOpacity, 750);
    getBackground();
    fillActiveInfo(forecast, getScale());
    fillWeeklyInfo(forecast, getScale());
    fillyDailyInfo(forecast, getScale());
});
document.querySelector("#search").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        toggleOpacity();
        window.setTimeout(toggleOpacity, 750);
        loadPage();
        document.querySelector("#search").value = "";
    }
});



//Wrapper function to load everything on the page; Helps with changing temp Scale
async function loadPage() {
    let city = document.querySelector("#search").value;
    if (city === "") {
        city = "orlando"
    }
    forecast = await getForecast(city);
    if (forecast === undefined) {
        let currentCity = document.querySelector("#activeCity").textContent;
        forecast = getForecast(currentCity);
        search.style.borderBottom = "3px solid red";
        search.placeholder = "Please try again."
    }
    else {
        search.style.borderBottom = "3px solid white";
        search.placeholder = "Search a City..."
    }
    getBackground();
    await fillActiveInfo(forecast, getScale());
    await fillWeeklyInfo(forecast, getScale());
    await fillyDailyInfo(forecast, getScale());
}

//Function to make everything transparent/opaque when loading in new info
function toggleOpacity() {
    if (container.style.opacity === "0") {
        container.style.opacity = "1";
        backgrounds.childNodes.forEach(function(image, index) {
            if (index%2) {
                image.style.filter = "brightness(0.5)";
            }
        });
    }
    else {
        container.style.opacity = "0";
        backgrounds.childNodes.forEach(function(image, index) {
            if (index%2) {
                image.style.filter = "brightness(1)";
            }
        });
    }
}