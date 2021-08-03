import { getForecast, switchScale, getScale } from "./getWeather.js";
import { fillActiveInfo } from "./currentWeather.js"
import getBackground from "./background.js"


getBackground();
document.querySelector("#tempScale").addEventListener("click", switchScale);
let forecast = getForecast("orlando");
console.log(getScale());
fillActiveInfo(forecast, getScale());

