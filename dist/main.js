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
        let data = await fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=252ade578b106709d98db214d04c504d", {mode: "cors"});
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ05xRTtBQUNqQjtBQUNEO0FBQ1I7QUFDUTs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBLGVBQWUsMkRBQVc7QUFDMUI7Ozs7O0FBS0Esa0VBQWtFLHVEQUFXLEdBQUcsNENBQTRDO0FBQzVIO0FBQ0E7QUFDQTtBQUNBLElBQUksdURBQWE7QUFDakIsSUFBSSxrRUFBYyxXQUFXLHdEQUFRO0FBQ3JDLElBQUksaUVBQWMsV0FBVyx3REFBUTtBQUNyQyxJQUFJLGdFQUFjLFdBQVcsd0RBQVE7QUFDckMsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlELG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJEQUFXO0FBQ2hDO0FBQ0E7QUFDQSxtQkFBbUIsMkRBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHVEQUFhO0FBQ2pCLFVBQVUsa0VBQWMsV0FBVyx3REFBUTtBQUMzQyxVQUFVLGlFQUFjLFdBQVcsd0RBQVE7QUFDM0MsVUFBVSxnRUFBYyxXQUFXLHdEQUFRO0FBQzNDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jdXJyZW50V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kYWlseVdlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZ2V0V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy93ZWVrbHlXZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9DYWNoZSBET01cbmxldCBzdW5yaXNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdW5yaXNlXCIpO1xubGV0IG5vb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25vb25cIik7XG5sZXQgc3Vuc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdW5zZXRcIik7XG5sZXQgbmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25pZ2h0XCIpO1xuXG5cbi8vRnVuY3Rpb24gdG8gZGV0ZXJtaW5lIHRpbWUgb2YgZGF5IGFuZCBzaG93IGNvcmVzcG9uZGluZyBiYWNrZ3JvdW5kXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgICBoaWRlQUxMKCk7XG4gICAgbGV0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcbiAgICBsZXQgY3VycmVudEhvdXIgPSBjdXJyZW50RGF0ZS5nZXRIb3VycygpO1xuXG5cbiAgICBpZiAoY3VycmVudEhvdXIgPj0gNSAmJiBjdXJyZW50SG91ciA8IDEyKSB7XG4gICAgICAgIHNob3coc3VucmlzZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGN1cnJlbnRIb3VyID49IDEyICYmIGN1cnJlbnRIb3VyIDwgMTcpIHtcbiAgICAgICAgc2hvdyhub29uKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY3VycmVudEhvdXIgPj0gMTcgJiYgY3VycmVudEhvdXIgPCAyMCkge1xuICAgICAgICBzaG93KHN1bnNldCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzaG93KG5pZ2h0KTtcbiAgICB9XG5cbn1cblxuLy9GdW5jdGlvbiBmb3IgaGlkaW5nIGFsbCBiYWNrZ3JvdW5kIGltZ3NcbmZ1bmN0aW9uIGhpZGVBTEwoKSB7XG4gICAgc3VucmlzZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgbm9vbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgc3Vuc2V0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBuaWdodC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59XG5cbi8vRnVuY3Rpb24gZm9yIGRpc3BsYXlpbmcgb25seSBvbmUgYmFja2dyb3VuZFxuZnVuY3Rpb24gc2hvdyhlbGVtZW50KSB7XG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xufSIsImltcG9ydCB7IHRvQ2Vsc2l1cywgdG9GYWhyZW5oZWl0IH0gZnJvbSBcIi4vZ2V0V2VhdGhlci5qc1wiO1xuXG4vL0NhY2hlIERPTVxubGV0IGFjdGl2ZUNpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZUNpdHlcIik7IC8vVGl0bGUgZm9yIHRoZSBjaXR5IG5hbWVcbmxldCBhY3RpdmVJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZUltZ1wiKTsgLy9JbWcgZm9yIHdlYXRoZXIgY29uZGl0aW9ucyAoaS5lLiBjbG91ZHksIHJhaW55LCBldGMuKVxubGV0IGFjdGl2ZVdlYXRoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZVdlYXRoZXJcIik7IC8vPHA+IGVsZW1lbnQgZm9yIHRoZSB3ZWF0aGVyIGRlc2NyaXB0aW9uXG5sZXQgYWN0aXZlSGlnaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlSGlnaFwiKTsgLy9IaWdoIHRlbXBcbmxldCBhY3RpdmVMb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZUxvd1wiKTsgLy9Mb3cgdGVtcFxubGV0IGFjdGl2ZUZlZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3RpdmVGZWVsc1wiKTsgLy9GZWxscyBsaWtlXG5sZXQgYWN0aXZlUG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3RpdmVQb3BcIik7IC8vUHJvYmFiaWxpdHkgb2YgcGVyY2lwaXRhdGlvblxubGV0IGFjdGl2ZUh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3RpdmVIdW1pZGl0eVwiKTsgLy9IdW1pZGl0eVxubGV0IGFjdGl2ZVByZXNzdXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3RpdmVQcmVzc3VyZVwiKTsgLy9QcmVzc3VyZVxubGV0IGFjdGl2ZVdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZVdpbmRcIik7IC8vV2luZCBzcGVlZFxuXG5cbi8vRnVuY3Rpb24gZm9yIGZpbGxpbmcgaW4gdGhlIGluZm8gZm9yIHRoZSBhY3RpdmUgd2VhdGhlciBkaXZcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxsQWN0aXZlSW5mbyhmb3JlY2FzdCwgdGVtcFNjYWxlKSB7IC8vSSB3YW50IHRvIHJlZmFjdG9yIHRoaXMgZnVuY3Rpb24gdG8gYmUgYSB3cmFwcGVyIGZ1bmN0aW9uIHRoYXQgY2FuIGRldGVybWluZSB3aGljaCBmdW5jdGlvbnMgdG8gdXNlIGJhc2VkIG9uIHBhcmFtc1xuICAgIGZvcmVjYXN0ID0gYXdhaXQgZm9yZWNhc3Q7XG4gICAgY29uc29sZS5sb2coZm9yZWNhc3QpO1xuICAgIGFjdGl2ZUNpdHkudGV4dENvbnRlbnQgPSBmb3JlY2FzdC5jaXR5O1xuICAgIGFjdGl2ZUltZy5zcmMgPSBcImh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duL1wiICsgZm9yZWNhc3QuY3VycmVudC53ZWF0aGVyWzBdLmljb24gKyBcIkAyeC5wbmdcIjtcbiAgICBhY3RpdmVXZWF0aGVyLnRleHRDb250ZW50ID0gZm9yZWNhc3QuY3VycmVudC53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuICAgIGxldCBjb252ZXJ0U2NhbGUgPSBudWxsO1xuICAgIGlmICh0ZW1wU2NhbGUgPT09IFwiY1wiKSB7XG4gICAgICAgIGNvbnZlcnRTY2FsZSA9IHRvQ2Vsc2l1cztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnZlcnRTY2FsZSA9IHRvRmFocmVuaGVpdDtcbiAgICB9XG4gICAgYWN0aXZlSGlnaC50ZXh0Q29udGVudCA9IGNvbnZlcnRTY2FsZShmb3JlY2FzdC5kYWlseVswXS50ZW1wLm1heCkgKyBcIlxceEIwXCI7XG4gICAgYWN0aXZlTG93LnRleHRDb250ZW50ID0gY29udmVydFNjYWxlKGZvcmVjYXN0LmRhaWx5WzBdLnRlbXAubWluKSArIFwiXFx4QjBcIjtcbiAgICBhY3RpdmVGZWVscy50ZXh0Q29udGVudCA9IGNvbnZlcnRTY2FsZShmb3JlY2FzdC5jdXJyZW50LmZlZWxzX2xpa2UpICsgXCJcXHhCMFwiO1xuICAgIGFjdGl2ZVBvcC50ZXh0Q29udGVudCA9IGZvcmVjYXN0LmhvdXJseVswXS5wb3AgKiAxMDAgKyBcIiVcIjtcbiAgICBhY3RpdmVIdW1pZGl0eS50ZXh0Q29udGVudCA9IGZvcmVjYXN0LmN1cnJlbnQuaHVtaWRpdHkgKyBcIiVcIjtcbiAgICBhY3RpdmVQcmVzc3VyZS50ZXh0Q29udGVudCA9IGZvcmVjYXN0LmN1cnJlbnQucHJlc3N1cmUgKyBcImhQYVwiO1xuICAgIGFjdGl2ZVdpbmQudGV4dENvbnRlbnQgPSBmb3JlY2FzdC5jdXJyZW50LndpbmRfc3BlZWQgKyBcIm0vc1wiICsgXCIgIChcIiArIE1hdGguZmxvb3IoZm9yZWNhc3QuY3VycmVudC53aW5kX3NwZWVkICogMjIuMzY5NCkgLyAxMCArIFwibWkvaHIpXCI7XG59XG5cblxuIiwiaW1wb3J0IHsgdG9DZWxzaXVzLCB0b0ZhaHJlbmhlaXQgfSBmcm9tIFwiLi9nZXRXZWF0aGVyLmpzXCI7XG5cbi8vQ2FjaGUgRE9NXG5sZXQgZGFpbHlGb3JlY2FzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGFpbHlGb3JlY2FzdFwiKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbGx5RGFpbHlJbmZvKGZvcmVjYXN0LCB0ZW1wU2NhbGUpIHtcbiAgICBmb3JlY2FzdCA9IGF3YWl0IGZvcmVjYXN0O1xuICAgIGxldCBjb252ZXJ0U2NhbGUgPSBudWxsO1xuICAgIGlmICh0ZW1wU2NhbGUgPT09IFwiY1wiKSB7XG4gICAgICAgIGNvbnZlcnRTY2FsZSA9IHRvQ2Vsc2l1cztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnZlcnRTY2FsZSA9IHRvRmFocmVuaGVpdDtcbiAgICB9XG4gICAgcmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI1OyBpKyspIHsgLy8yNSBiZWNhdXNlIEkgd2FudCB0byBoYXZlIDI1IGRpZmZlcmVudCBob3VyczsgZnJvbSBub3cgdG8gc2FtZSB0aW1lIHRvbW9ycm93XG4gICAgICAgIGxldCBuZXdIb3VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbmV3SG91ci5jbGFzc0xpc3QuYWRkKFwiZGFpbHlEaXZcIik7XG4gICAgICAgIGxldCBuZXdUaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIG5ld1RpbWUudGV4dENvbnRlbnQgPSBnZXRIb3VyKGZvcmVjYXN0LmhvdXJseVtpXS5kdCk7XG4gICAgICAgIG5ld1RpbWUuc3R5bGUuZm9udFNpemUgPSBcIjMwcHhcIjtcbiAgICAgICAgbGV0IG5ld0ltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIG5ld0ltZy5zcmMgPSBcImh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duL1wiICsgZm9yZWNhc3QuaG91cmx5W2ldLndlYXRoZXJbMF0uaWNvbiArIFwiQDJ4LnBuZ1wiO1xuICAgICAgICBuZXdJbWcuc3R5bGUudHJhbnNmb3JtID0gXCJzY2FsZSguNilcIjtcbiAgICAgICAgbGV0IG5ld1BvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBuZXdQb3AudGV4dENvbnRlbnQgPSBcIlBlcmNpcGl0YXRpb246IFwiICsgTWF0aC5mbG9vcihmb3JlY2FzdC5ob3VybHlbaV0ucG9wICogMTAwMDApIC8gMTAwICsgXCIlXCI7XG4gICAgICAgIG5ld1BvcC5zdHlsZS5mb250U2l6ZSA9IFwiMjBweFwiO1xuICAgICAgICBsZXQgbmV3VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIG5ld1RlbXAudGV4dENvbnRlbnQgPSBjb252ZXJ0U2NhbGUoZm9yZWNhc3QuaG91cmx5W2ldLnRlbXApICsgXCJcXHhCMFwiO1xuICAgICAgICBuZXdUZW1wLnN0eWxlLmZvbnRTaXplID0gXCIyNXB4XCI7XG4gICAgICAgIFxuICAgICAgICBuZXdIb3VyLmFwcGVuZENoaWxkKG5ld1RpbWUpO1xuICAgICAgICBuZXdIb3VyLmFwcGVuZENoaWxkKG5ld0ltZyk7XG4gICAgICAgIG5ld0hvdXIuYXBwZW5kQ2hpbGQobmV3VGVtcCk7XG4gICAgICAgIG5ld0hvdXIuYXBwZW5kQ2hpbGQobmV3UG9wKTtcbiAgICAgICAgXG4gICAgICAgIGRhaWx5Rm9yZWNhc3QuYXBwZW5kQ2hpbGQobmV3SG91cik7XG4gICAgfVxufVxuXG4vL0Z1bmN0aW9uIGZvciBnZXR0aW5nIHRoZSB0aW1lIG9mIGRheSBmcm9tIHV0YyBzZWNvbmRzXG5mdW5jdGlvbiBnZXRIb3VyKHNlY29uZHMpIHtcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKDApO1xuICAgIGRhdGUuc2V0VVRDU2Vjb25kcyhzZWNvbmRzKTtcbiAgICBsZXQgaG91ciA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICBpZiAoaG91ciA+IDEyKSB7XG4gICAgICAgIGhvdXIgPSBob3VyIC0gMTIgKyBcInBtXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGhvdXIgPT0gMCkge1xuICAgICAgICBob3VyID0gXCIxMmFtXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGhvdXIgPT0gMTIpIHtcbiAgICAgICAgaG91ciA9IFwiMTJwbVwiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaG91ciA9IGhvdXIgKyBcImFtXCJcbiAgICB9XG4gICAgcmV0dXJuIGhvdXI7XG59XG5cbi8vRnVuY3Rpb24gdG8gcmVtb3ZlIGFsbCBjaGlsZCBFbGVtZW50cyBmcm9tIGRhaWx5Rm9yZWNhc3Q7IE5lZWRlZCB0byByZW1ha2UgbmV3IGVsZW1lbnRzXG5hc3luYyBmdW5jdGlvbiByZW1vdmVBbGxDaGlsZHJlbigpIHtcbiAgICB3aGlsZShkYWlseUZvcmVjYXN0LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgZGFpbHlGb3JlY2FzdC5maXJzdENoaWxkLnJlbW92ZSgpO1xuICAgIH1cbn0iLCJsZXQgQVBJX0tFWSA9IGNvbmZpZy5BUElfS0VZO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Rm9yZWNhc3QoY2l0eSkge1xuICAgIHRyeSB7XG4gICAgICAgIC8vTm9ybWFsaXppbmcgY2l0eSB0ZXh0OyBpbXBvcnRhbnQgZm9yIGRpc3BsYXlpbmcgY2l0eSBuYW1lIG9uIHdlYnNpdGVcbiAgICAgICAgY2l0eSA9IGNpdHkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY2l0eSA9IGNpdHkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBjaXR5LnNsaWNlKDEpO1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGZldGNoKFwiaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPVwiICsgY2l0eSArIFwiJmFwcGlkPVwiICsgQVBJX0tFWSwge21vZGU6IFwiY29yc1wifSk7XG4gICAgICAgIGxldCB3ZWF0aGVyID0gYXdhaXQgZGF0YS5qc29uKCk7XG4gICAgICAgIGxldCBsYXQgPSB3ZWF0aGVyLmNvb3JkLmxhdDtcbiAgICAgICAgbGV0IGxvbiA9IHdlYXRoZXIuY29vcmQubG9uO1xuICAgICAgICBsZXQgd2VhdGhlck9iaiA9ICBhd2FpdCBnZXRGdWxsRm9yZWNhc3QobGF0LCBsb24pO1xuICAgICAgICBsZXQgb3V0cHV0T2JqID0ge1xuICAgICAgICAgICAgY2l0eTogY2l0eSxcbiAgICAgICAgICAgIGN1cnJlbnQ6IHdlYXRoZXJPYmouY3VycmVudCxcbiAgICAgICAgICAgIGRhaWx5OiB3ZWF0aGVyT2JqLmRhaWx5LFxuICAgICAgICAgICAgaG91cmx5OiB3ZWF0aGVyT2JqLmhvdXJseSxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG91dHB1dE9iajtcbiAgICB9XG4gICAgY2F0Y2goZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRGdWxsRm9yZWNhc3QobGF0LCBsb24pIHtcbiAgICB0cnkge1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L29uZWNhbGw/bGF0PVwiICsgbGF0ICsgXCImbG9uPVwiICsgbG9uICsgXCImZXhjbHVkZT1taW51dGVseSxhbGVydHMmYXBwaWQ9MjUyYWRlNTc4YjEwNjcwOWQ5OGRiMjE0ZDA0YzUwNGRcIiwge21vZGU6IFwiY29yc1wifSk7XG4gICAgICAgIGxldCB3ZWF0aGVyID0gYXdhaXQgZGF0YS5qc29uKCk7XG4gICAgICAgIHJldHVybiB3ZWF0aGVyO1xuICAgIH1cbiAgICBjYXRjaChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY2FsZSgpIHtcbiAgICBsZXQgdGVtcFNjYWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wU2NhbGVcIik7XG4gICAgaWYgKHRlbXBTY2FsZS5jbGFzc0xpc3QubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIHJldHVybiBcImNcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBcImZcIjtcbiAgICB9XG59XG5cbi8vRnVuY3Rpb24gZm9yIGNvbnZlcnRpbmcgdGhlIGtlbHZpbiBzY2FsZSByZXR1cm5lZCBmcm9tIGFwaSBjYWxsIHRvIENlbHNpdXNcbmV4cG9ydCBmdW5jdGlvbiB0b0NlbHNpdXMoa2VsdmluKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKGtlbHZpbiAtIDI3My4xNSkgKiAxMCkgLyAxMDtcbn1cblxuLy9GdW5jdGlvbiBmb3IgY29udmVydGluZyB0aGUga2VsdmluIHNjYWxlIHJldHVybmVkIGZyb20gYXBpIGNhbGwgdG8gRmFocmVuaGVpdFxuZXhwb3J0IGZ1bmN0aW9uIHRvRmFocmVuaGVpdChrZWx2aW4pIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcigoKGtlbHZpbiAtIDI3My4xNSkqOS81ICsgMzIpICogMTApIC8gMTAgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3dpdGNoU2NhbGUoKSB7XG4gICAgbGV0IHRlbXBTY2FsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVtcFNjYWxlXCIpO1xuICAgIGlmICh0ZW1wU2NhbGUuY2xhc3NMaXN0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICB0ZW1wU2NhbGUuY2xhc3NMaXN0LnJlbW92ZShcImxlZnRcIik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0ZW1wU2NhbGUuY2xhc3NMaXN0LmFkZChcImxlZnRcIik7XG4gICAgfVxufSIsImltcG9ydCB7IHRvQ2Vsc2l1cywgdG9GYWhyZW5oZWl0IH0gZnJvbSBcIi4vZ2V0V2VhdGhlci5qc1wiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmlsbFdlZWtseUluZm8oZm9yZWNhc3QsIHRlbXBTY2FsZSkge1xuICAgIGZvcmVjYXN0ID0gYXdhaXQgZm9yZWNhc3Q7XG4gICAgbGV0IGNvbnZlcnRTY2FsZSA9IG51bGw7XG4gICAgaWYgKHRlbXBTY2FsZSA9PT0gXCJjXCIpIHtcbiAgICAgICAgY29udmVydFNjYWxlID0gdG9DZWxzaXVzO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29udmVydFNjYWxlID0gdG9GYWhyZW5oZWl0O1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IDg7IGkrKykgeyAvL0xvb3Agc3RhcnRzIGF0IDEgaW4gb3JkZXIgdG8gc2tpcCB0aGUgY3VycmVudCBkYXk7IGdvZXMgdXAgdG8gNyBmb3IgYSBmdWxsIHdlZWsgZm9yZWNhc3RcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWVrbHlcIiArIGkpLnRleHRDb250ZW50ID0gZ2V0RGF5KGZvcmVjYXN0LmRhaWx5W2ldLmR0KTtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWVrbHlcIiArIGkpLnN0eWxlLmZvbnRTaXplID0gXCIzMHB4XCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2Vla2x5SW1nXCIgKyBpKS5zcmMgPSBcImh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duL1wiICsgZm9yZWNhc3QuZGFpbHlbaV0ud2VhdGhlclswXS5pY29uICsgXCJAMngucG5nXCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2Vla2x5UG9wXCIgKyBpKS50ZXh0Q29udGVudCA9IFwiUGVyY2lwaXRhdGlvbjogXCIgKyAoZm9yZWNhc3QuZGFpbHlbaV0ucG9wICogMTAwKSArIFwiJVwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlZWtseVBvcFwiICsgaSkuc3R5bGUuZm9udFNpemUgPSBcIjE4cHhcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWVrbHlIaWdoXCIgKyBpKS50ZXh0Q29udGVudCA9IFwiSDogXCIgKyBjb252ZXJ0U2NhbGUoZm9yZWNhc3QuZGFpbHlbaV0udGVtcC5tYXgpICsgXCJcXHhCMFwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlZWtseUhpZ2hcIiArIGkpLnN0eWxlLmZvbnRTaXplID0gXCIzMHB4XCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2Vla2x5TG93XCIgKyBpKS50ZXh0Q29udGVudCA9IFwiTDogXCIgKyBjb252ZXJ0U2NhbGUoZm9yZWNhc3QuZGFpbHlbaV0udGVtcC5taW4pICsgXCJcXHhCMFwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlZWtseUxvd1wiICsgaSkuc3R5bGUuZm9udFNpemUgPSBcIjIwcHhcIjtcbiAgICB9XG59XG5cbi8vRnVuY3Rpb24gZm9yIGdldHRpbmcgYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRheSBmcm9tIGEgVVRDIFxuZnVuY3Rpb24gZ2V0RGF5KHNlY29uZHMpIHtcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKDApO1xuICAgIGRhdGUuc2V0VVRDU2Vjb25kcyhzZWNvbmRzKTtcbiAgICBsZXQgZGF5ID0gZGF0ZS5nZXREYXkoKTtcbiAgICBpZiAoZGF5ID09PSAwKSB7XG4gICAgICAgIHJldHVybiBcIlN1blwiO1xuICAgIH1cbiAgICBlbHNlIGlmIChkYXkgPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIFwiTW9uXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRheSA9PT0gMikge1xuICAgICAgICByZXR1cm4gXCJUdWVzXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRheSA9PT0gMykge1xuICAgICAgICByZXR1cm4gXCJXZWRcIjtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGF5ID09PSA0KSB7XG4gICAgICAgIHJldHVybiBcIlRodXJcIjtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGF5ID09PSA1KSB7XG4gICAgICAgIHJldHVybiBcIkZyaVwiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFwiU2F0XCI7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2V0Rm9yZWNhc3QsIHN3aXRjaFNjYWxlLCBnZXRTY2FsZSB9IGZyb20gXCIuL2dldFdlYXRoZXIuanNcIjtcbmltcG9ydCB7IGZpbGxBY3RpdmVJbmZvIH0gZnJvbSBcIi4vY3VycmVudFdlYXRoZXIuanNcIlxuaW1wb3J0IHsgZmlsbFdlZWtseUluZm8gfSBmcm9tIFwiLi93ZWVrbHlXZWF0aGVyLmpzXCJcbmltcG9ydCBnZXRCYWNrZ3JvdW5kIGZyb20gXCIuL2JhY2tncm91bmQuanNcIlxuaW1wb3J0IHsgZmlsbHlEYWlseUluZm8gfSBmcm9tIFwiLi9kYWlseVdlYXRoZXIuanNcIjtcblxuLy9DYWNoZSBET00gZm9yIGNvbnZlbmllbmNlXG5sZXQgc2VhcmNoID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hcIik7XG5sZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb250YWluZXJcIik7XG5sZXQgYmFja2dyb3VuZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2JhY2tncm91bmRzXCIpO1xuY29udGFpbmVyLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcblxuXG5cbmxldCBmb3JlY2FzdCA9IGdldEZvcmVjYXN0KFwib3JsYW5kb1wiKTtcbmxvYWRQYWdlKCk7XG5cblxuXG5cbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVtcFNjYWxlRGl2XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBzd2l0Y2hTY2FsZSk7IC8vTGlzdGVuZXIgZm9yIG1vdmluZyB0aGUgdGVtcFNjYWxlIHNsaWRlcjsgdXNlcyBvbGQgZm9yZWNhc3QgaW5mbyAoYmVjYXVzZSBvbmx5IGNoYW5naW5nIHNjYWxlKVxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0ZW1wU2NhbGVEaXZcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIHRvZ2dsZU9wYWNpdHkoKTtcbiAgICB3aW5kb3cuc2V0VGltZW91dCh0b2dnbGVPcGFjaXR5LCA3NTApO1xuICAgIGdldEJhY2tncm91bmQoKTtcbiAgICBmaWxsQWN0aXZlSW5mbyhmb3JlY2FzdCwgZ2V0U2NhbGUoKSk7XG4gICAgZmlsbFdlZWtseUluZm8oZm9yZWNhc3QsIGdldFNjYWxlKCkpO1xuICAgIGZpbGx5RGFpbHlJbmZvKGZvcmVjYXN0LCBnZXRTY2FsZSgpKTtcbn0pO1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hcIikuYWRkRXZlbnRMaXN0ZW5lcihcImtleXByZXNzXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAoZS5rZXkgPT09IFwiRW50ZXJcIikge1xuICAgICAgICB0b2dnbGVPcGFjaXR5KCk7XG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KHRvZ2dsZU9wYWNpdHksIDc1MCk7XG4gICAgICAgIGxvYWRQYWdlKCk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoXCIpLnZhbHVlID0gXCJcIjtcbiAgICB9XG59KTtcblxuXG5cbi8vV3JhcHBlciBmdW5jdGlvbiB0byBsb2FkIGV2ZXJ5dGhpbmcgb24gdGhlIHBhZ2U7IEhlbHBzIHdpdGggY2hhbmdpbmcgdGVtcCBTY2FsZVxuYXN5bmMgZnVuY3Rpb24gbG9hZFBhZ2UoKSB7XG4gICAgbGV0IGNpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaFwiKS52YWx1ZTtcbiAgICBpZiAoY2l0eSA9PT0gXCJcIikge1xuICAgICAgICBjaXR5ID0gXCJvcmxhbmRvXCJcbiAgICB9XG4gICAgZm9yZWNhc3QgPSBhd2FpdCBnZXRGb3JlY2FzdChjaXR5KTtcbiAgICBpZiAoZm9yZWNhc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBsZXQgY3VycmVudENpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZUNpdHlcIikudGV4dENvbnRlbnQ7XG4gICAgICAgIGZvcmVjYXN0ID0gZ2V0Rm9yZWNhc3QoY3VycmVudENpdHkpO1xuICAgICAgICBzZWFyY2guc3R5bGUuYm9yZGVyQm90dG9tID0gXCIzcHggc29saWQgcmVkXCI7XG4gICAgICAgIHNlYXJjaC5wbGFjZWhvbGRlciA9IFwiUGxlYXNlIHRyeSBhZ2Fpbi5cIlxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc2VhcmNoLnN0eWxlLmJvcmRlckJvdHRvbSA9IFwiM3B4IHNvbGlkIHdoaXRlXCI7XG4gICAgICAgIHNlYXJjaC5wbGFjZWhvbGRlciA9IFwiU2VhcmNoIGEgQ2l0eS4uLlwiXG4gICAgfVxuICAgIGdldEJhY2tncm91bmQoKTtcbiAgICBhd2FpdCBmaWxsQWN0aXZlSW5mbyhmb3JlY2FzdCwgZ2V0U2NhbGUoKSk7XG4gICAgYXdhaXQgZmlsbFdlZWtseUluZm8oZm9yZWNhc3QsIGdldFNjYWxlKCkpO1xuICAgIGF3YWl0IGZpbGx5RGFpbHlJbmZvKGZvcmVjYXN0LCBnZXRTY2FsZSgpKTtcbn1cblxuLy9GdW5jdGlvbiB0byBtYWtlIGV2ZXJ5dGhpbmcgdHJhbnNwYXJlbnQvb3BhcXVlIHdoZW4gbG9hZGluZyBpbiBuZXcgaW5mb1xuZnVuY3Rpb24gdG9nZ2xlT3BhY2l0eSgpIHtcbiAgICBpZiAoY29udGFpbmVyLnN0eWxlLm9wYWNpdHkgPT09IFwiMFwiKSB7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG4gICAgICAgIGJhY2tncm91bmRzLmNoaWxkTm9kZXMuZm9yRWFjaChmdW5jdGlvbihpbWFnZSwgaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCUyKSB7XG4gICAgICAgICAgICAgICAgaW1hZ2Uuc3R5bGUuZmlsdGVyID0gXCJicmlnaHRuZXNzKDAuNSlcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb250YWluZXIuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xuICAgICAgICBiYWNrZ3JvdW5kcy5jaGlsZE5vZGVzLmZvckVhY2goZnVuY3Rpb24oaW1hZ2UsIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoaW5kZXglMikge1xuICAgICAgICAgICAgICAgIGltYWdlLnN0eWxlLmZpbHRlciA9IFwiYnJpZ2h0bmVzcygxKVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9