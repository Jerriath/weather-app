import { getForecast } from "./getWeather.js";
import { fillActiveInfo } from "./currentWeather.js"
import getBackground from "./background.js"


getBackground();
let forecast = getForecast("orlando");

fillActiveInfo(forecast);