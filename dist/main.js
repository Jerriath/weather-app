/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//Cache DOM
let sunrise = document.querySelector("#sunrise");
let noon = document.querySelector("#noon");
let sunset = document.querySelector("#sunset");
let night = document.querySelector("#night");


//Function to determine time of day and show coresponding background
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
    hideALL();
    let currentDate = new Date();
    let currentHour = currentDate.getHours();


    if (currentHour >= 5 && currentHour < 12) {
        show(sunrise);
    }
    else if (currentHour >= 12 && currentHour < 17) {
        show(noon);
    }
    else if (currentHour >= 17 && currentHour < 20) {
        show(sunset);
    }
    else {
        show(night);
    }

}

//Function for hiding all background imgs
function hideALL() {
    sunrise.style.display = "none";
    noon.style.display = "none";
    sunset.style.display = "none";
    night.style.display = "none";
}

//Function for displaying only one background
function show(element) {
    element.style.display = "block";
}

/***/ }),

/***/ "./src/currentWeather.js":
/*!*******************************!*\
  !*** ./src/currentWeather.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fillActiveInfo": () => (/* binding */ fillActiveInfo)
/* harmony export */ });
/* harmony import */ var _getWeather_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWeather.js */ "./src/getWeather.js");


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
async function fillActiveInfo(forecast, tempScale) { //I want to refactor this function to be a wrapper function that can determine which functions to use based on params
    forecast = await forecast;
    console.log(forecast);
    activeCity.textContent = forecast.city;
    activeImg.src = "http://openweathermap.org/img/wn/" + forecast.current.weather[0].icon + "@2x.png";
    activeWeather.textContent = forecast.current.weather[0].description;
    let convertScale = null;
    if (tempScale === "c") {
        convertScale = _getWeather_js__WEBPACK_IMPORTED_MODULE_0__.toCelsius;
    }
    else {
        convertScale = _getWeather_js__WEBPACK_IMPORTED_MODULE_0__.toFahrenheit;
    }
    activeHigh.textContent = convertScale(forecast.daily[0].temp.max) + "\xB0";
    activeLow.textContent = convertScale(forecast.daily[0].temp.min) + "\xB0";
    activeFeels.textContent = convertScale(forecast.current.feels_like) + "\xB0";
    activePop.textContent = forecast.hourly[0].pop * 100 + "%";
    activeHumidity.textContent = forecast.current.humidity + "%";
    activePressure.textContent = forecast.current.pressure + "hPa";
    activeWind.textContent = forecast.current.wind_speed + "m/s" + "  (" + Math.floor(forecast.current.wind_speed * 22.3694) / 10 + "mi/hr)";
}




/***/ }),

/***/ "./src/dailyWeather.js":
/*!*****************************!*\
  !*** ./src/dailyWeather.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fillyDailyInfo": () => (/* binding */ fillyDailyInfo)
/* harmony export */ });
/* harmony import */ var _getWeather_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWeather.js */ "./src/getWeather.js");


//Cache DOM
let dailyForecast = document.querySelector("#dailyForecast");

async function fillyDailyInfo(forecast, tempScale) {
    forecast = await forecast;
    let convertScale = null;
    if (tempScale === "c") {
        convertScale = _getWeather_js__WEBPACK_IMPORTED_MODULE_0__.toCelsius;
    }
    else {
        convertScale = _getWeather_js__WEBPACK_IMPORTED_MODULE_0__.toFahrenheit;
    }
    removeAllChildren();
    for (let i = 0; i < 25; i++) { //25 because I want to have 25 different hours; from now to same time tomorrow
        let newHour = document.createElement("div");
        newHour.classList.add("dailyDiv");
        let newTime = document.createElement("p");
        newTime.textContent = getHour(forecast.hourly[i].dt);
        newTime.style.fontSize = "30px";
        let newImg = document.createElement("img");
        newImg.src = "http://openweathermap.org/img/wn/" + forecast.hourly[i].weather[0].icon + "@2x.png";
        newImg.style.transform = "scale(.6)";
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
async function removeAllChildren() {
    while(dailyForecast.firstChild) {
        dailyForecast.firstChild.remove();
    }
}

/***/ }),

/***/ "./src/getWeather.js":
/*!***************************!*\
  !*** ./src/getWeather.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getForecast": () => (/* binding */ getForecast),
/* harmony export */   "getScale": () => (/* binding */ getScale),
/* harmony export */   "toCelsius": () => (/* binding */ toCelsius),
/* harmony export */   "toFahrenheit": () => (/* binding */ toFahrenheit),
/* harmony export */   "switchScale": () => (/* binding */ switchScale)
/* harmony export */ });
async function getForecast(city) {
    try {
        //Normalizing city text; important for displaying city name on website
        city = city.toLowerCase();
        city = city.charAt(0).toUpperCase() + city.slice(1);
        let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=252ade578b106709d98db214d04c504d";
        let data = await fetch(url, {mode: "cors"});
        let weather = await data.json();
        let lat = weather.coord.lat;
        let lon = weather.coord.lon;
        let weatherObj =  await getFullForecast(lat, lon);
        let outputObj = {
            city: city,
            current: weatherObj.current,
            daily: weatherObj.daily,
            hourly: weatherObj.hourly,
        };
        return outputObj;
    }
    catch(err) {
        console.log(err);
    }
}

