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


async function fillyDailyInfo(forecast, tempScale) {
    //Cache the DOM element needed
    let dailyForecast = document.querySelector("#dailyForecast")
    forecast = await forecast;
    let convertScale = null;
    if (tempScale === "c") {
        convertScale = _getWeather_js__WEBPACK_IMPORTED_MODULE_0__.toCelsius;
    }
    else {
        convertScale = _getWeather_js__WEBPACK_IMPORTED_MODULE_0__.toFahrenheit;
    }
    for (let i = 0; i < 25; i++) { //25 because I want to have 25 different hours; from now to same time tomorrow
        let newHour = document.createElement("div");
        newHour.classList.add("dailyDiv");
        let newTime = document.createElement("p");
        newTime.textContent = getHour(forecast.hourly[i].dt);
        newTime.style.fontSize = "30px";
        let newImg = document.createElement("img");
        newImg.src = "http://openweathermap.org/img/wn/" + forecast.hourly[i].weather[0].icon + "@2x.png";
        newImg.style.transform = "scale(.8)";
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
    removeAllChildren(dailyForecast);
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
async function removeAllChildren(dailyForecast) {
    dailyForecast = await dailyForecast;
    dailyForecast.childNodes.forEach(function(child) {
        console.log(child);
        child.remove();
    })
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






let forecast = (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getForecast)("orlando");
loadPage();




document.querySelector("#tempScaleDiv").addEventListener("click", _getWeather_js__WEBPACK_IMPORTED_MODULE_0__.switchScale); //Listener for moving the tempScale slider
document.querySelector("#tempScaleDiv").addEventListener("click", function() {
    (0,_background_js__WEBPACK_IMPORTED_MODULE_3__.default)();
    (0,_currentWeather_js__WEBPACK_IMPORTED_MODULE_1__.fillActiveInfo)(forecast, (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getScale)());
    (0,_weeklyWeather_js__WEBPACK_IMPORTED_MODULE_2__.fillWeeklyInfo)(forecast, (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getScale)());
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
    (0,_dailyWeather_js__WEBPACK_IMPORTED_MODULE_4__.fillyDailyInfo)(forecast, (0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getScale)());
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTnFFO0FBQ2pCO0FBQ0Q7QUFDUjtBQUNROztBQUVuRCxlQUFlLDJEQUFXO0FBQzFCOzs7OztBQUtBLGtFQUFrRSx1REFBVyxHQUFHO0FBQ2hGO0FBQ0EsSUFBSSx1REFBYTtBQUNqQixJQUFJLGtFQUFjLFdBQVcsd0RBQVE7QUFDckMsSUFBSSxpRUFBYyxXQUFXLHdEQUFRO0FBQ3JDLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlELG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSwyREFBVztBQUMxQixJQUFJLHVEQUFhO0FBQ2pCLElBQUksa0VBQWMsV0FBVyx3REFBUTtBQUNyQyxJQUFJLGlFQUFjLFdBQVcsd0RBQVE7QUFDckMsSUFBSSxnRUFBYyxXQUFXLHdEQUFRO0FBQ3JDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9iYWNrZ3JvdW5kLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2N1cnJlbnRXZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2RhaWx5V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9nZXRXZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3dlZWtseVdlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL0NhY2hlIERPTVxubGV0IHN1bnJpc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1bnJpc2VcIik7XG5sZXQgbm9vbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbm9vblwiKTtcbmxldCBzdW5zZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3N1bnNldFwiKTtcbmxldCBuaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbmlnaHRcIik7XG5cblxuLy9GdW5jdGlvbiB0byBkZXRlcm1pbmUgdGltZSBvZiBkYXkgYW5kIHNob3cgY29yZXNwb25kaW5nIGJhY2tncm91bmRcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICAgIGhpZGVBTEwoKTtcbiAgICBsZXQgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGxldCBjdXJyZW50SG91ciA9IGN1cnJlbnREYXRlLmdldEhvdXJzKCk7XG5cblxuICAgIGlmIChjdXJyZW50SG91ciA+PSA1ICYmIGN1cnJlbnRIb3VyIDwgMTIpIHtcbiAgICAgICAgc2hvdyhzdW5yaXNlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY3VycmVudEhvdXIgPj0gMTIgJiYgY3VycmVudEhvdXIgPCAxNykge1xuICAgICAgICBzaG93KG5vb24pO1xuICAgIH1cbiAgICBlbHNlIGlmIChjdXJyZW50SG91ciA+PSAxNyAmJiBjdXJyZW50SG91ciA8IDIwKSB7XG4gICAgICAgIHNob3coc3Vuc2V0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHNob3cobmlnaHQpO1xuICAgIH1cblxufVxuXG4vL0Z1bmN0aW9uIGZvciBoaWRpbmcgYWxsIGJhY2tncm91bmQgaW1nc1xuZnVuY3Rpb24gaGlkZUFMTCgpIHtcbiAgICBzdW5yaXNlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBub29uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBzdW5zZXQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIG5pZ2h0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbn1cblxuLy9GdW5jdGlvbiBmb3IgZGlzcGxheWluZyBvbmx5IG9uZSBiYWNrZ3JvdW5kXG5mdW5jdGlvbiBzaG93KGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG59IiwiaW1wb3J0IHsgdG9DZWxzaXVzLCB0b0ZhaHJlbmhlaXQgfSBmcm9tIFwiLi9nZXRXZWF0aGVyLmpzXCI7XG5cbi8vQ2FjaGUgRE9NXG5sZXQgYWN0aXZlQ2l0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlQ2l0eVwiKTsgLy9UaXRsZSBmb3IgdGhlIGNpdHkgbmFtZVxubGV0IGFjdGl2ZUltZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlSW1nXCIpOyAvL0ltZyBmb3Igd2VhdGhlciBjb25kaXRpb25zIChpLmUuIGNsb3VkeSwgcmFpbnksIGV0Yy4pXG5sZXQgYWN0aXZlV2VhdGhlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlV2VhdGhlclwiKTsgLy88cD4gZWxlbWVudCBmb3IgdGhlIHdlYXRoZXIgZGVzY3JpcHRpb25cbmxldCBhY3RpdmVIaWdoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3RpdmVIaWdoXCIpOyAvL0hpZ2ggdGVtcFxubGV0IGFjdGl2ZUxvdyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlTG93XCIpOyAvL0xvdyB0ZW1wXG5sZXQgYWN0aXZlRmVlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZUZlZWxzXCIpOyAvL0ZlbGxzIGxpa2VcbmxldCBhY3RpdmVQb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZVBvcFwiKTsgLy9Qcm9iYWJpbGl0eSBvZiBwZXJjaXBpdGF0aW9uXG5sZXQgYWN0aXZlSHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZUh1bWlkaXR5XCIpOyAvL0h1bWlkaXR5XG5sZXQgYWN0aXZlUHJlc3N1cmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZVByZXNzdXJlXCIpOyAvL1ByZXNzdXJlXG5sZXQgYWN0aXZlV2luZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlV2luZFwiKTsgLy9XaW5kIHNwZWVkXG5cblxuLy9GdW5jdGlvbiBmb3IgZmlsbGluZyBpbiB0aGUgaW5mbyBmb3IgdGhlIGFjdGl2ZSB3ZWF0aGVyIGRpdlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbGxBY3RpdmVJbmZvKGZvcmVjYXN0LCB0ZW1wU2NhbGUpIHsgLy9JIHdhbnQgdG8gcmVmYWN0b3IgdGhpcyBmdW5jdGlvbiB0byBiZSBhIHdyYXBwZXIgZnVuY3Rpb24gdGhhdCBjYW4gZGV0ZXJtaW5lIHdoaWNoIGZ1bmN0aW9ucyB0byB1c2UgYmFzZWQgb24gcGFyYW1zXG4gICAgZm9yZWNhc3QgPSBhd2FpdCBmb3JlY2FzdDtcbiAgICBjb25zb2xlLmxvZyhmb3JlY2FzdCk7XG4gICAgYWN0aXZlQ2l0eS50ZXh0Q29udGVudCA9IGZvcmVjYXN0LmNpdHk7XG4gICAgYWN0aXZlSW1nLnNyYyA9IFwiaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vXCIgKyBmb3JlY2FzdC5jdXJyZW50LndlYXRoZXJbMF0uaWNvbiArIFwiQDJ4LnBuZ1wiO1xuICAgIGFjdGl2ZVdlYXRoZXIudGV4dENvbnRlbnQgPSBmb3JlY2FzdC5jdXJyZW50LndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG4gICAgbGV0IGNvbnZlcnRTY2FsZSA9IG51bGw7XG4gICAgaWYgKHRlbXBTY2FsZSA9PT0gXCJjXCIpIHtcbiAgICAgICAgY29udmVydFNjYWxlID0gdG9DZWxzaXVzO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29udmVydFNjYWxlID0gdG9GYWhyZW5oZWl0O1xuICAgIH1cbiAgICBhY3RpdmVIaWdoLnRleHRDb250ZW50ID0gY29udmVydFNjYWxlKGZvcmVjYXN0LmRhaWx5WzBdLnRlbXAubWF4KSArIFwiXFx4QjBcIjtcbiAgICBhY3RpdmVMb3cudGV4dENvbnRlbnQgPSBjb252ZXJ0U2NhbGUoZm9yZWNhc3QuZGFpbHlbMF0udGVtcC5taW4pICsgXCJcXHhCMFwiO1xuICAgIGFjdGl2ZUZlZWxzLnRleHRDb250ZW50ID0gY29udmVydFNjYWxlKGZvcmVjYXN0LmN1cnJlbnQuZmVlbHNfbGlrZSkgKyBcIlxceEIwXCI7XG4gICAgYWN0aXZlUG9wLnRleHRDb250ZW50ID0gZm9yZWNhc3QuaG91cmx5WzBdLnBvcCAqIDEwMCArIFwiJVwiO1xuICAgIGFjdGl2ZUh1bWlkaXR5LnRleHRDb250ZW50ID0gZm9yZWNhc3QuY3VycmVudC5odW1pZGl0eSArIFwiJVwiO1xuICAgIGFjdGl2ZVByZXNzdXJlLnRleHRDb250ZW50ID0gZm9yZWNhc3QuY3VycmVudC5wcmVzc3VyZSArIFwiaFBhXCI7XG4gICAgYWN0aXZlV2luZC50ZXh0Q29udGVudCA9IGZvcmVjYXN0LmN1cnJlbnQud2luZF9zcGVlZCArIFwibS9zXCIgKyBcIiAgKFwiICsgTWF0aC5mbG9vcihmb3JlY2FzdC5jdXJyZW50LndpbmRfc3BlZWQgKiAyMi4zNjk0KSAvIDEwICsgXCJtaS9ocilcIjtcbn1cblxuXG4iLCJpbXBvcnQgeyB0b0NlbHNpdXMsIHRvRmFocmVuaGVpdCB9IGZyb20gXCIuL2dldFdlYXRoZXIuanNcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbGx5RGFpbHlJbmZvKGZvcmVjYXN0LCB0ZW1wU2NhbGUpIHtcbiAgICAvL0NhY2hlIHRoZSBET00gZWxlbWVudCBuZWVkZWRcbiAgICBsZXQgZGFpbHlGb3JlY2FzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGFpbHlGb3JlY2FzdFwiKVxuICAgIGZvcmVjYXN0ID0gYXdhaXQgZm9yZWNhc3Q7XG4gICAgbGV0IGNvbnZlcnRTY2FsZSA9IG51bGw7XG4gICAgaWYgKHRlbXBTY2FsZSA9PT0gXCJjXCIpIHtcbiAgICAgICAgY29udmVydFNjYWxlID0gdG9DZWxzaXVzO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29udmVydFNjYWxlID0gdG9GYWhyZW5oZWl0O1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI1OyBpKyspIHsgLy8yNSBiZWNhdXNlIEkgd2FudCB0byBoYXZlIDI1IGRpZmZlcmVudCBob3VyczsgZnJvbSBub3cgdG8gc2FtZSB0aW1lIHRvbW9ycm93XG4gICAgICAgIGxldCBuZXdIb3VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbmV3SG91ci5jbGFzc0xpc3QuYWRkKFwiZGFpbHlEaXZcIik7XG4gICAgICAgIGxldCBuZXdUaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIG5ld1RpbWUudGV4dENvbnRlbnQgPSBnZXRIb3VyKGZvcmVjYXN0LmhvdXJseVtpXS5kdCk7XG4gICAgICAgIG5ld1RpbWUuc3R5bGUuZm9udFNpemUgPSBcIjMwcHhcIjtcbiAgICAgICAgbGV0IG5ld0ltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIG5ld0ltZy5zcmMgPSBcImh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duL1wiICsgZm9yZWNhc3QuaG91cmx5W2ldLndlYXRoZXJbMF0uaWNvbiArIFwiQDJ4LnBuZ1wiO1xuICAgICAgICBuZXdJbWcuc3R5bGUudHJhbnNmb3JtID0gXCJzY2FsZSguOClcIjtcbiAgICAgICAgbGV0IG5ld1BvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBuZXdQb3AudGV4dENvbnRlbnQgPSBcIlBlcmNpcGl0YXRpb246IFwiICsgTWF0aC5mbG9vcihmb3JlY2FzdC5ob3VybHlbaV0ucG9wICogMTAwMDApIC8gMTAwICsgXCIlXCI7XG4gICAgICAgIG5ld1BvcC5zdHlsZS5mb250U2l6ZSA9IFwiMjBweFwiO1xuICAgICAgICBsZXQgbmV3VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIG5ld1RlbXAudGV4dENvbnRlbnQgPSBjb252ZXJ0U2NhbGUoZm9yZWNhc3QuaG91cmx5W2ldLnRlbXApICsgXCJcXHhCMFwiO1xuICAgICAgICBuZXdUZW1wLnN0eWxlLmZvbnRTaXplID0gXCIyNXB4XCI7XG4gICAgICAgIFxuICAgICAgICBuZXdIb3VyLmFwcGVuZENoaWxkKG5ld1RpbWUpO1xuICAgICAgICBuZXdIb3VyLmFwcGVuZENoaWxkKG5ld0ltZyk7XG4gICAgICAgIG5ld0hvdXIuYXBwZW5kQ2hpbGQobmV3VGVtcCk7XG4gICAgICAgIG5ld0hvdXIuYXBwZW5kQ2hpbGQobmV3UG9wKTtcbiAgICAgICAgXG4gICAgICAgIGRhaWx5Rm9yZWNhc3QuYXBwZW5kQ2hpbGQobmV3SG91cik7XG4gICAgfVxuICAgIHJlbW92ZUFsbENoaWxkcmVuKGRhaWx5Rm9yZWNhc3QpO1xufVxuXG4vL0Z1bmN0aW9uIGZvciBnZXR0aW5nIHRoZSB0aW1lIG9mIGRheSBmcm9tIHV0YyBzZWNvbmRzXG5mdW5jdGlvbiBnZXRIb3VyKHNlY29uZHMpIHtcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKDApO1xuICAgIGRhdGUuc2V0VVRDU2Vjb25kcyhzZWNvbmRzKTtcbiAgICBsZXQgaG91ciA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICBpZiAoaG91ciA+IDEyKSB7XG4gICAgICAgIGhvdXIgPSBob3VyIC0gMTIgKyBcInBtXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGhvdXIgPT0gMCkge1xuICAgICAgICBob3VyID0gXCIxMmFtXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGhvdXIgPT0gMTIpIHtcbiAgICAgICAgaG91ciA9IFwiMTJwbVwiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaG91ciA9IGhvdXIgKyBcImFtXCJcbiAgICB9XG4gICAgcmV0dXJuIGhvdXI7XG59XG5cbi8vRnVuY3Rpb24gdG8gcmVtb3ZlIGFsbCBjaGlsZCBFbGVtZW50cyBmcm9tIGRhaWx5Rm9yZWNhc3Q7IE5lZWRlZCB0byByZW1ha2UgbmV3IGVsZW1lbnRzXG5hc3luYyBmdW5jdGlvbiByZW1vdmVBbGxDaGlsZHJlbihkYWlseUZvcmVjYXN0KSB7XG4gICAgZGFpbHlGb3JlY2FzdCA9IGF3YWl0IGRhaWx5Rm9yZWNhc3Q7XG4gICAgZGFpbHlGb3JlY2FzdC5jaGlsZE5vZGVzLmZvckVhY2goZnVuY3Rpb24oY2hpbGQpIHtcbiAgICAgICAgY29uc29sZS5sb2coY2hpbGQpO1xuICAgICAgICBjaGlsZC5yZW1vdmUoKTtcbiAgICB9KVxufSIsImxldCBBUElfS0VZID0gY29uZmlnLkFQSV9LRVk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRGb3JlY2FzdChjaXR5KSB7XG4gICAgdHJ5IHtcbiAgICAgICAgLy9Ob3JtYWxpemluZyBjaXR5IHRleHQ7IGltcG9ydGFudCBmb3IgZGlzcGxheWluZyBjaXR5IG5hbWUgb24gd2Vic2l0ZVxuICAgICAgICBjaXR5ID0gY2l0eS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBjaXR5ID0gY2l0eS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGNpdHkuc2xpY2UoMSk7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgZmV0Y2goXCJodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9XCIgKyBjaXR5ICsgXCImYXBwaWQ9XCIgKyBBUElfS0VZLCB7bW9kZTogXCJjb3JzXCJ9KTtcbiAgICAgICAgbGV0IHdlYXRoZXIgPSBhd2FpdCBkYXRhLmpzb24oKTtcbiAgICAgICAgbGV0IGxhdCA9IHdlYXRoZXIuY29vcmQubGF0O1xuICAgICAgICBsZXQgbG9uID0gd2VhdGhlci5jb29yZC5sb247XG4gICAgICAgIGxldCB3ZWF0aGVyT2JqID0gIGF3YWl0IGdldEZ1bGxGb3JlY2FzdChsYXQsIGxvbik7XG4gICAgICAgIGxldCBvdXRwdXRPYmogPSB7XG4gICAgICAgICAgICBjaXR5OiBjaXR5LFxuICAgICAgICAgICAgY3VycmVudDogd2VhdGhlck9iai5jdXJyZW50LFxuICAgICAgICAgICAgZGFpbHk6IHdlYXRoZXJPYmouZGFpbHksXG4gICAgICAgICAgICBob3VybHk6IHdlYXRoZXJPYmouaG91cmx5LFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gb3V0cHV0T2JqO1xuICAgIH1cbiAgICBjYXRjaChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEZ1bGxGb3JlY2FzdChsYXQsIGxvbikge1xuICAgIHRyeSB7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgZmV0Y2goXCJodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvb25lY2FsbD9sYXQ9XCIgKyBsYXQgKyBcIiZsb249XCIgKyBsb24gKyBcIiZleGNsdWRlPW1pbnV0ZWx5LGFsZXJ0cyZhcHBpZD0yNTJhZGU1NzhiMTA2NzA5ZDk4ZGIyMTRkMDRjNTA0ZFwiLCB7bW9kZTogXCJjb3JzXCJ9KTtcbiAgICAgICAgbGV0IHdlYXRoZXIgPSBhd2FpdCBkYXRhLmpzb24oKTtcbiAgICAgICAgcmV0dXJuIHdlYXRoZXI7XG4gICAgfVxuICAgIGNhdGNoKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjYWxlKCkge1xuICAgIGxldCB0ZW1wU2NhbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlbXBTY2FsZVwiKTtcbiAgICBpZiAodGVtcFNjYWxlLmNsYXNzTGlzdC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgcmV0dXJuIFwiY1wiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwiZlwiO1xuICAgIH1cbn1cblxuLy9GdW5jdGlvbiBmb3IgY29udmVydGluZyB0aGUga2VsdmluIHNjYWxlIHJldHVybmVkIGZyb20gYXBpIGNhbGwgdG8gQ2Vsc2l1c1xuZXhwb3J0IGZ1bmN0aW9uIHRvQ2Vsc2l1cyhrZWx2aW4pIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcigoa2VsdmluIC0gMjczLjE1KSAqIDEwKSAvIDEwO1xufVxuXG4vL0Z1bmN0aW9uIGZvciBjb252ZXJ0aW5nIHRoZSBrZWx2aW4gc2NhbGUgcmV0dXJuZWQgZnJvbSBhcGkgY2FsbCB0byBGYWhyZW5oZWl0XG5leHBvcnQgZnVuY3Rpb24gdG9GYWhyZW5oZWl0KGtlbHZpbikge1xuICAgIHJldHVybiBNYXRoLmZsb29yKCgoa2VsdmluIC0gMjczLjE1KSo5LzUgKyAzMikgKiAxMCkgLyAxMCA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzd2l0Y2hTY2FsZSgpIHtcbiAgICBsZXQgdGVtcFNjYWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wU2NhbGVcIik7XG4gICAgaWYgKHRlbXBTY2FsZS5jbGFzc0xpc3QubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHRlbXBTY2FsZS5jbGFzc0xpc3QucmVtb3ZlKFwibGVmdFwiKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRlbXBTY2FsZS5jbGFzc0xpc3QuYWRkKFwibGVmdFwiKTtcbiAgICB9XG59IiwiaW1wb3J0IHsgdG9DZWxzaXVzLCB0b0ZhaHJlbmhlaXQgfSBmcm9tIFwiLi9nZXRXZWF0aGVyLmpzXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxsV2Vla2x5SW5mbyhmb3JlY2FzdCwgdGVtcFNjYWxlKSB7XG4gICAgZm9yZWNhc3QgPSBhd2FpdCBmb3JlY2FzdDtcbiAgICBsZXQgY29udmVydFNjYWxlID0gbnVsbDtcbiAgICBpZiAodGVtcFNjYWxlID09PSBcImNcIikge1xuICAgICAgICBjb252ZXJ0U2NhbGUgPSB0b0NlbHNpdXM7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb252ZXJ0U2NhbGUgPSB0b0ZhaHJlbmhlaXQ7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgODsgaSsrKSB7IC8vTG9vcCBzdGFydHMgYXQgMSBpbiBvcmRlciB0byBza2lwIHRoZSBjdXJyZW50IGRheTsgZ29lcyB1cCB0byA3IGZvciBhIGZ1bGwgd2VlayBmb3JlY2FzdFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlZWtseVwiICsgaSkudGV4dENvbnRlbnQgPSBnZXREYXkoZm9yZWNhc3QuZGFpbHlbaV0uZHQpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlZWtseVwiICsgaSkuc3R5bGUuZm9udFNpemUgPSBcIjMwcHhcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWVrbHlJbWdcIiArIGkpLnNyYyA9IFwiaHR0cDovL29wZW53ZWF0aGVybWFwLm9yZy9pbWcvd24vXCIgKyBmb3JlY2FzdC5kYWlseVtpXS53ZWF0aGVyWzBdLmljb24gKyBcIkAyeC5wbmdcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWVrbHlQb3BcIiArIGkpLnRleHRDb250ZW50ID0gXCJQZXJjaXBpdGF0aW9uOiBcIiArIChmb3JlY2FzdC5kYWlseVtpXS5wb3AgKiAxMDApICsgXCIlXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2Vla2x5UG9wXCIgKyBpKS5zdHlsZS5mb250U2l6ZSA9IFwiMThweFwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlZWtseUhpZ2hcIiArIGkpLnRleHRDb250ZW50ID0gXCJIOiBcIiArIGNvbnZlcnRTY2FsZShmb3JlY2FzdC5kYWlseVtpXS50ZW1wLm1heCkgKyBcIlxceEIwXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2Vla2x5SGlnaFwiICsgaSkuc3R5bGUuZm9udFNpemUgPSBcIjMwcHhcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWVrbHlMb3dcIiArIGkpLnRleHRDb250ZW50ID0gXCJMOiBcIiArIGNvbnZlcnRTY2FsZShmb3JlY2FzdC5kYWlseVtpXS50ZW1wLm1pbikgKyBcIlxceEIwXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2Vla2x5TG93XCIgKyBpKS5zdHlsZS5mb250U2l6ZSA9IFwiMjBweFwiO1xuICAgIH1cbn1cblxuLy9GdW5jdGlvbiBmb3IgZ2V0dGluZyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF5IGZyb20gYSBVVEMgXG5mdW5jdGlvbiBnZXREYXkoc2Vjb25kcykge1xuICAgIGxldCBkYXRlID0gbmV3IERhdGUoMCk7XG4gICAgZGF0ZS5zZXRVVENTZWNvbmRzKHNlY29uZHMpO1xuICAgIGxldCBkYXkgPSBkYXRlLmdldERheSgpO1xuICAgIGlmIChkYXkgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIFwiU3VuXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRheSA9PT0gMSkge1xuICAgICAgICByZXR1cm4gXCJNb25cIjtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGF5ID09PSAyKSB7XG4gICAgICAgIHJldHVybiBcIlR1ZXNcIjtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGF5ID09PSAzKSB7XG4gICAgICAgIHJldHVybiBcIldlZFwiO1xuICAgIH1cbiAgICBlbHNlIGlmIChkYXkgPT09IDQpIHtcbiAgICAgICAgcmV0dXJuIFwiVGh1clwiO1xuICAgIH1cbiAgICBlbHNlIGlmIChkYXkgPT09IDUpIHtcbiAgICAgICAgcmV0dXJuIFwiRnJpXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJTYXRcIjtcbiAgICB9XG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBnZXRGb3JlY2FzdCwgc3dpdGNoU2NhbGUsIGdldFNjYWxlIH0gZnJvbSBcIi4vZ2V0V2VhdGhlci5qc1wiO1xuaW1wb3J0IHsgZmlsbEFjdGl2ZUluZm8gfSBmcm9tIFwiLi9jdXJyZW50V2VhdGhlci5qc1wiXG5pbXBvcnQgeyBmaWxsV2Vla2x5SW5mbyB9IGZyb20gXCIuL3dlZWtseVdlYXRoZXIuanNcIlxuaW1wb3J0IGdldEJhY2tncm91bmQgZnJvbSBcIi4vYmFja2dyb3VuZC5qc1wiXG5pbXBvcnQgeyBmaWxseURhaWx5SW5mbyB9IGZyb20gXCIuL2RhaWx5V2VhdGhlci5qc1wiO1xuXG5sZXQgZm9yZWNhc3QgPSBnZXRGb3JlY2FzdChcIm9ybGFuZG9cIik7XG5sb2FkUGFnZSgpO1xuXG5cblxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlbXBTY2FsZURpdlwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3dpdGNoU2NhbGUpOyAvL0xpc3RlbmVyIGZvciBtb3ZpbmcgdGhlIHRlbXBTY2FsZSBzbGlkZXJcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVtcFNjYWxlRGl2XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICBnZXRCYWNrZ3JvdW5kKCk7XG4gICAgZmlsbEFjdGl2ZUluZm8oZm9yZWNhc3QsIGdldFNjYWxlKCkpO1xuICAgIGZpbGxXZWVrbHlJbmZvKGZvcmVjYXN0LCBnZXRTY2FsZSgpKTtcbn0pO1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hcIikuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICBsb2FkUGFnZSgpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaFwiKS52YWx1ZSA9IFwiXCI7XG4gICAgfVxufSk7XG5cblxuXG4vL1dyYXBwZXIgZnVuY3Rpb24gdG8gbG9hZCBldmVyeXRoaW5nIG9uIHRoZSBwYWdlOyBIZWxwcyB3aXRoIGNoYW5naW5nIHRlbXAgU2NhbGVcbmZ1bmN0aW9uIGxvYWRQYWdlKCkge1xuICAgIGxldCBjaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hcIikudmFsdWU7XG4gICAgaWYgKGNpdHkgPT09IFwiXCIpIHtcbiAgICAgICAgY2l0eSA9IFwib3JsYW5kb1wiXG4gICAgfVxuICAgIGZvcmVjYXN0ID0gZ2V0Rm9yZWNhc3QoY2l0eSk7XG4gICAgZ2V0QmFja2dyb3VuZCgpO1xuICAgIGZpbGxBY3RpdmVJbmZvKGZvcmVjYXN0LCBnZXRTY2FsZSgpKTtcbiAgICBmaWxsV2Vla2x5SW5mbyhmb3JlY2FzdCwgZ2V0U2NhbGUoKSk7XG4gICAgZmlsbHlEYWlseUluZm8oZm9yZWNhc3QsIGdldFNjYWxlKCkpO1xufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==