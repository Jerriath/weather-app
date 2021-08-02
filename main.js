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
}




/***/ }),

/***/ "./src/getWeather.js":
/*!***************************!*\
  !*** ./src/getWeather.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getForecast": () => (/* binding */ getForecast)
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
let forecast = (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getForecast)("orlando");

(0,_currentWeather_js__WEBPACK_IMPORTED_MODULE_1__.fillActiveInfo)(forecast);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsNkJBQWUsc0NBQVc7QUFDMUI7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDeENBO0FBQ0Esd0RBQXdEO0FBQ3hELHNEQUFzRDtBQUN0RCw4REFBOEQ7QUFDOUQsd0RBQXdEO0FBQ3hELHNEQUFzRDtBQUN0RCwwREFBMEQ7QUFDMUQsc0RBQXNEO0FBQ3RELGdFQUFnRTtBQUNoRSxnRUFBZ0U7QUFDaEUsd0RBQXdEOzs7QUFHeEQ7QUFDTyxxREFBcUQ7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCQTs7QUFFTztBQUNQO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxrSEFBa0gsYUFBYTtBQUMvSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0xBQWtMLGFBQWE7QUFDL0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQ2xDQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOOEM7QUFDTTtBQUNUOzs7QUFHM0MsdURBQWE7QUFDYixlQUFlLDJEQUFXOztBQUUxQixrRUFBYyxXIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jdXJyZW50V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9nZXRXZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9DYWNoZSBET01cbmxldCBzdW5yaXNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdW5yaXNlXCIpO1xubGV0IG5vb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25vb25cIik7XG5sZXQgc3Vuc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdW5zZXRcIik7XG5sZXQgbmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25pZ2h0XCIpO1xuXG5cbi8vRnVuY3Rpb24gdG8gZGV0ZXJtaW5lIHRpbWUgb2YgZGF5IGFuZCBzaG93IGNvcmVzcG9uZGluZyBiYWNrZ3JvdW5kXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgICBoaWRlQUxMKCk7XG4gICAgbGV0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcbiAgICBsZXQgY3VycmVudEhvdXIgPSBjdXJyZW50RGF0ZS5nZXRIb3VycygpO1xuXG5cbiAgICBpZiAoY3VycmVudEhvdXIgPj0gNSAmJiBjdXJyZW50SG91ciA8IDEyKSB7XG4gICAgICAgIHNob3coc3VucmlzZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGN1cnJlbnRIb3VyID49IDEyICYmIGN1cnJlbnRIb3VyIDwgMTcpIHtcbiAgICAgICAgc2hvdyhub29uKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY3VycmVudEhvdXIgPj0gMTcgJiYgY3VycmVudEhvdXIgPCAyMCkge1xuICAgICAgICBzaG93KHN1bnNldCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzaG93KG5pZ2h0KTtcbiAgICB9XG5cbn1cblxuLy9GdW5jdGlvbiBmb3IgaGlkaW5nIGFsbCBiYWNrZ3JvdW5kIGltZ3NcbmZ1bmN0aW9uIGhpZGVBTEwoKSB7XG4gICAgc3VucmlzZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgbm9vbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgc3Vuc2V0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBuaWdodC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59XG5cbi8vRnVuY3Rpb24gZm9yIGRpc3BsYXlpbmcgb25seSBvbmUgYmFja2dyb3VuZFxuZnVuY3Rpb24gc2hvdyhlbGVtZW50KSB7XG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xufSIsIi8vQ2FjaGUgRE9NXG5sZXQgYWN0aXZlQ2l0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlQ2l0eVwiKTsgLy9UaXRsZSBmb3IgdGhlIGNpdHkgbmFtZVxubGV0IGFjdGl2ZUltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlSW1nXCIpOyAvL0ltZyBmb3Igd2VhdGhlciBjb25kaXRpb25zIChpLmUuIGNsb3VkeSwgcmFpbnksIGV0Yy4pXG5sZXQgYWN0aXZlV2VhdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlV2VhdGhlclwiKTsgLy88cD4gZWxlbWVudCBmb3IgdGhlIHdlYXRoZXIgZGVzY3JpcHRpb25cbmxldCBhY3RpdmVIaWdoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3RpdmVIaWdoXCIpOyAvL0hpZ2ggdGVtcFxubGV0IGFjdGl2ZUxvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlTG93XCIpOyAvL0xvdyB0ZW1wXG5sZXQgYWN0aXZlRmVlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZUZlZWxzXCIpOyAvL0ZlbGxzIGxpa2VcbmxldCBhY3RpdmVQb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZVBvcFwiKTsgLy9Qcm9iYWJpbGl0eSBvZiBwZXJjaXBpdGF0aW9uXG5sZXQgYWN0aXZlSHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZUh1bWlkaXR5XCIpOyAvL0h1bWlkaXR5XG5sZXQgYWN0aXZlUHJlc3N1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZVByZXNzdXJlXCIpOyAvL1ByZXNzdXJlXG5sZXQgYWN0aXZlV2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlV2luZFwiKTsgLy9XaW5kIHNwZWVkXG5cblxuLy9GdW5jdGlvbiBmb3IgZmlsbGluZyBpbiB0aGUgaW5mbyBmb3IgdGhlIGFjdGl2ZSB3ZWF0aGVyIGRpdlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbGxBY3RpdmVJbmZvKGZvcmVjYXN0LCB0ZW1wU2NhbGUpIHsgLy9JIHdhbnQgdG8gcmVmYWN0b3IgdGhpcyBmdW5jdGlvbiB0byBiZSBhIHdyYXBwZXIgZnVuY3Rpb24gdGhhdCBjYW4gZGV0ZXJtaW5lIHdoaWNoIGZ1bmN0aW9ucyB0byB1c2UgYmFzZWQgb24gcGFyYW1zXG4gICAgZm9yZWNhc3QgPSBhd2FpdCBmb3JlY2FzdDtcbiAgICBjb25zb2xlLmxvZyhmb3JlY2FzdCk7XG4gICAgYWN0aXZlQ2l0eS50ZXh0Q29udGVudCA9IGZvcmVjYXN0LmNpdHk7XG4gICAgYWN0aXZlSW1nLnNyYyA9IFwiaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vXCIgKyBmb3JlY2FzdC5jdXJyZW50LndlYXRoZXJbMF0uaWNvbiArIFwiQDJ4LnBuZ1wiO1xuICAgIGFjdGl2ZVdlYXRoZXIudGV4dENvbnRlbnQgPSBmb3JlY2FzdC5jdXJyZW50LndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG59XG5cblxuIiwibGV0IEFQSV9LRVkgPSBjb25maWcuQVBJX0tFWTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEZvcmVjYXN0KGNpdHkpIHtcbiAgICB0cnkge1xuICAgICAgICAvL05vcm1hbGl6aW5nIGNpdHkgdGV4dDsgaW1wb3J0YW50IGZvciBkaXNwbGF5aW5nIGNpdHkgbmFtZSBvbiB3ZWJzaXRlXG4gICAgICAgIGNpdHkgPSBjaXR5LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNpdHkgPSBjaXR5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgY2l0eS5zbGljZSgxKTtcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBmZXRjaChcImh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT1cIiArIGNpdHkgKyBcIiZhcHBpZD1cIiArIEFQSV9LRVksIHttb2RlOiBcImNvcnNcIn0pO1xuICAgICAgICBsZXQgd2VhdGhlciA9IGF3YWl0IGRhdGEuanNvbigpO1xuICAgICAgICBsZXQgbGF0ID0gd2VhdGhlci5jb29yZC5sYXQ7XG4gICAgICAgIGxldCBsb24gPSB3ZWF0aGVyLmNvb3JkLmxvbjtcbiAgICAgICAgbGV0IHdlYXRoZXJPYmogPSAgYXdhaXQgZ2V0RnVsbEZvcmVjYXN0KGxhdCwgbG9uKTtcbiAgICAgICAgbGV0IG91dHB1dE9iaiA9IHtcbiAgICAgICAgICAgIGNpdHk6IGNpdHksXG4gICAgICAgICAgICBjdXJyZW50OiB3ZWF0aGVyT2JqLmN1cnJlbnQsXG4gICAgICAgICAgICBkYWlseTogd2VhdGhlck9iai5kYWlseSxcbiAgICAgICAgICAgIGhvdXJseTogd2VhdGhlck9iai5ob3VybHksXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBvdXRwdXRPYmo7XG4gICAgfVxuICAgIGNhdGNoKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0RnVsbEZvcmVjYXN0KGxhdCwgbG9uKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBmZXRjaChcImh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsP2xhdD1cIiArIGxhdCArIFwiJmxvbj1cIiArIGxvbiArIFwiJmV4Y2x1ZGU9bWludXRlbHksYWxlcnRzJmFwcGlkPTI1MmFkZTU3OGIxMDY3MDlkOThkYjIxNGQwNGM1MDRkXCIsIHttb2RlOiBcImNvcnNcIn0pO1xuICAgICAgICBsZXQgd2VhdGhlciA9IGF3YWl0IGRhdGEuanNvbigpO1xuICAgICAgICByZXR1cm4gd2VhdGhlcjtcbiAgICB9XG4gICAgY2F0Y2goZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2V0Rm9yZWNhc3QgfSBmcm9tIFwiLi9nZXRXZWF0aGVyLmpzXCI7XG5pbXBvcnQgeyBmaWxsQWN0aXZlSW5mbyB9IGZyb20gXCIuL2N1cnJlbnRXZWF0aGVyLmpzXCJcbmltcG9ydCBnZXRCYWNrZ3JvdW5kIGZyb20gXCIuL2JhY2tncm91bmQuanNcIlxuXG5cbmdldEJhY2tncm91bmQoKTtcbmxldCBmb3JlY2FzdCA9IGdldEZvcmVjYXN0KFwib3JsYW5kb1wiKTtcblxuZmlsbEFjdGl2ZUluZm8oZm9yZWNhc3QpOyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==