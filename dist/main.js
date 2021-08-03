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
    console.log(convertScale);
    activeHigh.textContent = convertScale(forecast.daily[0].temp.max);
    activeLow.textContent = convertScale(forecast.daily[0].temp.min);
    activeFeels.textContent = convertScale(forecast.current.feels_like);
    activePop.textContent = forecast.hourly[0].pop * 100 + "%";
    activeHumidity.textContent = forecast.current.humidity + "%";
    activePressure.textContent = forecast.current.pressure + "hPa";
    activeWind.textContent = forecast.current.wind_speed + "m/s" + "  (" + Math.floor(forecast.current.wind_speed * 22.3694) / 10 + "mi/hr)";
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
let API_KEY = config.API_KEY;

async function getForecast(city) {
    try {
        //Normalizing city text; important for displaying city name on website
        city = city.toLowerCase();
        city = city.charAt(0).toUpperCase() + city.slice(1);
        let data = await fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY, {mode: "cors"});
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
        let data = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,alerts&appid=252ade578b106709d98db214d04c504d", {mode: "cors"});
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
/* harmony import */ var _background_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./background.js */ "./src/background.js");





(0,_background_js__WEBPACK_IMPORTED_MODULE_2__.default)();
document.querySelector("#tempScale").addEventListener("click", _getWeather_js__WEBPACK_IMPORTED_MODULE_0__.switchScale);
let forecast = (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getForecast)("orlando");
console.log((0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getScale)());
(0,_currentWeather_js__WEBPACK_IMPORTED_MODULE_1__.fillActiveInfo)(forecast, (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getScale)());


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsNkJBQWUsc0NBQVc7QUFDMUI7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3hDb0U7O0FBRXBFO0FBQ0Esd0RBQXdEO0FBQ3hELHNEQUFzRDtBQUN0RCw4REFBOEQ7QUFDOUQsd0RBQXdEO0FBQ3hELHNEQUFzRDtBQUN0RCwwREFBMEQ7QUFDMUQsc0RBQXNEO0FBQ3RELGdFQUFnRTtBQUNoRSxnRUFBZ0U7QUFDaEUsd0RBQXdEOzs7QUFHeEQ7QUFDTyxxREFBcUQ7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIscURBQVM7QUFDaEM7QUFDQTtBQUNBLHVCQUF1Qix3REFBWTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDckNBOztBQUVPO0FBQ1A7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBLGtIQUFrSCxhQUFhO0FBQy9IO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrTEFBa0wsYUFBYTtBQUMvTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0E7O0FBRUE7QUFDTztBQUNQO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7VUNoRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7O0FDTnFFO0FBQ2pCO0FBQ1Q7OztBQUczQyx1REFBYTtBQUNiLCtEQUErRCx1REFBVztBQUMxRSxlQUFlLDJEQUFXO0FBQzFCLFlBQVksd0RBQVE7QUFDcEIsa0VBQWMsV0FBVyx3REFBUSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2JhY2tncm91bmQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY3VycmVudFdlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZ2V0V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vQ2FjaGUgRE9NXG5sZXQgc3VucmlzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3VucmlzZVwiKTtcbmxldCBub29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNub29uXCIpO1xubGV0IHN1bnNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3Vuc2V0XCIpO1xubGV0IG5pZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuaWdodFwiKTtcblxuXG4vL0Z1bmN0aW9uIHRvIGRldGVybWluZSB0aW1lIG9mIGRheSBhbmQgc2hvdyBjb3Jlc3BvbmRpbmcgYmFja2dyb3VuZFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gICAgaGlkZUFMTCgpO1xuICAgIGxldCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgbGV0IGN1cnJlbnRIb3VyID0gY3VycmVudERhdGUuZ2V0SG91cnMoKTtcblxuXG4gICAgaWYgKGN1cnJlbnRIb3VyID49IDUgJiYgY3VycmVudEhvdXIgPCAxMikge1xuICAgICAgICBzaG93KHN1bnJpc2UpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjdXJyZW50SG91ciA+PSAxMiAmJiBjdXJyZW50SG91ciA8IDE3KSB7XG4gICAgICAgIHNob3cobm9vbik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGN1cnJlbnRIb3VyID49IDE3ICYmIGN1cnJlbnRIb3VyIDwgMjApIHtcbiAgICAgICAgc2hvdyhzdW5zZXQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc2hvdyhuaWdodCk7XG4gICAgfVxuXG59XG5cbi8vRnVuY3Rpb24gZm9yIGhpZGluZyBhbGwgYmFja2dyb3VuZCBpbWdzXG5mdW5jdGlvbiBoaWRlQUxMKCkge1xuICAgIHN1bnJpc2Uuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIG5vb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIHN1bnNldC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgbmlnaHQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufVxuXG4vL0Z1bmN0aW9uIGZvciBkaXNwbGF5aW5nIG9ubHkgb25lIGJhY2tncm91bmRcbmZ1bmN0aW9uIHNob3coZWxlbWVudCkge1xuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbn0iLCJpbXBvcnQgeyBnZXRTY2FsZSwgdG9DZWxzaXVzLCB0b0ZhaHJlbmhlaXQgfSBmcm9tIFwiLi9nZXRXZWF0aGVyLmpzXCI7XG5cbi8vQ2FjaGUgRE9NXG5sZXQgYWN0aXZlQ2l0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlQ2l0eVwiKTsgLy9UaXRsZSBmb3IgdGhlIGNpdHkgbmFtZVxubGV0IGFjdGl2ZUltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlSW1nXCIpOyAvL0ltZyBmb3Igd2VhdGhlciBjb25kaXRpb25zIChpLmUuIGNsb3VkeSwgcmFpbnksIGV0Yy4pXG5sZXQgYWN0aXZlV2VhdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlV2VhdGhlclwiKTsgLy88cD4gZWxlbWVudCBmb3IgdGhlIHdlYXRoZXIgZGVzY3JpcHRpb25cbmxldCBhY3RpdmVIaWdoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3RpdmVIaWdoXCIpOyAvL0hpZ2ggdGVtcFxubGV0IGFjdGl2ZUxvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlTG93XCIpOyAvL0xvdyB0ZW1wXG5sZXQgYWN0aXZlRmVlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZUZlZWxzXCIpOyAvL0ZlbGxzIGxpa2VcbmxldCBhY3RpdmVQb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZVBvcFwiKTsgLy9Qcm9iYWJpbGl0eSBvZiBwZXJjaXBpdGF0aW9uXG5sZXQgYWN0aXZlSHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZUh1bWlkaXR5XCIpOyAvL0h1bWlkaXR5XG5sZXQgYWN0aXZlUHJlc3N1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZVByZXNzdXJlXCIpOyAvL1ByZXNzdXJlXG5sZXQgYWN0aXZlV2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlV2luZFwiKTsgLy9XaW5kIHNwZWVkXG5cblxuLy9GdW5jdGlvbiBmb3IgZmlsbGluZyBpbiB0aGUgaW5mbyBmb3IgdGhlIGFjdGl2ZSB3ZWF0aGVyIGRpdlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbGxBY3RpdmVJbmZvKGZvcmVjYXN0LCB0ZW1wU2NhbGUpIHsgLy9JIHdhbnQgdG8gcmVmYWN0b3IgdGhpcyBmdW5jdGlvbiB0byBiZSBhIHdyYXBwZXIgZnVuY3Rpb24gdGhhdCBjYW4gZGV0ZXJtaW5lIHdoaWNoIGZ1bmN0aW9ucyB0byB1c2UgYmFzZWQgb24gcGFyYW1zXG4gICAgZm9yZWNhc3QgPSBhd2FpdCBmb3JlY2FzdDtcbiAgICBjb25zb2xlLmxvZyhmb3JlY2FzdCk7XG4gICAgYWN0aXZlQ2l0eS50ZXh0Q29udGVudCA9IGZvcmVjYXN0LmNpdHk7XG4gICAgYWN0aXZlSW1nLnNyYyA9IFwiaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vXCIgKyBmb3JlY2FzdC5jdXJyZW50LndlYXRoZXJbMF0uaWNvbiArIFwiQDJ4LnBuZ1wiO1xuICAgIGFjdGl2ZVdlYXRoZXIudGV4dENvbnRlbnQgPSBmb3JlY2FzdC5jdXJyZW50LndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG4gICAgbGV0IGNvbnZlcnRTY2FsZSA9IG51bGw7XG4gICAgaWYgKHRlbXBTY2FsZSA9PT0gXCJjXCIpIHtcbiAgICAgICAgY29udmVydFNjYWxlID0gdG9DZWxzaXVzO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29udmVydFNjYWxlID0gdG9GYWhyZW5oZWl0O1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhjb252ZXJ0U2NhbGUpO1xuICAgIGFjdGl2ZUhpZ2gudGV4dENvbnRlbnQgPSBjb252ZXJ0U2NhbGUoZm9yZWNhc3QuZGFpbHlbMF0udGVtcC5tYXgpO1xuICAgIGFjdGl2ZUxvdy50ZXh0Q29udGVudCA9IGNvbnZlcnRTY2FsZShmb3JlY2FzdC5kYWlseVswXS50ZW1wLm1pbik7XG4gICAgYWN0aXZlRmVlbHMudGV4dENvbnRlbnQgPSBjb252ZXJ0U2NhbGUoZm9yZWNhc3QuY3VycmVudC5mZWVsc19saWtlKTtcbiAgICBhY3RpdmVQb3AudGV4dENvbnRlbnQgPSBmb3JlY2FzdC5ob3VybHlbMF0ucG9wICogMTAwICsgXCIlXCI7XG4gICAgYWN0aXZlSHVtaWRpdHkudGV4dENvbnRlbnQgPSBmb3JlY2FzdC5jdXJyZW50Lmh1bWlkaXR5ICsgXCIlXCI7XG4gICAgYWN0aXZlUHJlc3N1cmUudGV4dENvbnRlbnQgPSBmb3JlY2FzdC5jdXJyZW50LnByZXNzdXJlICsgXCJoUGFcIjtcbiAgICBhY3RpdmVXaW5kLnRleHRDb250ZW50ID0gZm9yZWNhc3QuY3VycmVudC53aW5kX3NwZWVkICsgXCJtL3NcIiArIFwiICAoXCIgKyBNYXRoLmZsb29yKGZvcmVjYXN0LmN1cnJlbnQud2luZF9zcGVlZCAqIDIyLjM2OTQpIC8gMTAgKyBcIm1pL2hyKVwiO1xufVxuXG5cbiIsImxldCBBUElfS0VZID0gY29uZmlnLkFQSV9LRVk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRGb3JlY2FzdChjaXR5KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgLy9Ob3JtYWxpemluZyBjaXR5IHRleHQ7IGltcG9ydGFudCBmb3IgZGlzcGxheWluZyBjaXR5IG5hbWUgb24gd2Vic2l0ZVxuICAgICAgICBjaXR5ID0gY2l0eS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjaXR5ID0gY2l0eS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGNpdHkuc2xpY2UoMSk7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgZmV0Y2goXCJodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9XCIgKyBjaXR5ICsgXCImYXBwaWQ9XCIgKyBBUElfS0VZLCB7bW9kZTogXCJjb3JzXCJ9KTtcbiAgICAgICAgbGV0IHdlYXRoZXIgPSBhd2FpdCBkYXRhLmpzb24oKTtcbiAgICAgICAgbGV0IGxhdCA9IHdlYXRoZXIuY29vcmQubGF0O1xuICAgICAgICBsZXQgbG9uID0gd2VhdGhlci5jb29yZC5sb247XG4gICAgICAgIGxldCB3ZWF0aGVyT2JqID0gIGF3YWl0IGdldEZ1bGxGb3JlY2FzdChsYXQsIGxvbik7XG4gICAgICAgIGxldCBvdXRwdXRPYmogPSB7XG4gICAgICAgICAgICBjaXR5OiBjaXR5LFxuICAgICAgICAgICAgY3VycmVudDogd2VhdGhlck9iai5jdXJyZW50LFxuICAgICAgICAgICAgZGFpbHk6IHdlYXRoZXJPYmouZGFpbHksXG4gICAgICAgICAgICBob3VybHk6IHdlYXRoZXJPYmouaG91cmx5LFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gb3V0cHV0T2JqO1xuICAgIH1cbiAgICBjYXRjaChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEZ1bGxGb3JlY2FzdChsYXQsIGxvbikge1xuICAgIHRyeSB7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgZmV0Y2goXCJodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvb25lY2FsbD9sYXQ9XCIgKyBsYXQgKyBcIiZsb249XCIgKyBsb24gKyBcIiZleGNsdWRlPW1pbnV0ZWx5LGFsZXJ0cyZhcHBpZD0yNTJhZGU1NzhiMTA2NzA5ZDk4ZGIyMTRkMDRjNTA0ZFwiLCB7bW9kZTogXCJjb3JzXCJ9KTtcbiAgICAgICAgbGV0IHdlYXRoZXIgPSBhd2FpdCBkYXRhLmpzb24oKTtcbiAgICAgICAgcmV0dXJuIHdlYXRoZXI7XG4gICAgfVxuICAgIGNhdGNoKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjYWxlKCkge1xuICAgIGxldCB0ZW1wU2NhbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlbXBTY2FsZVwiKTtcbiAgICBpZiAodGVtcFNjYWxlLmNsYXNzTGlzdC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgcmV0dXJuIFwiY1wiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwiZlwiO1xuICAgIH1cbn1cblxuLy9GdW5jdGlvbiBmb3IgY29udmVydGluZyB0aGUga2VsdmluIHNjYWxlIHJldHVybmVkIGZyb20gYXBpIGNhbGwgdG8gQ2Vsc2l1c1xuZXhwb3J0IGZ1bmN0aW9uIHRvQ2Vsc2l1cyhrZWx2aW4pIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcigoa2VsdmluIC0gMjczLjE1KSAqIDEwKSAvIDEwO1xufVxuXG4vL0Z1bmN0aW9uIGZvciBjb252ZXJ0aW5nIHRoZSBrZWx2aW4gc2NhbGUgcmV0dXJuZWQgZnJvbSBhcGkgY2FsbCB0byBGYWhyZW5oZWl0XG5leHBvcnQgZnVuY3Rpb24gdG9GYWhyZW5oZWl0KGtlbHZpbikge1xuICAgIHJldHVybiBNYXRoLmZsb29yKCgoa2VsdmluIC0gMjczLjE1KSo5LzUgKyAzMikgKiAxMCkgLyAxMCA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzd2l0Y2hTY2FsZSgpIHtcbiAgICBsZXQgdGVtcFNjYWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wU2NhbGVcIik7XG4gICAgaWYgKHRlbXBTY2FsZS5jbGFzc0xpc3QubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHRlbXBTY2FsZS5jbGFzc0xpc3QucmVtb3ZlKFwibGVmdFwiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRlbXBTY2FsZS5jbGFzc0xpc3QuYWRkKFwibGVmdFwiKTtcbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnZXRGb3JlY2FzdCwgc3dpdGNoU2NhbGUsIGdldFNjYWxlIH0gZnJvbSBcIi4vZ2V0V2VhdGhlci5qc1wiO1xuaW1wb3J0IHsgZmlsbEFjdGl2ZUluZm8gfSBmcm9tIFwiLi9jdXJyZW50V2VhdGhlci5qc1wiXG5pbXBvcnQgZ2V0QmFja2dyb3VuZCBmcm9tIFwiLi9iYWNrZ3JvdW5kLmpzXCJcblxuXG5nZXRCYWNrZ3JvdW5kKCk7XG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlbXBTY2FsZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3dpdGNoU2NhbGUpO1xubGV0IGZvcmVjYXN0ID0gZ2V0Rm9yZWNhc3QoXCJvcmxhbmRvXCIpO1xuY29uc29sZS5sb2coZ2V0U2NhbGUoKSk7XG5maWxsQWN0aXZlSW5mbyhmb3JlY2FzdCwgZ2V0U2NhbGUoKSk7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==