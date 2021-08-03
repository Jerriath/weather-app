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




let forecast = (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getForecast)("orlando");
(0,_background_js__WEBPACK_IMPORTED_MODULE_2__.default)();
document.querySelector("#tempScale").addEventListener("click", _getWeather_js__WEBPACK_IMPORTED_MODULE_0__.switchScale); //Listener for moving the tempScale slider
document.querySelector("#tempScale").addEventListener("click", function() {
    (0,_background_js__WEBPACK_IMPORTED_MODULE_2__.default)();
    (0,_currentWeather_js__WEBPACK_IMPORTED_MODULE_1__.fillActiveInfo)(forecast, (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getScale)());
});
document.querySelector("#search").addEventListener("keypress", function(e) {
    console.log(e);
    if (e.key === "Enter") {
        loadPage();
        document.querySelector("#search").value = "";
    }
});

(0,_currentWeather_js__WEBPACK_IMPORTED_MODULE_1__.fillActiveInfo)(forecast, (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getScale)());


//Wrapper function to load everything on the page; Helps with changing temp Scale
function loadPage() {
    let city = document.querySelector("#search").value;
    forecast = (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getForecast)(city);
    (0,_background_js__WEBPACK_IMPORTED_MODULE_2__.default)();
    (0,_currentWeather_js__WEBPACK_IMPORTED_MODULE_1__.fillActiveInfo)(forecast, (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getScale)());
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsNkJBQWUsc0NBQVc7QUFDMUI7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3hDMEQ7O0FBRTFEO0FBQ0Esd0RBQXdEO0FBQ3hELHNEQUFzRDtBQUN0RCw4REFBOEQ7QUFDOUQsd0RBQXdEO0FBQ3hELHNEQUFzRDtBQUN0RCwwREFBMEQ7QUFDMUQsc0RBQXNEO0FBQ3RELGdFQUFnRTtBQUNoRSxnRUFBZ0U7QUFDaEUsd0RBQXdEOzs7QUFHeEQ7QUFDTyxxREFBcUQ7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIscURBQVM7QUFDaEM7QUFDQTtBQUNBLHVCQUF1Qix3REFBWTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BDQTs7QUFFTztBQUNQO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxrSEFBa0gsYUFBYTtBQUMvSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0xBQWtMLGFBQWE7QUFDL0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBOztBQUVBO0FBQ087QUFDUDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O1VDaEVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05xRTtBQUNqQjtBQUNUOztBQUUzQyxlQUFlLDJEQUFXO0FBQzFCLHVEQUFhO0FBQ2IsK0RBQStELHVEQUFXLEdBQUc7QUFDN0U7QUFDQSxJQUFJLHVEQUFhO0FBQ2pCLElBQUksa0VBQWMsV0FBVyx3REFBUTtBQUNyQyxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxrRUFBYyxXQUFXLHdEQUFROzs7QUFHakMsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQSxlQUFlLDJEQUFXO0FBQzFCLElBQUksdURBQWE7QUFDakIsSUFBSSxrRUFBYyxXQUFXLHdEQUFRO0FBQ3JDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9iYWNrZ3JvdW5kLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2N1cnJlbnRXZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2dldFdlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL0NhY2hlIERPTVxubGV0IHN1bnJpc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1bnJpc2VcIik7XG5sZXQgbm9vbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbm9vblwiKTtcbmxldCBzdW5zZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1bnNldFwiKTtcbmxldCBuaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmlnaHRcIik7XG5cblxuLy9GdW5jdGlvbiB0byBkZXRlcm1pbmUgdGltZSBvZiBkYXkgYW5kIHNob3cgY29yZXNwb25kaW5nIGJhY2tncm91bmRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICAgIGhpZGVBTEwoKTtcbiAgICBsZXQgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGxldCBjdXJyZW50SG91ciA9IGN1cnJlbnREYXRlLmdldEhvdXJzKCk7XG5cblxuICAgIGlmIChjdXJyZW50SG91ciA+PSA1ICYmIGN1cnJlbnRIb3VyIDwgMTIpIHtcbiAgICAgICAgc2hvdyhzdW5yaXNlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY3VycmVudEhvdXIgPj0gMTIgJiYgY3VycmVudEhvdXIgPCAxNykge1xuICAgICAgICBzaG93KG5vb24pO1xuICAgIH1cbiAgICBlbHNlIGlmIChjdXJyZW50SG91ciA+PSAxNyAmJiBjdXJyZW50SG91ciA8IDIwKSB7XG4gICAgICAgIHNob3coc3Vuc2V0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHNob3cobmlnaHQpO1xuICAgIH1cblxufVxuXG4vL0Z1bmN0aW9uIGZvciBoaWRpbmcgYWxsIGJhY2tncm91bmQgaW1nc1xuZnVuY3Rpb24gaGlkZUFMTCgpIHtcbiAgICBzdW5yaXNlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBub29uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBzdW5zZXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIG5pZ2h0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn1cblxuLy9GdW5jdGlvbiBmb3IgZGlzcGxheWluZyBvbmx5IG9uZSBiYWNrZ3JvdW5kXG5mdW5jdGlvbiBzaG93KGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG59IiwiaW1wb3J0IHsgdG9DZWxzaXVzLCB0b0ZhaHJlbmhlaXQgfSBmcm9tIFwiLi9nZXRXZWF0aGVyLmpzXCI7XG5cbi8vQ2FjaGUgRE9NXG5sZXQgYWN0aXZlQ2l0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlQ2l0eVwiKTsgLy9UaXRsZSBmb3IgdGhlIGNpdHkgbmFtZVxubGV0IGFjdGl2ZUltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlSW1nXCIpOyAvL0ltZyBmb3Igd2VhdGhlciBjb25kaXRpb25zIChpLmUuIGNsb3VkeSwgcmFpbnksIGV0Yy4pXG5sZXQgYWN0aXZlV2VhdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlV2VhdGhlclwiKTsgLy88cD4gZWxlbWVudCBmb3IgdGhlIHdlYXRoZXIgZGVzY3JpcHRpb25cbmxldCBhY3RpdmVIaWdoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3RpdmVIaWdoXCIpOyAvL0hpZ2ggdGVtcFxubGV0IGFjdGl2ZUxvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlTG93XCIpOyAvL0xvdyB0ZW1wXG5sZXQgYWN0aXZlRmVlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZUZlZWxzXCIpOyAvL0ZlbGxzIGxpa2VcbmxldCBhY3RpdmVQb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZVBvcFwiKTsgLy9Qcm9iYWJpbGl0eSBvZiBwZXJjaXBpdGF0aW9uXG5sZXQgYWN0aXZlSHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZUh1bWlkaXR5XCIpOyAvL0h1bWlkaXR5XG5sZXQgYWN0aXZlUHJlc3N1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZVByZXNzdXJlXCIpOyAvL1ByZXNzdXJlXG5sZXQgYWN0aXZlV2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlV2luZFwiKTsgLy9XaW5kIHNwZWVkXG5cblxuLy9GdW5jdGlvbiBmb3IgZmlsbGluZyBpbiB0aGUgaW5mbyBmb3IgdGhlIGFjdGl2ZSB3ZWF0aGVyIGRpdlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbGxBY3RpdmVJbmZvKGZvcmVjYXN0LCB0ZW1wU2NhbGUpIHsgLy9JIHdhbnQgdG8gcmVmYWN0b3IgdGhpcyBmdW5jdGlvbiB0byBiZSBhIHdyYXBwZXIgZnVuY3Rpb24gdGhhdCBjYW4gZGV0ZXJtaW5lIHdoaWNoIGZ1bmN0aW9ucyB0byB1c2UgYmFzZWQgb24gcGFyYW1zXG4gICAgZm9yZWNhc3QgPSBhd2FpdCBmb3JlY2FzdDtcbiAgICBjb25zb2xlLmxvZyhmb3JlY2FzdCk7XG4gICAgYWN0aXZlQ2l0eS50ZXh0Q29udGVudCA9IGZvcmVjYXN0LmNpdHk7XG4gICAgYWN0aXZlSW1nLnNyYyA9IFwiaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vXCIgKyBmb3JlY2FzdC5jdXJyZW50LndlYXRoZXJbMF0uaWNvbiArIFwiQDJ4LnBuZ1wiO1xuICAgIGFjdGl2ZVdlYXRoZXIudGV4dENvbnRlbnQgPSBmb3JlY2FzdC5jdXJyZW50LndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG4gICAgbGV0IGNvbnZlcnRTY2FsZSA9IG51bGw7XG4gICAgaWYgKHRlbXBTY2FsZSA9PT0gXCJjXCIpIHtcbiAgICAgICAgY29udmVydFNjYWxlID0gdG9DZWxzaXVzO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29udmVydFNjYWxlID0gdG9GYWhyZW5oZWl0O1xuICAgIH1cbiAgICBhY3RpdmVIaWdoLnRleHRDb250ZW50ID0gY29udmVydFNjYWxlKGZvcmVjYXN0LmRhaWx5WzBdLnRlbXAubWF4KTtcbiAgICBhY3RpdmVMb3cudGV4dENvbnRlbnQgPSBjb252ZXJ0U2NhbGUoZm9yZWNhc3QuZGFpbHlbMF0udGVtcC5taW4pO1xuICAgIGFjdGl2ZUZlZWxzLnRleHRDb250ZW50ID0gY29udmVydFNjYWxlKGZvcmVjYXN0LmN1cnJlbnQuZmVlbHNfbGlrZSk7XG4gICAgYWN0aXZlUG9wLnRleHRDb250ZW50ID0gZm9yZWNhc3QuaG91cmx5WzBdLnBvcCAqIDEwMCArIFwiJVwiO1xuICAgIGFjdGl2ZUh1bWlkaXR5LnRleHRDb250ZW50ID0gZm9yZWNhc3QuY3VycmVudC5odW1pZGl0eSArIFwiJVwiO1xuICAgIGFjdGl2ZVByZXNzdXJlLnRleHRDb250ZW50ID0gZm9yZWNhc3QuY3VycmVudC5wcmVzc3VyZSArIFwiaFBhXCI7XG4gICAgYWN0aXZlV2luZC50ZXh0Q29udGVudCA9IGZvcmVjYXN0LmN1cnJlbnQud2luZF9zcGVlZCArIFwibS9zXCIgKyBcIiAgKFwiICsgTWF0aC5mbG9vcihmb3JlY2FzdC5jdXJyZW50LndpbmRfc3BlZWQgKiAyMi4zNjk0KSAvIDEwICsgXCJtaS9ocilcIjtcbn1cblxuXG4iLCJsZXQgQVBJX0tFWSA9IGNvbmZpZy5BUElfS0VZO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Rm9yZWNhc3QoY2l0eSkge1xuICAgIHRyeSB7XG4gICAgICAgIC8vTm9ybWFsaXppbmcgY2l0eSB0ZXh0OyBpbXBvcnRhbnQgZm9yIGRpc3BsYXlpbmcgY2l0eSBuYW1lIG9uIHdlYnNpdGVcbiAgICAgICAgY2l0eSA9IGNpdHkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY2l0eSA9IGNpdHkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBjaXR5LnNsaWNlKDEpO1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGZldGNoKFwiaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPVwiICsgY2l0eSArIFwiJmFwcGlkPVwiICsgQVBJX0tFWSwge21vZGU6IFwiY29yc1wifSk7XG4gICAgICAgIGxldCB3ZWF0aGVyID0gYXdhaXQgZGF0YS5qc29uKCk7XG4gICAgICAgIGxldCBsYXQgPSB3ZWF0aGVyLmNvb3JkLmxhdDtcbiAgICAgICAgbGV0IGxvbiA9IHdlYXRoZXIuY29vcmQubG9uO1xuICAgICAgICBsZXQgd2VhdGhlck9iaiA9ICBhd2FpdCBnZXRGdWxsRm9yZWNhc3QobGF0LCBsb24pO1xuICAgICAgICBsZXQgb3V0cHV0T2JqID0ge1xuICAgICAgICAgICAgY2l0eTogY2l0eSxcbiAgICAgICAgICAgIGN1cnJlbnQ6IHdlYXRoZXJPYmouY3VycmVudCxcbiAgICAgICAgICAgIGRhaWx5OiB3ZWF0aGVyT2JqLmRhaWx5LFxuICAgICAgICAgICAgaG91cmx5OiB3ZWF0aGVyT2JqLmhvdXJseSxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG91dHB1dE9iajtcbiAgICB9XG4gICAgY2F0Y2goZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRGdWxsRm9yZWNhc3QobGF0LCBsb24pIHtcbiAgICB0cnkge1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L29uZWNhbGw/bGF0PVwiICsgbGF0ICsgXCImbG9uPVwiICsgbG9uICsgXCImZXhjbHVkZT1taW51dGVseSxhbGVydHMmYXBwaWQ9MjUyYWRlNTc4YjEwNjcwOWQ5OGRiMjE0ZDA0YzUwNGRcIiwge21vZGU6IFwiY29yc1wifSk7XG4gICAgICAgIGxldCB3ZWF0aGVyID0gYXdhaXQgZGF0YS5qc29uKCk7XG4gICAgICAgIHJldHVybiB3ZWF0aGVyO1xuICAgIH1cbiAgICBjYXRjaChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY2FsZSgpIHtcbiAgICBsZXQgdGVtcFNjYWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wU2NhbGVcIik7XG4gICAgaWYgKHRlbXBTY2FsZS5jbGFzc0xpc3QubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBcImNcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBcImZcIjtcbiAgICB9XG59XG5cbi8vRnVuY3Rpb24gZm9yIGNvbnZlcnRpbmcgdGhlIGtlbHZpbiBzY2FsZSByZXR1cm5lZCBmcm9tIGFwaSBjYWxsIHRvIENlbHNpdXNcbmV4cG9ydCBmdW5jdGlvbiB0b0NlbHNpdXMoa2VsdmluKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKGtlbHZpbiAtIDI3My4xNSkgKiAxMCkgLyAxMDtcbn1cblxuLy9GdW5jdGlvbiBmb3IgY29udmVydGluZyB0aGUga2VsdmluIHNjYWxlIHJldHVybmVkIGZyb20gYXBpIGNhbGwgdG8gRmFocmVuaGVpdFxuZXhwb3J0IGZ1bmN0aW9uIHRvRmFocmVuaGVpdChrZWx2aW4pIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcigoKGtlbHZpbiAtIDI3My4xNSkqOS81ICsgMzIpICogMTApIC8gMTAgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3dpdGNoU2NhbGUoKSB7XG4gICAgbGV0IHRlbXBTY2FsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVtcFNjYWxlXCIpO1xuICAgIGlmICh0ZW1wU2NhbGUuY2xhc3NMaXN0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICB0ZW1wU2NhbGUuY2xhc3NMaXN0LnJlbW92ZShcImxlZnRcIik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0ZW1wU2NhbGUuY2xhc3NMaXN0LmFkZChcImxlZnRcIik7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2V0Rm9yZWNhc3QsIHN3aXRjaFNjYWxlLCBnZXRTY2FsZSB9IGZyb20gXCIuL2dldFdlYXRoZXIuanNcIjtcbmltcG9ydCB7IGZpbGxBY3RpdmVJbmZvIH0gZnJvbSBcIi4vY3VycmVudFdlYXRoZXIuanNcIlxuaW1wb3J0IGdldEJhY2tncm91bmQgZnJvbSBcIi4vYmFja2dyb3VuZC5qc1wiXG5cbmxldCBmb3JlY2FzdCA9IGdldEZvcmVjYXN0KFwib3JsYW5kb1wiKTtcbmdldEJhY2tncm91bmQoKTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVtcFNjYWxlXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzd2l0Y2hTY2FsZSk7IC8vTGlzdGVuZXIgZm9yIG1vdmluZyB0aGUgdGVtcFNjYWxlIHNsaWRlclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wU2NhbGVcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIGdldEJhY2tncm91bmQoKTtcbiAgICBmaWxsQWN0aXZlSW5mbyhmb3JlY2FzdCwgZ2V0U2NhbGUoKSk7XG59KTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCBmdW5jdGlvbihlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgbG9hZFBhZ2UoKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hcIikudmFsdWUgPSBcIlwiO1xuICAgIH1cbn0pO1xuXG5maWxsQWN0aXZlSW5mbyhmb3JlY2FzdCwgZ2V0U2NhbGUoKSk7XG5cblxuLy9XcmFwcGVyIGZ1bmN0aW9uIHRvIGxvYWQgZXZlcnl0aGluZyBvbiB0aGUgcGFnZTsgSGVscHMgd2l0aCBjaGFuZ2luZyB0ZW1wIFNjYWxlXG5mdW5jdGlvbiBsb2FkUGFnZSgpIHtcbiAgICBsZXQgY2l0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoXCIpLnZhbHVlO1xuICAgIGZvcmVjYXN0ID0gZ2V0Rm9yZWNhc3QoY2l0eSk7XG4gICAgZ2V0QmFja2dyb3VuZCgpO1xuICAgIGZpbGxBY3RpdmVJbmZvKGZvcmVjYXN0LCBnZXRTY2FsZSgpKTtcbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=