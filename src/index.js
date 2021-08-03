import { getForecast, switchScale, getScale } from "./getWeather.js";
import { fillActiveInfo } from "./currentWeather.js"
import getBackground from "./background.js"

let forecast = getForecast("orlando");
getBackground();
document.querySelector("#tempScale").addEventListener("click", switchScale); //Listener for moving the tempScale slider
document.querySelector("#tempScale").addEventListener("click", function() {
    getBackground();
    fillActiveInfo(forecast, getScale());
});
document.querySelector("#search").addEventListener("keypress", function(e) {
    console.log(e);
    if (e.key === "Enter") {
        loadPage();
        document.querySelector("#search").value = "";
    }
});

fillActiveInfo(forecast, getScale());


//Wrapper function to load everything on the page; Helps with changing temp Scale
function loadPage() {
    let city = document.querySelector("#search").value;
    forecast = getForecast(city);
    getBackground();
    fillActiveInfo(forecast, getScale());
}