async function getFullForecast(lat, lon) {
    try {
        let url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,alerts&appid=252ade578b106709d98db214d04c504d";
        let data = await fetch(url, {mode: "cors"});
        let weather = await data.json();
        return weather;
    }
    catch(err) {
        console.log(err);
    }
}

function getScale() {
    let tempScale = document.querySelector("#tempScale");
    if (tempScale.classList.length !== 0) {
        return "c";
    }
    else {
        return "f";
    }
}

//Function for converting the kelvin scale returned from api call to Celsius
function toCelsius(kelvin) {
    return Math.floor((kelvin - 273.15) * 10) / 10;
}

//Function for converting the kelvin scale returned from api call to Fahrenheit
function toFahrenheit(kelvin) {
    return Math.floor(((kelvin - 273.15)*9/5 + 32) * 10) / 10 ;
}

function switchScale() {
    let tempScale = document.querySelector("#tempScale");
    if (tempScale.classList.length !== 0) {
        tempScale.classList.remove("left");
    }
    else {
        tempScale.classList.add("left");
    }
}

/***/ }),

/***/ "./src/weeklyWeather.js":
/*!******************************!*\
  !*** ./src/weeklyWeather.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fillWeeklyInfo": () => (/* binding */ fillWeeklyInfo)
/* harmony export */ });
/* harmony import */ var _getWeather_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWeather.js */ "./src/getWeather.js");


async function fillWeeklyInfo(forecast, tempScale) {
    forecast = await forecast;
    let convertScale = null;
    if (tempScale === "c") {
        convertScale = _getWeather_js__WEBPACK_IMPORTED_MODULE_0__.toCelsius;
    }
    else {
        convertScale = _getWeather_js__WEBPACK_IMPORTED_MODULE_0__.toFahrenheit;
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

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getWeather_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWeather.js */ "./src/getWeather.js");
/* harmony import */ var _currentWeather_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./currentWeather.js */ "./src/currentWeather.js");
/* harmony import */ var _weeklyWeather_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./weeklyWeather.js */ "./src/weeklyWeather.js");
/* harmony import */ var _background_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./background.js */ "./src/background.js");
/* harmony import */ var _dailyWeather_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dailyWeather.js */ "./src/dailyWeather.js");






//Cache DOM for convenience
let search = document.querySelector("#search");
let container = document.querySelector("#container");
let backgrounds = document.querySelector("#backgrounds");
container.style.opacity = "1";



let forecast = (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getForecast)("orlando");
loadPage();




