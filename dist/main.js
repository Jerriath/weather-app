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
        document.querySelector("#weeklyHigh" + i).textContent = "H: " + convertScale(forecast.daily[i].temp.max);
        document.querySelector("#weeklyHigh" + i).style.fontSize = "30px";
        document.querySelector("#weeklyLow" + i).textContent = "L: " + convertScale(forecast.daily[i].temp.min);
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





let forecast = (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getForecast)("orlando");
loadPage();




document.querySelector("#tempScaleDiv").addEventListener("click", _getWeather_js__WEBPACK_IMPORTED_MODULE_0__.switchScale); //Listener for moving the tempScale slider
document.querySelector("#tempScaleDiv").addEventListener("click", function() {
    (0,_background_js__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_currentWeather_js__WEBPACK_IMPORTED_MODULE_1__.fillActiveInfo)(forecast, (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getScale)());
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
    forecast = (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getForecast)(city);
    (0,_background_js__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_currentWeather_js__WEBPACK_IMPORTED_MODULE_1__.fillActiveInfo)(forecast, (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getScale)());
    (0,_weeklyWeather_js__WEBPACK_IMPORTED_MODULE_2__.fillWeeklyInfo)(forecast, (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getScale)());
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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azovL3dlYXRoZXItYXBwLy4vc3JjL2JhY2tncm91bmQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvY3VycmVudFdlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZ2V0V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy93ZWVrbHlXZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9DYWNoZSBET01cbmxldCBzdW5yaXNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdW5yaXNlXCIpO1xubGV0IG5vb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25vb25cIik7XG5sZXQgc3Vuc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdW5zZXRcIik7XG5sZXQgbmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25pZ2h0XCIpO1xuXG5cbi8vRnVuY3Rpb24gdG8gZGV0ZXJtaW5lIHRpbWUgb2YgZGF5IGFuZCBzaG93IGNvcmVzcG9uZGluZyBiYWNrZ3JvdW5kXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgICBoaWRlQUxMKCk7XG4gICAgbGV0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcbiAgICBsZXQgY3VycmVudEhvdXIgPSBjdXJyZW50RGF0ZS5nZXRIb3VycygpO1xuXG5cbiAgICBpZiAoY3VycmVudEhvdXIgPj0gNSAmJiBjdXJyZW50SG91ciA8IDEyKSB7XG4gICAgICAgIHNob3coc3VucmlzZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGN1cnJlbnRIb3VyID49IDEyICYmIGN1cnJlbnRIb3VyIDwgMTcpIHtcbiAgICAgICAgc2hvdyhub29uKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY3VycmVudEhvdXIgPj0gMTcgJiYgY3VycmVudEhvdXIgPCAyMCkge1xuICAgICAgICBzaG93KHN1bnNldCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzaG93KG5pZ2h0KTtcbiAgICB9XG5cbn1cblxuLy9GdW5jdGlvbiBmb3IgaGlkaW5nIGFsbCBiYWNrZ3JvdW5kIGltZ3NcbmZ1bmN0aW9uIGhpZGVBTEwoKSB7XG4gICAgc3VucmlzZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgbm9vbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgc3Vuc2V0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBuaWdodC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59XG5cbi8vRnVuY3Rpb24gZm9yIGRpc3BsYXlpbmcgb25seSBvbmUgYmFja2dyb3VuZFxuZnVuY3Rpb24gc2hvdyhlbGVtZW50KSB7XG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xufSIsImltcG9ydCB7IHRvQ2Vsc2l1cywgdG9GYWhyZW5oZWl0IH0gZnJvbSBcIi4vZ2V0V2VhdGhlci5qc1wiO1xuXG4vL0NhY2hlIERPTVxubGV0IGFjdGl2ZUNpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZUNpdHlcIik7IC8vVGl0bGUgZm9yIHRoZSBjaXR5IG5hbWVcbmxldCBhY3RpdmVJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZUltZ1wiKTsgLy9JbWcgZm9yIHdlYXRoZXIgY29uZGl0aW9ucyAoaS5lLiBjbG91ZHksIHJhaW55LCBldGMuKVxubGV0IGFjdGl2ZVdlYXRoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZVdlYXRoZXJcIik7IC8vPHA+IGVsZW1lbnQgZm9yIHRoZSB3ZWF0aGVyIGRlc2NyaXB0aW9uXG5sZXQgYWN0aXZlSGlnaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlSGlnaFwiKTsgLy9IaWdoIHRlbXBcbmxldCBhY3RpdmVMb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZUxvd1wiKTsgLy9Mb3cgdGVtcFxubGV0IGFjdGl2ZUZlZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3RpdmVGZWVsc1wiKTsgLy9GZWxscyBsaWtlXG5sZXQgYWN0aXZlUG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3RpdmVQb3BcIik7IC8vUHJvYmFiaWxpdHkgb2YgcGVyY2lwaXRhdGlvblxubGV0IGFjdGl2ZUh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3RpdmVIdW1pZGl0eVwiKTsgLy9IdW1pZGl0eVxubGV0IGFjdGl2ZVByZXNzdXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3RpdmVQcmVzc3VyZVwiKTsgLy9QcmVzc3VyZVxubGV0IGFjdGl2ZVdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZVdpbmRcIik7IC8vV2luZCBzcGVlZFxuXG5cbi8vRnVuY3Rpb24gZm9yIGZpbGxpbmcgaW4gdGhlIGluZm8gZm9yIHRoZSBhY3RpdmUgd2VhdGhlciBkaXZcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxsQWN0aXZlSW5mbyhmb3JlY2FzdCwgdGVtcFNjYWxlKSB7IC8vSSB3YW50IHRvIHJlZmFjdG9yIHRoaXMgZnVuY3Rpb24gdG8gYmUgYSB3cmFwcGVyIGZ1bmN0aW9uIHRoYXQgY2FuIGRldGVybWluZSB3aGljaCBmdW5jdGlvbnMgdG8gdXNlIGJhc2VkIG9uIHBhcmFtc1xuICAgIGZvcmVjYXN0ID0gYXdhaXQgZm9yZWNhc3Q7XG4gICAgY29uc29sZS5sb2coZm9yZWNhc3QpO1xuICAgIGFjdGl2ZUNpdHkudGV4dENvbnRlbnQgPSBmb3JlY2FzdC5jaXR5O1xuICAgIGFjdGl2ZUltZy5zcmMgPSBcImh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duL1wiICsgZm9yZWNhc3QuY3VycmVudC53ZWF0aGVyWzBdLmljb24gKyBcIkAyeC5wbmdcIjtcbiAgICBhY3RpdmVXZWF0aGVyLnRleHRDb250ZW50ID0gZm9yZWNhc3QuY3VycmVudC53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuICAgIGxldCBjb252ZXJ0U2NhbGUgPSBudWxsO1xuICAgIGlmICh0ZW1wU2NhbGUgPT09IFwiY1wiKSB7XG4gICAgICAgIGNvbnZlcnRTY2FsZSA9IHRvQ2Vsc2l1cztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnZlcnRTY2FsZSA9IHRvRmFocmVuaGVpdDtcbiAgICB9XG4gICAgYWN0aXZlSGlnaC50ZXh0Q29udGVudCA9IGNvbnZlcnRTY2FsZShmb3JlY2FzdC5kYWlseVswXS50ZW1wLm1heCk7XG4gICAgYWN0aXZlTG93LnRleHRDb250ZW50ID0gY29udmVydFNjYWxlKGZvcmVjYXN0LmRhaWx5WzBdLnRlbXAubWluKTtcbiAgICBhY3RpdmVGZWVscy50ZXh0Q29udGVudCA9IGNvbnZlcnRTY2FsZShmb3JlY2FzdC5jdXJyZW50LmZlZWxzX2xpa2UpO1xuICAgIGFjdGl2ZVBvcC50ZXh0Q29udGVudCA9IGZvcmVjYXN0LmhvdXJseVswXS5wb3AgKiAxMDAgKyBcIiVcIjtcbiAgICBhY3RpdmVIdW1pZGl0eS50ZXh0Q29udGVudCA9IGZvcmVjYXN0LmN1cnJlbnQuaHVtaWRpdHkgKyBcIiVcIjtcbiAgICBhY3RpdmVQcmVzc3VyZS50ZXh0Q29udGVudCA9IGZvcmVjYXN0LmN1cnJlbnQucHJlc3N1cmUgKyBcImhQYVwiO1xuICAgIGFjdGl2ZVdpbmQudGV4dENvbnRlbnQgPSBmb3JlY2FzdC5jdXJyZW50LndpbmRfc3BlZWQgKyBcIm0vc1wiICsgXCIgIChcIiArIE1hdGguZmxvb3IoZm9yZWNhc3QuY3VycmVudC53aW5kX3NwZWVkICogMjIuMzY5NCkgLyAxMCArIFwibWkvaHIpXCI7XG59XG5cblxuIiwibGV0IEFQSV9LRVkgPSBjb25maWcuQVBJX0tFWTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEZvcmVjYXN0KGNpdHkpIHtcbiAgICB0cnkge1xuICAgICAgICAvL05vcm1hbGl6aW5nIGNpdHkgdGV4dDsgaW1wb3J0YW50IGZvciBkaXNwbGF5aW5nIGNpdHkgbmFtZSBvbiB3ZWJzaXRlXG4gICAgICAgIGNpdHkgPSBjaXR5LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNpdHkgPSBjaXR5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgY2l0eS5zbGljZSgxKTtcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBmZXRjaChcImh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT1cIiArIGNpdHkgKyBcIiZhcHBpZD1cIiArIEFQSV9LRVksIHttb2RlOiBcImNvcnNcIn0pO1xuICAgICAgICBsZXQgd2VhdGhlciA9IGF3YWl0IGRhdGEuanNvbigpO1xuICAgICAgICBsZXQgbGF0ID0gd2VhdGhlci5jb29yZC5sYXQ7XG4gICAgICAgIGxldCBsb24gPSB3ZWF0aGVyLmNvb3JkLmxvbjtcbiAgICAgICAgbGV0IHdlYXRoZXJPYmogPSAgYXdhaXQgZ2V0RnVsbEZvcmVjYXN0KGxhdCwgbG9uKTtcbiAgICAgICAgbGV0IG91dHB1dE9iaiA9IHtcbiAgICAgICAgICAgIGNpdHk6IGNpdHksXG4gICAgICAgICAgICBjdXJyZW50OiB3ZWF0aGVyT2JqLmN1cnJlbnQsXG4gICAgICAgICAgICBkYWlseTogd2VhdGhlck9iai5kYWlseSxcbiAgICAgICAgICAgIGhvdXJseTogd2VhdGhlck9iai5ob3VybHksXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBvdXRwdXRPYmo7XG4gICAgfVxuICAgIGNhdGNoKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0RnVsbEZvcmVjYXN0KGxhdCwgbG9uKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBmZXRjaChcImh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsP2xhdD1cIiArIGxhdCArIFwiJmxvbj1cIiArIGxvbiArIFwiJmV4Y2x1ZGU9bWludXRlbHksYWxlcnRzJmFwcGlkPTI1MmFkZTU3OGIxMDY3MDlkOThkYjIxNGQwNGM1MDRkXCIsIHttb2RlOiBcImNvcnNcIn0pO1xuICAgICAgICBsZXQgd2VhdGhlciA9IGF3YWl0IGRhdGEuanNvbigpO1xuICAgICAgICByZXR1cm4gd2VhdGhlcjtcbiAgICB9XG4gICAgY2F0Y2goZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NhbGUoKSB7XG4gICAgbGV0IHRlbXBTY2FsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVtcFNjYWxlXCIpO1xuICAgIGlmICh0ZW1wU2NhbGUuY2xhc3NMaXN0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICByZXR1cm4gXCJjXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJmXCI7XG4gICAgfVxufVxuXG4vL0Z1bmN0aW9uIGZvciBjb252ZXJ0aW5nIHRoZSBrZWx2aW4gc2NhbGUgcmV0dXJuZWQgZnJvbSBhcGkgY2FsbCB0byBDZWxzaXVzXG5leHBvcnQgZnVuY3Rpb24gdG9DZWxzaXVzKGtlbHZpbikge1xuICAgIHJldHVybiBNYXRoLmZsb29yKChrZWx2aW4gLSAyNzMuMTUpICogMTApIC8gMTA7XG59XG5cbi8vRnVuY3Rpb24gZm9yIGNvbnZlcnRpbmcgdGhlIGtlbHZpbiBzY2FsZSByZXR1cm5lZCBmcm9tIGFwaSBjYWxsIHRvIEZhaHJlbmhlaXRcbmV4cG9ydCBmdW5jdGlvbiB0b0ZhaHJlbmhlaXQoa2VsdmluKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKChrZWx2aW4gLSAyNzMuMTUpKjkvNSArIDMyKSAqIDEwKSAvIDEwIDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN3aXRjaFNjYWxlKCkge1xuICAgIGxldCB0ZW1wU2NhbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlbXBTY2FsZVwiKTtcbiAgICBpZiAodGVtcFNjYWxlLmNsYXNzTGlzdC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgdGVtcFNjYWxlLmNsYXNzTGlzdC5yZW1vdmUoXCJsZWZ0XCIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGVtcFNjYWxlLmNsYXNzTGlzdC5hZGQoXCJsZWZ0XCIpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyB0b0NlbHNpdXMsIHRvRmFocmVuaGVpdCB9IGZyb20gXCIuL2dldFdlYXRoZXIuanNcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbGxXZWVrbHlJbmZvKGZvcmVjYXN0LCB0ZW1wU2NhbGUpIHtcbiAgICBmb3JlY2FzdCA9IGF3YWl0IGZvcmVjYXN0O1xuICAgIGxldCBjb252ZXJ0U2NhbGUgPSBudWxsO1xuICAgIGlmICh0ZW1wU2NhbGUgPT09IFwiY1wiKSB7XG4gICAgICAgIGNvbnZlcnRTY2FsZSA9IHRvQ2Vsc2l1cztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnZlcnRTY2FsZSA9IHRvRmFocmVuaGVpdDtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCA4OyBpKyspIHsgLy9Mb29wIHN0YXJ0cyBhdCAxIGluIG9yZGVyIHRvIHNraXAgdGhlIGN1cnJlbnQgZGF5OyBnb2VzIHVwIHRvIDcgZm9yIGEgZnVsbCB3ZWVrIGZvcmVjYXN0XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2Vla2x5XCIgKyBpKS50ZXh0Q29udGVudCA9IGdldERheShmb3JlY2FzdC5kYWlseVtpXS5kdCk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2Vla2x5XCIgKyBpKS5zdHlsZS5mb250U2l6ZSA9IFwiMzBweFwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlZWtseUltZ1wiICsgaSkuc3JjID0gXCJodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi9cIiArIGZvcmVjYXN0LmRhaWx5W2ldLndlYXRoZXJbMF0uaWNvbiArIFwiQDJ4LnBuZ1wiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlZWtseUhpZ2hcIiArIGkpLnRleHRDb250ZW50ID0gXCJIOiBcIiArIGNvbnZlcnRTY2FsZShmb3JlY2FzdC5kYWlseVtpXS50ZW1wLm1heCk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2Vla2x5SGlnaFwiICsgaSkuc3R5bGUuZm9udFNpemUgPSBcIjMwcHhcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWVrbHlMb3dcIiArIGkpLnRleHRDb250ZW50ID0gXCJMOiBcIiArIGNvbnZlcnRTY2FsZShmb3JlY2FzdC5kYWlseVtpXS50ZW1wLm1pbik7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2Vla2x5TG93XCIgKyBpKS5zdHlsZS5mb250U2l6ZSA9IFwiMjBweFwiO1xuICAgIH1cbn1cblxuLy9GdW5jdGlvbiBmb3IgZ2V0dGluZyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF5IGZyb20gYSBVVEMgXG5mdW5jdGlvbiBnZXREYXkoc2Vjb25kcykge1xuICAgIGxldCBkYXRlID0gbmV3IERhdGUoMCk7XG4gICAgZGF0ZS5zZXRVVENTZWNvbmRzKHNlY29uZHMpO1xuICAgIGxldCBkYXkgPSBkYXRlLmdldERheSgpO1xuICAgIGlmIChkYXkgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFwiU3VuXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRheSA9PT0gMSkge1xuICAgICAgICByZXR1cm4gXCJNb25cIjtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGF5ID09PSAyKSB7XG4gICAgICAgIHJldHVybiBcIlR1ZXNcIjtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGF5ID09PSAzKSB7XG4gICAgICAgIHJldHVybiBcIldlZFwiO1xuICAgIH1cbiAgICBlbHNlIGlmIChkYXkgPT09IDQpIHtcbiAgICAgICAgcmV0dXJuIFwiVGh1clwiO1xuICAgIH1cbiAgICBlbHNlIGlmIChkYXkgPT09IDUpIHtcbiAgICAgICAgcmV0dXJuIFwiRnJpXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJTYXRcIjtcbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnZXRGb3JlY2FzdCwgc3dpdGNoU2NhbGUsIGdldFNjYWxlIH0gZnJvbSBcIi4vZ2V0V2VhdGhlci5qc1wiO1xuaW1wb3J0IHsgZmlsbEFjdGl2ZUluZm8gfSBmcm9tIFwiLi9jdXJyZW50V2VhdGhlci5qc1wiXG5pbXBvcnQgeyBmaWxsV2Vla2x5SW5mbyB9IGZyb20gXCIuL3dlZWtseVdlYXRoZXIuanNcIlxuaW1wb3J0IGdldEJhY2tncm91bmQgZnJvbSBcIi4vYmFja2dyb3VuZC5qc1wiXG5cbmxldCBmb3JlY2FzdCA9IGdldEZvcmVjYXN0KFwib3JsYW5kb1wiKTtcbmxvYWRQYWdlKCk7XG5cblxuXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVtcFNjYWxlRGl2XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzd2l0Y2hTY2FsZSk7IC8vTGlzdGVuZXIgZm9yIG1vdmluZyB0aGUgdGVtcFNjYWxlIHNsaWRlclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wU2NhbGVEaXZcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIGdldEJhY2tncm91bmQoKTtcbiAgICBmaWxsQWN0aXZlSW5mbyhmb3JlY2FzdCwgZ2V0U2NhbGUoKSk7XG59KTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCBmdW5jdGlvbihlKSB7XG4gICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgbG9hZFBhZ2UoKTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hcIikudmFsdWUgPSBcIlwiO1xuICAgIH1cbn0pO1xuXG5cblxuLy9XcmFwcGVyIGZ1bmN0aW9uIHRvIGxvYWQgZXZlcnl0aGluZyBvbiB0aGUgcGFnZTsgSGVscHMgd2l0aCBjaGFuZ2luZyB0ZW1wIFNjYWxlXG5mdW5jdGlvbiBsb2FkUGFnZSgpIHtcbiAgICBsZXQgY2l0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoXCIpLnZhbHVlO1xuICAgIGlmIChjaXR5ID09PSBcIlwiKSB7XG4gICAgICAgIGNpdHkgPSBcIm9ybGFuZG9cIlxuICAgIH1cbiAgICBmb3JlY2FzdCA9IGdldEZvcmVjYXN0KGNpdHkpO1xuICAgIGdldEJhY2tncm91bmQoKTtcbiAgICBmaWxsQWN0aXZlSW5mbyhmb3JlY2FzdCwgZ2V0U2NhbGUoKSk7XG4gICAgZmlsbFdlZWtseUluZm8oZm9yZWNhc3QsIGdldFNjYWxlKCkpO1xufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==