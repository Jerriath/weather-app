import { getForecast, switchScale, getScale } from "./getWeather.js";
import { fillActiveInfo } from "./currentWeather.js"
import { fillWeeklyInfo } from "./weeklyWeather.js"
import getBackground from "./background.js"

let forecast = getForecast("orlando");
loadPage();




document.querySelector("#tempScaleDiv").addEventListener("click", switchScale); //Listener for moving the tempScale slider
document.querySelector("#tempScaleDiv").addEventListener("click", function() {
    getBackground();
    fillActiveInfo(forecast, getScale());
});
document.querySelector("#search").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        loadPage();
        document.querySelector("#search").value = "";
    }
});



//Wrapper function to load everything on the page; Helps with changing temp Scale
function loadPage() {
    let city = document.querySelector("#search").value;
    if (city === "") {
        city = "orlando"
    }
    forecast = getForecast(city);
    getBackground();
    fillActiveInfo(forecast, getScale());
    fillWeeklyInfo(forecast, getScale());
}