document.querySelector("#tempScaleDiv").addEventListener("click", _getWeather_js__WEBPACK_IMPORTED_MODULE_0__.switchScale); //Listener for moving the tempScale slider; uses old forecast info (because only changing scale)
document.querySelector("#tempScaleDiv").addEventListener("click", function() {
    toggleOpacity();
    window.setTimeout(toggleOpacity, 750);
    (0,_background_js__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_currentWeather_js__WEBPACK_IMPORTED_MODULE_1__.fillActiveInfo)(forecast, (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getScale)());
    (0,_weeklyWeather_js__WEBPACK_IMPORTED_MODULE_2__.fillWeeklyInfo)(forecast, (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getScale)());
    (0,_dailyWeather_js__WEBPACK_IMPORTED_MODULE_4__.fillyDailyInfo)(forecast, (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getScale)());
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
    forecast = await (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getForecast)(city);
    if (forecast === undefined) {
        let currentCity = document.querySelector("#activeCity").textContent;
        forecast = (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getForecast)(currentCity);
        search.style.borderBottom = "3px solid red";
        search.placeholder = "Please try again."
    }
    else {
        search.style.borderBottom = "3px solid white";
        search.placeholder = "Search a City..."
    }
    (0,_background_js__WEBPACK_IMPORTED_MODULE_3__.default)();
    await (0,_currentWeather_js__WEBPACK_IMPORTED_MODULE_1__.fillActiveInfo)(forecast, (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getScale)());
    await (0,_weeklyWeather_js__WEBPACK_IMPORTED_MODULE_2__.fillWeeklyInfo)(forecast, (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getScale)());
    await (0,_dailyWeather_js__WEBPACK_IMPORTED_MODULE_4__.fillyDailyInfo)(forecast, (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getScale)());
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
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUNOcUU7QUFDakI7QUFDRDtBQUNSO0FBQ1E7O0FBRW5EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQSxlQUFlLDJEQUFXO0FBQzFCOzs7OztBQUtBLGtFQUFrRSx1REFBVyxHQUFHLDRDQUE0QztBQUM1SDtBQUNBO0FBQ0E7QUFDQSxJQUFJLHVEQUFhO0FBQ2pCLElBQUksa0VBQWMsV0FBVyx3REFBUTtBQUNyQyxJQUFJLGlFQUFjLFdBQVcsd0RBQVE7QUFDckMsSUFBSSxnRUFBYyxXQUFXLHdEQUFRO0FBQ3JDLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7QUFJRCxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiwyREFBVztBQUNoQztBQUNBO0FBQ0EsbUJBQW1CLDJEQUFXO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSx1REFBYTtBQUNqQixVQUFVLGtFQUFjLFdBQVcsd0RBQVE7QUFDM0MsVUFBVSxpRUFBYyxXQUFXLHdEQUFRO0FBQzNDLFVBQVUsZ0VBQWMsV0FBVyx3REFBUTtBQUMzQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2JhY2tncm91bmQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY3VycmVudFdlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZGFpbHlXZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2dldFdlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvd2Vla2x5V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vQ2FjaGUgRE9NXG5sZXQgc3VucmlzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3VucmlzZVwiKTtcbmxldCBub29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNub29uXCIpO1xubGV0IHN1bnNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3Vuc2V0XCIpO1xubGV0IG5pZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuaWdodFwiKTtcblxuXG4vL0Z1bmN0aW9uIHRvIGRldGVybWluZSB0aW1lIG9mIGRheSBhbmQgc2hvdyBjb3Jlc3BvbmRpbmcgYmFja2dyb3VuZFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gICAgaGlkZUFMTCgpO1xuICAgIGxldCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgbGV0IGN1cnJlbnRIb3VyID0gY3VycmVudERhdGUuZ2V0SG91cnMoKTtcblxuXG4gICAgaWYgKGN1cnJlbnRIb3VyID49IDUgJiYgY3VycmVudEhvdXIgPCAxMikge1xuICAgICAgICBzaG93KHN1bnJpc2UpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjdXJyZW50SG91ciA+PSAxMiAmJiBjdXJyZW50SG91ciA8IDE3KSB7XG4gICAgICAgIHNob3cobm9vbik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGN1cnJlbnRIb3VyID49IDE3ICYmIGN1cnJlbnRIb3VyIDwgMjApIHtcbiAgICAgICAgc2hvdyhzdW5zZXQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc2hvdyhuaWdodCk7XG4gICAgfVxuXG59XG5cbi8vRnVuY3Rpb24gZm9yIGhpZGluZyBhbGwgYmFja2dyb3VuZCBpbWdzXG5mdW5jdGlvbiBoaWRlQUxMKCkge1xuICAgIHN1bnJpc2Uuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIG5vb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIHN1bnNldC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgbmlnaHQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufVxuXG4vL0Z1bmN0aW9uIGZvciBkaXNwbGF5aW5nIG9ubHkgb25lIGJhY2tncm91bmRcbmZ1bmN0aW9uIHNob3coZWxlbWVudCkge1xuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbn0iLCJpbXBvcnQgeyB0b0NlbHNpdXMsIHRvRmFocmVuaGVpdCB9IGZyb20gXCIuL2dldFdlYXRoZXIuanNcIjtcblxuLy9DYWNoZSBET01cbmxldCBhY3RpdmVDaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3RpdmVDaXR5XCIpOyAvL1RpdGxlIGZvciB0aGUgY2l0eSBuYW1lXG5sZXQgYWN0aXZlSW1nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3RpdmVJbWdcIik7IC8vSW1nIGZvciB3ZWF0aGVyIGNvbmRpdGlvbnMgKGkuZS4gY2xvdWR5LCByYWlueSwgZXRjLilcbmxldCBhY3RpdmVXZWF0aGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3RpdmVXZWF0aGVyXCIpOyAvLzxwPiBlbGVtZW50IGZvciB0aGUgd2VhdGhlciBkZXNjcmlwdGlvblxubGV0IGFjdGl2ZUhpZ2ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZUhpZ2hcIik7IC8vSGlnaCB0ZW1wXG5sZXQgYWN0aXZlTG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3RpdmVMb3dcIik7IC8vTG93IHRlbXBcbmxldCBhY3RpdmVGZWVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlRmVlbHNcIik7IC8vRmVsbHMgbGlrZVxubGV0IGFjdGl2ZVBvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlUG9wXCIpOyAvL1Byb2JhYmlsaXR5IG9mIHBlcmNpcGl0YXRpb25cbmxldCBhY3RpdmVIdW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlSHVtaWRpdHlcIik7IC8vSHVtaWRpdHlcbmxldCBhY3RpdmVQcmVzc3VyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlUHJlc3N1cmVcIik7IC8vUHJlc3N1cmVcbmxldCBhY3RpdmVXaW5kID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3RpdmVXaW5kXCIpOyAvL1dpbmQgc3BlZWRcblxuXG4vL0Z1bmN0aW9uIGZvciBmaWxsaW5nIGluIHRoZSBpbmZvIGZvciB0aGUgYWN0aXZlIHdlYXRoZXIgZGl2XG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmlsbEFjdGl2ZUluZm8oZm9yZWNhc3QsIHRlbXBTY2FsZSkgeyAvL0kgd2FudCB0byByZWZhY3RvciB0aGlzIGZ1bmN0aW9uIHRvIGJlIGEgd3JhcHBlciBmdW5jdGlvbiB0aGF0IGNhbiBkZXRlcm1pbmUgd2hpY2ggZnVuY3Rpb25zIHRvIHVzZSBiYXNlZCBvbiBwYXJhbXNcbiAgICBmb3JlY2FzdCA9IGF3YWl0IGZvcmVjYXN0O1xuICAgIGNvbnNvbGUubG9nKGZvcmVjYXN0KTtcbiAgICBhY3RpdmVDaXR5LnRleHRDb250ZW50ID0gZm9yZWNhc3QuY2l0eTtcbiAgICBhY3RpdmVJbWcuc3JjID0gXCJodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi9cIiArIGZvcmVjYXN0LmN1cnJlbnQud2VhdGhlclswXS5pY29uICsgXCJAMngucG5nXCI7XG4gICAgYWN0aXZlV2VhdGhlci50ZXh0Q29udGVudCA9IGZvcmVjYXN0LmN1cnJlbnQud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgICBsZXQgY29udmVydFNjYWxlID0gbnVsbDtcbiAgICBpZiAodGVtcFNjYWxlID09PSBcImNcIikge1xuICAgICAgICBjb252ZXJ0U2NhbGUgPSB0b0NlbHNpdXM7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb252ZXJ0U2NhbGUgPSB0b0ZhaHJlbmhlaXQ7XG4gICAgfVxuICAgIGFjdGl2ZUhpZ2gudGV4dENvbnRlbnQgPSBjb252ZXJ0U2NhbGUoZm9yZWNhc3QuZGFpbHlbMF0udGVtcC5tYXgpICsgXCJcXHhCMFwiO1xuICAgIGFjdGl2ZUxvdy50ZXh0Q29udGVudCA9IGNvbnZlcnRTY2FsZShmb3JlY2FzdC5kYWlseVswXS50ZW1wLm1pbikgKyBcIlxceEIwXCI7XG4gICAgYWN0aXZlRmVlbHMudGV4dENvbnRlbnQgPSBjb252ZXJ0U2NhbGUoZm9yZWNhc3QuY3VycmVudC5mZWVsc19saWtlKSArIFwiXFx4QjBcIjtcbiAgICBhY3RpdmVQb3AudGV4dENvbnRlbnQgPSBmb3JlY2FzdC5ob3VybHlbMF0ucG9wICogMTAwICsgXCIlXCI7XG4gICAgYWN0aXZlSHVtaWRpdHkudGV4dENvbnRlbnQgPSBmb3JlY2FzdC5jdXJyZW50Lmh1bWlkaXR5ICsgXCIlXCI7XG4gICAgYWN0aXZlUHJlc3N1cmUudGV4dENvbnRlbnQgPSBmb3JlY2FzdC5jdXJyZW50LnByZXNzdXJlICsgXCJoUGFcIjtcbiAgICBhY3RpdmVXaW5kLnRleHRDb250ZW50ID0gZm9yZWNhc3QuY3VycmVudC53aW5kX3NwZWVkICsgXCJtL3NcIiArIFwiICAoXCIgKyBNYXRoLmZsb29yKGZvcmVjYXN0LmN1cnJlbnQud2luZF9zcGVlZCAqIDIyLjM2OTQpIC8gMTAgKyBcIm1pL2hyKVwiO1xufVxuXG5cbiIsImltcG9ydCB7IHRvQ2Vsc2l1cywgdG9GYWhyZW5oZWl0IH0gZnJvbSBcIi4vZ2V0V2VhdGhlci5qc1wiO1xuXG4vL0NhY2hlIERPTVxubGV0IGRhaWx5Rm9yZWNhc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RhaWx5Rm9yZWNhc3RcIik7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxseURhaWx5SW5mbyhmb3JlY2FzdCwgdGVtcFNjYWxlKSB7XG4gICAgZm9yZWNhc3QgPSBhd2FpdCBmb3JlY2FzdDtcbiAgICBsZXQgY29udmVydFNjYWxlID0gbnVsbDtcbiAgICBpZiAodGVtcFNjYWxlID09PSBcImNcIikge1xuICAgICAgICBjb252ZXJ0U2NhbGUgPSB0b0NlbHNpdXM7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb252ZXJ0U2NhbGUgPSB0b0ZhaHJlbmhlaXQ7XG4gICAgfVxuICAgIHJlbW92ZUFsbENoaWxkcmVuKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNTsgaSsrKSB7IC8vMjUgYmVjYXVzZSBJIHdhbnQgdG8gaGF2ZSAyNSBkaWZmZXJlbnQgaG91cnM7IGZyb20gbm93IHRvIHNhbWUgdGltZSB0b21vcnJvd1xuICAgICAgICBsZXQgbmV3SG91ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIG5ld0hvdXIuY2xhc3NMaXN0LmFkZChcImRhaWx5RGl2XCIpO1xuICAgICAgICBsZXQgbmV3VGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBuZXdUaW1lLnRleHRDb250ZW50ID0gZ2V0SG91cihmb3JlY2FzdC5ob3VybHlbaV0uZHQpO1xuICAgICAgICBuZXdUaW1lLnN0eWxlLmZvbnRTaXplID0gXCIzMHB4XCI7XG4gICAgICAgIGxldCBuZXdJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuICAgICAgICBuZXdJbWcuc3JjID0gXCJodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi9cIiArIGZvcmVjYXN0LmhvdXJseVtpXS53ZWF0aGVyWzBdLmljb24gKyBcIkAyeC5wbmdcIjtcbiAgICAgICAgbmV3SW1nLnN0eWxlLnRyYW5zZm9ybSA9IFwic2NhbGUoLjYpXCI7XG4gICAgICAgIGxldCBuZXdQb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcbiAgICAgICAgbmV3UG9wLnRleHRDb250ZW50ID0gXCJQZXJjaXBpdGF0aW9uOiBcIiArIE1hdGguZmxvb3IoZm9yZWNhc3QuaG91cmx5W2ldLnBvcCAqIDEwMDAwKSAvIDEwMCArIFwiJVwiO1xuICAgICAgICBuZXdQb3Auc3R5bGUuZm9udFNpemUgPSBcIjIwcHhcIjtcbiAgICAgICAgbGV0IG5ld1RlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBuZXdUZW1wLnRleHRDb250ZW50ID0gY29udmVydFNjYWxlKGZvcmVjYXN0LmhvdXJseVtpXS50ZW1wKSArIFwiXFx4QjBcIjtcbiAgICAgICAgbmV3VGVtcC5zdHlsZS5mb250U2l6ZSA9IFwiMjVweFwiO1xuICAgICAgICBcbiAgICAgICAgbmV3SG91ci5hcHBlbmRDaGlsZChuZXdUaW1lKTtcbiAgICAgICAgbmV3SG91ci5hcHBlbmRDaGlsZChuZXdJbWcpO1xuICAgICAgICBuZXdIb3VyLmFwcGVuZENoaWxkKG5ld1RlbXApO1xuICAgICAgICBuZXdIb3VyLmFwcGVuZENoaWxkKG5ld1BvcCk7XG4gICAgICAgIFxuICAgICAgICBkYWlseUZvcmVjYXN0LmFwcGVuZENoaWxkKG5ld0hvdXIpO1xuICAgIH1cbn1cblxuLy9GdW5jdGlvbiBmb3IgZ2V0dGluZyB0aGUgdGltZSBvZiBkYXkgZnJvbSB1dGMgc2Vjb25kc1xuZnVuY3Rpb24gZ2V0SG91cihzZWNvbmRzKSB7XG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgwKTtcbiAgICBkYXRlLnNldFVUQ1NlY29uZHMoc2Vjb25kcyk7XG4gICAgbGV0IGhvdXIgPSBkYXRlLmdldEhvdXJzKCk7XG4gICAgaWYgKGhvdXIgPiAxMikge1xuICAgICAgICBob3VyID0gaG91ciAtIDEyICsgXCJwbVwiO1xuICAgIH1cbiAgICBlbHNlIGlmIChob3VyID09IDApIHtcbiAgICAgICAgaG91ciA9IFwiMTJhbVwiO1xuICAgIH1cbiAgICBlbHNlIGlmIChob3VyID09IDEyKSB7XG4gICAgICAgIGhvdXIgPSBcIjEycG1cIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGhvdXIgPSBob3VyICsgXCJhbVwiXG4gICAgfVxuICAgIHJldHVybiBob3VyO1xufVxuXG4vL0Z1bmN0aW9uIHRvIHJlbW92ZSBhbGwgY2hpbGQgRWxlbWVudHMgZnJvbSBkYWlseUZvcmVjYXN0OyBOZWVkZWQgdG8gcmVtYWtlIG5ldyBlbGVtZW50c1xuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlQWxsQ2hpbGRyZW4oKSB7XG4gICAgd2hpbGUoZGFpbHlGb3JlY2FzdC5maXJzdENoaWxkKSB7XG4gICAgICAgIGRhaWx5Rm9yZWNhc3QuZmlyc3RDaGlsZC5yZW1vdmUoKTtcbiAgICB9XG59IiwiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEZvcmVjYXN0KGNpdHkpIHtcbiAgICB0cnkge1xuICAgICAgICAvL05vcm1hbGl6aW5nIGNpdHkgdGV4dDsgaW1wb3J0YW50IGZvciBkaXNwbGF5aW5nIGNpdHkgbmFtZSBvbiB3ZWJzaXRlXG4gICAgICAgIGNpdHkgPSBjaXR5LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNpdHkgPSBjaXR5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgY2l0eS5zbGljZSgxKTtcbiAgICAgICAgbGV0IHVybCA9IFwiaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT1cIiArIGNpdHkgKyBcIiZhcHBpZD0yNTJhZGU1NzhiMTA2NzA5ZDk4ZGIyMTRkMDRjNTA0ZFwiO1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGZldGNoKHVybCwge21vZGU6IFwiY29yc1wifSk7XG4gICAgICAgIGxldCB3ZWF0aGVyID0gYXdhaXQgZGF0YS5qc29uKCk7XG4gICAgICAgIGxldCBsYXQgPSB3ZWF0aGVyLmNvb3JkLmxhdDtcbiAgICAgICAgbGV0IGxvbiA9IHdlYXRoZXIuY29vcmQubG9uO1xuICAgICAgICBsZXQgd2VhdGhlck9iaiA9ICBhd2FpdCBnZXRGdWxsRm9yZWNhc3QobGF0LCBsb24pO1xuICAgICAgICBsZXQgb3V0cHV0T2JqID0ge1xuICAgICAgICAgICAgY2l0eTogY2l0eSxcbiAgICAgICAgICAgIGN1cnJlbnQ6IHdlYXRoZXJPYmouY3VycmVudCxcbiAgICAgICAgICAgIGRhaWx5OiB3ZWF0aGVyT2JqLmRhaWx5LFxuICAgICAgICAgICAgaG91cmx5OiB3ZWF0aGVyT2JqLmhvdXJseSxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG91dHB1dE9iajtcbiAgICB9XG4gICAgY2F0Y2goZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRGdWxsRm9yZWNhc3QobGF0LCBsb24pIHtcbiAgICB0cnkge1xuICAgICAgICBsZXQgdXJsID0gXCJodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvb25lY2FsbD9sYXQ9XCIgKyBsYXQgKyBcIiZsb249XCIgKyBsb24gKyBcIiZleGNsdWRlPW1pbnV0ZWx5LGFsZXJ0cyZhcHBpZD0yNTJhZGU1NzhiMTA2NzA5ZDk4ZGIyMTRkMDRjNTA0ZFwiO1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGZldGNoKHVybCwge21vZGU6IFwiY29yc1wifSk7XG4gICAgICAgIGxldCB3ZWF0aGVyID0gYXdhaXQgZGF0YS5qc29uKCk7XG4gICAgICAgIHJldHVybiB3ZWF0aGVyO1xuICAgIH1cbiAgICBjYXRjaChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY2FsZSgpIHtcbiAgICBsZXQgdGVtcFNjYWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wU2NhbGVcIik7XG4gICAgaWYgKHRlbXBTY2FsZS5jbGFzc0xpc3QubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBcImNcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBcImZcIjtcbiAgICB9XG59XG5cbi8vRnVuY3Rpb24gZm9yIGNvbnZlcnRpbmcgdGhlIGtlbHZpbiBzY2FsZSByZXR1cm5lZCBmcm9tIGFwaSBjYWxsIHRvIENlbHNpdXNcbmV4cG9ydCBmdW5jdGlvbiB0b0NlbHNpdXMoa2VsdmluKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKGtlbHZpbiAtIDI3My4xNSkgKiAxMCkgLyAxMDtcbn1cblxuLy9GdW5jdGlvbiBmb3IgY29udmVydGluZyB0aGUga2VsdmluIHNjYWxlIHJldHVybmVkIGZyb20gYXBpIGNhbGwgdG8gRmFocmVuaGVpdFxuZXhwb3J0IGZ1bmN0aW9uIHRvRmFocmVuaGVpdChrZWx2aW4pIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcigoKGtlbHZpbiAtIDI3My4xNSkqOS81ICsgMzIpICogMTApIC8gMTAgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3dpdGNoU2NhbGUoKSB7XG4gICAgbGV0IHRlbXBTY2FsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVtcFNjYWxlXCIpO1xuICAgIGlmICh0ZW1wU2NhbGUuY2xhc3NMaXN0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICB0ZW1wU2NhbGUuY2xhc3NMaXN0LnJlbW92ZShcImxlZnRcIik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0ZW1wU2NhbGUuY2xhc3NMaXN0LmFkZChcImxlZnRcIik7XG4gICAgfVxufSIsImltcG9ydCB7IHRvQ2Vsc2l1cywgdG9GYWhyZW5oZWl0IH0gZnJvbSBcIi4vZ2V0V2VhdGhlci5qc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmlsbFdlZWtseUluZm8oZm9yZWNhc3QsIHRlbXBTY2FsZSkge1xuICAgIGZvcmVjYXN0ID0gYXdhaXQgZm9yZWNhc3Q7XG4gICAgbGV0IGNvbnZlcnRTY2FsZSA9IG51bGw7XG4gICAgaWYgKHRlbXBTY2FsZSA9PT0gXCJjXCIpIHtcbiAgICAgICAgY29udmVydFNjYWxlID0gdG9DZWxzaXVzO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29udmVydFNjYWxlID0gdG9GYWhyZW5oZWl0O1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IDg7IGkrKykgeyAvL0xvb3Agc3RhcnRzIGF0IDEgaW4gb3JkZXIgdG8gc2tpcCB0aGUgY3VycmVudCBkYXk7IGdvZXMgdXAgdG8gNyBmb3IgYSBmdWxsIHdlZWsgZm9yZWNhc3RcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWVrbHlcIiArIGkpLnRleHRDb250ZW50ID0gZ2V0RGF5KGZvcmVjYXN0LmRhaWx5W2ldLmR0KTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWVrbHlcIiArIGkpLnN0eWxlLmZvbnRTaXplID0gXCIzMHB4XCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2Vla2x5SW1nXCIgKyBpKS5zcmMgPSBcImh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duL1wiICsgZm9yZWNhc3QuZGFpbHlbaV0ud2VhdGhlclswXS5pY29uICsgXCJAMngucG5nXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2Vla2x5UG9wXCIgKyBpKS50ZXh0Q29udGVudCA9IFwiUGVyY2lwaXRhdGlvbjogXCIgKyAoZm9yZWNhc3QuZGFpbHlbaV0ucG9wICogMTAwKSArIFwiJVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlZWtseVBvcFwiICsgaSkuc3R5bGUuZm9udFNpemUgPSBcIjE4cHhcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWVrbHlIaWdoXCIgKyBpKS50ZXh0Q29udGVudCA9IFwiSDogXCIgKyBjb252ZXJ0U2NhbGUoZm9yZWNhc3QuZGFpbHlbaV0udGVtcC5tYXgpICsgXCJcXHhCMFwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlZWtseUhpZ2hcIiArIGkpLnN0eWxlLmZvbnRTaXplID0gXCIzMHB4XCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2Vla2x5TG93XCIgKyBpKS50ZXh0Q29udGVudCA9IFwiTDogXCIgKyBjb252ZXJ0U2NhbGUoZm9yZWNhc3QuZGFpbHlbaV0udGVtcC5taW4pICsgXCJcXHhCMFwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlZWtseUxvd1wiICsgaSkuc3R5bGUuZm9udFNpemUgPSBcIjIwcHhcIjtcbiAgICB9XG59XG5cbi8vRnVuY3Rpb24gZm9yIGdldHRpbmcgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRheSBmcm9tIGEgVVRDIFxuZnVuY3Rpb24gZ2V0RGF5KHNlY29uZHMpIHtcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKDApO1xuICAgIGRhdGUuc2V0VVRDU2Vjb25kcyhzZWNvbmRzKTtcbiAgICBsZXQgZGF5ID0gZGF0ZS5nZXREYXkoKTtcbiAgICBpZiAoZGF5ID09PSAwKSB7XG4gICAgICAgIHJldHVybiBcIlN1blwiO1xuICAgIH1cbiAgICBlbHNlIGlmIChkYXkgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIFwiTW9uXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRheSA9PT0gMikge1xuICAgICAgICByZXR1cm4gXCJUdWVzXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRheSA9PT0gMykge1xuICAgICAgICByZXR1cm4gXCJXZWRcIjtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGF5ID09PSA0KSB7XG4gICAgICAgIHJldHVybiBcIlRodXJcIjtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGF5ID09PSA1KSB7XG4gICAgICAgIHJldHVybiBcIkZyaVwiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwiU2F0XCI7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2V0Rm9yZWNhc3QsIHN3aXRjaFNjYWxlLCBnZXRTY2FsZSB9IGZyb20gXCIuL2dldFdlYXRoZXIuanNcIjtcbmltcG9ydCB7IGZpbGxBY3RpdmVJbmZvIH0gZnJvbSBcIi4vY3VycmVudFdlYXRoZXIuanNcIlxuaW1wb3J0IHsgZmlsbFdlZWtseUluZm8gfSBmcm9tIFwiLi93ZWVrbHlXZWF0aGVyLmpzXCJcbmltcG9ydCBnZXRCYWNrZ3JvdW5kIGZyb20gXCIuL2JhY2tncm91bmQuanNcIlxuaW1wb3J0IHsgZmlsbHlEYWlseUluZm8gfSBmcm9tIFwiLi9kYWlseVdlYXRoZXIuanNcIjtcblxuLy9DYWNoZSBET00gZm9yIGNvbnZlbmllbmNlXG5sZXQgc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hcIik7XG5sZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWluZXJcIik7XG5sZXQgYmFja2dyb3VuZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JhY2tncm91bmRzXCIpO1xuY29udGFpbmVyLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcblxuXG5cbmxldCBmb3JlY2FzdCA9IGdldEZvcmVjYXN0KFwib3JsYW5kb1wiKTtcbmxvYWRQYWdlKCk7XG5cblxuXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVtcFNjYWxlRGl2XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzd2l0Y2hTY2FsZSk7IC8vTGlzdGVuZXIgZm9yIG1vdmluZyB0aGUgdGVtcFNjYWxlIHNsaWRlcjsgdXNlcyBvbGQgZm9yZWNhc3QgaW5mbyAoYmVjYXVzZSBvbmx5IGNoYW5naW5nIHNjYWxlKVxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wU2NhbGVEaXZcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIHRvZ2dsZU9wYWNpdHkoKTtcbiAgICB3aW5kb3cuc2V0VGltZW91dCh0b2dnbGVPcGFjaXR5LCA3NTApO1xuICAgIGdldEJhY2tncm91bmQoKTtcbiAgICBmaWxsQWN0aXZlSW5mbyhmb3JlY2FzdCwgZ2V0U2NhbGUoKSk7XG4gICAgZmlsbFdlZWtseUluZm8oZm9yZWNhc3QsIGdldFNjYWxlKCkpO1xuICAgIGZpbGx5RGFpbHlJbmZvKGZvcmVjYXN0LCBnZXRTY2FsZSgpKTtcbn0pO1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hcIikuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICB0b2dnbGVPcGFjaXR5KCk7XG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRvZ2dsZU9wYWNpdHksIDc1MCk7XG4gICAgICAgIGxvYWRQYWdlKCk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoXCIpLnZhbHVlID0gXCJcIjtcbiAgICB9XG59KTtcblxuXG5cbi8vV3JhcHBlciBmdW5jdGlvbiB0byBsb2FkIGV2ZXJ5dGhpbmcgb24gdGhlIHBhZ2U7IEhlbHBzIHdpdGggY2hhbmdpbmcgdGVtcCBTY2FsZVxuYXN5bmMgZnVuY3Rpb24gbG9hZFBhZ2UoKSB7XG4gICAgbGV0IGNpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaFwiKS52YWx1ZTtcbiAgICBpZiAoY2l0eSA9PT0gXCJcIikge1xuICAgICAgICBjaXR5ID0gXCJvcmxhbmRvXCJcbiAgICB9XG4gICAgZm9yZWNhc3QgPSBhd2FpdCBnZXRGb3JlY2FzdChjaXR5KTtcbiAgICBpZiAoZm9yZWNhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsZXQgY3VycmVudENpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZUNpdHlcIikudGV4dENvbnRlbnQ7XG4gICAgICAgIGZvcmVjYXN0ID0gZ2V0Rm9yZWNhc3QoY3VycmVudENpdHkpO1xuICAgICAgICBzZWFyY2guc3R5bGUuYm9yZGVyQm90dG9tID0gXCIzcHggc29saWQgcmVkXCI7XG4gICAgICAgIHNlYXJjaC5wbGFjZWhvbGRlciA9IFwiUGxlYXNlIHRyeSBhZ2Fpbi5cIlxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc2VhcmNoLnN0eWxlLmJvcmRlckJvdHRvbSA9IFwiM3B4IHNvbGlkIHdoaXRlXCI7XG4gICAgICAgIHNlYXJjaC5wbGFjZWhvbGRlciA9IFwiU2VhcmNoIGEgQ2l0eS4uLlwiXG4gICAgfVxuICAgIGdldEJhY2tncm91bmQoKTtcbiAgICBhd2FpdCBmaWxsQWN0aXZlSW5mbyhmb3JlY2FzdCwgZ2V0U2NhbGUoKSk7XG4gICAgYXdhaXQgZmlsbFdlZWtseUluZm8oZm9yZWNhc3QsIGdldFNjYWxlKCkpO1xuICAgIGF3YWl0IGZpbGx5RGFpbHlJbmZvKGZvcmVjYXN0LCBnZXRTY2FsZSgpKTtcbn1cblxuLy9GdW5jdGlvbiB0byBtYWtlIGV2ZXJ5dGhpbmcgdHJhbnNwYXJlbnQvb3BhcXVlIHdoZW4gbG9hZGluZyBpbiBuZXcgaW5mb1xuZnVuY3Rpb24gdG9nZ2xlT3BhY2l0eSgpIHtcbiAgICBpZiAoY29udGFpbmVyLnN0eWxlLm9wYWNpdHkgPT09IFwiMFwiKSB7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgIGJhY2tncm91bmRzLmNoaWxkTm9kZXMuZm9yRWFjaChmdW5jdGlvbihpbWFnZSwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCUyKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2Uuc3R5bGUuZmlsdGVyID0gXCJicmlnaHRuZXNzKDAuNSlcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb250YWluZXIuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xuICAgICAgICBiYWNrZ3JvdW5kcy5jaGlsZE5vZGVzLmZvckVhY2goZnVuY3Rpb24oaW1hZ2UsIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoaW5kZXglMikge1xuICAgICAgICAgICAgICAgIGltYWdlLnN0eWxlLmZpbHRlciA9IFwiYnJpZ2h0bmVzcygxKVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9