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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ05xRTtBQUNqQjtBQUNEO0FBQ1I7QUFDUTs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBLGVBQWUsMkRBQVc7QUFDMUI7Ozs7O0FBS0Esa0VBQWtFLHVEQUFXLEdBQUcsNENBQTRDO0FBQzVIO0FBQ0E7QUFDQTtBQUNBLElBQUksdURBQWE7QUFDakIsSUFBSSxrRUFBYyxXQUFXLHdEQUFRO0FBQ3JDLElBQUksaUVBQWMsV0FBVyx3REFBUTtBQUNyQyxJQUFJLGdFQUFjLFdBQVcsd0RBQVE7QUFDckMsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlELG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDJEQUFXO0FBQ2hDO0FBQ0E7QUFDQSxtQkFBbUIsMkRBQVc7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHVEQUFhO0FBQ2pCLFVBQVUsa0VBQWMsV0FBVyx3REFBUTtBQUMzQyxVQUFVLGlFQUFjLFdBQVcsd0RBQVE7QUFDM0MsVUFBVSxnRUFBYyxXQUFXLHdEQUFRO0FBQzNDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvYmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9jdXJyZW50V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kYWlseVdlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZ2V0V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy93ZWVrbHlXZWF0aGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9DYWNoZSBET01cbmxldCBzdW5yaXNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdW5yaXNlXCIpO1xubGV0IG5vb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25vb25cIik7XG5sZXQgc3Vuc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzdW5zZXRcIik7XG5sZXQgbmlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI25pZ2h0XCIpO1xuXG5cbi8vRnVuY3Rpb24gdG8gZGV0ZXJtaW5lIHRpbWUgb2YgZGF5IGFuZCBzaG93IGNvcmVzcG9uZGluZyBiYWNrZ3JvdW5kXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgICBoaWRlQUxMKCk7XG4gICAgbGV0IGN1cnJlbnREYXRlID0gbmV3IERhdGUoKTtcbiAgICBsZXQgY3VycmVudEhvdXIgPSBjdXJyZW50RGF0ZS5nZXRIb3VycygpO1xuXG5cbiAgICBpZiAoY3VycmVudEhvdXIgPj0gNSAmJiBjdXJyZW50SG91ciA8IDEyKSB7XG4gICAgICAgIHNob3coc3VucmlzZSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKGN1cnJlbnRIb3VyID49IDEyICYmIGN1cnJlbnRIb3VyIDwgMTcpIHtcbiAgICAgICAgc2hvdyhub29uKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoY3VycmVudEhvdXIgPj0gMTcgJiYgY3VycmVudEhvdXIgPCAyMCkge1xuICAgICAgICBzaG93KHN1bnNldCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzaG93KG5pZ2h0KTtcbiAgICB9XG5cbn1cblxuLy9GdW5jdGlvbiBmb3IgaGlkaW5nIGFsbCBiYWNrZ3JvdW5kIGltZ3NcbmZ1bmN0aW9uIGhpZGVBTEwoKSB7XG4gICAgc3VucmlzZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgbm9vbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgc3Vuc2V0LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBuaWdodC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG59XG5cbi8vRnVuY3Rpb24gZm9yIGRpc3BsYXlpbmcgb25seSBvbmUgYmFja2dyb3VuZFxuZnVuY3Rpb24gc2hvdyhlbGVtZW50KSB7XG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xufSIsImltcG9ydCB7IHRvQ2Vsc2l1cywgdG9GYWhyZW5oZWl0IH0gZnJvbSBcIi4vZ2V0V2VhdGhlci5qc1wiO1xuXG4vL0NhY2hlIERPTVxubGV0IGFjdGl2ZUNpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZUNpdHlcIik7IC8vVGl0bGUgZm9yIHRoZSBjaXR5IG5hbWVcbmxldCBhY3RpdmVJbWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZUltZ1wiKTsgLy9JbWcgZm9yIHdlYXRoZXIgY29uZGl0aW9ucyAoaS5lLiBjbG91ZHksIHJhaW55LCBldGMuKVxubGV0IGFjdGl2ZVdlYXRoZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZVdlYXRoZXJcIik7IC8vPHA+IGVsZW1lbnQgZm9yIHRoZSB3ZWF0aGVyIGRlc2NyaXB0aW9uXG5sZXQgYWN0aXZlSGlnaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYWN0aXZlSGlnaFwiKTsgLy9IaWdoIHRlbXBcbmxldCBhY3RpdmVMb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZUxvd1wiKTsgLy9Mb3cgdGVtcFxubGV0IGFjdGl2ZUZlZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3RpdmVGZWVsc1wiKTsgLy9GZWxscyBsaWtlXG5sZXQgYWN0aXZlUG9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3RpdmVQb3BcIik7IC8vUHJvYmFiaWxpdHkgb2YgcGVyY2lwaXRhdGlvblxubGV0IGFjdGl2ZUh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3RpdmVIdW1pZGl0eVwiKTsgLy9IdW1pZGl0eVxubGV0IGFjdGl2ZVByZXNzdXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3RpdmVQcmVzc3VyZVwiKTsgLy9QcmVzc3VyZVxubGV0IGFjdGl2ZVdpbmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FjdGl2ZVdpbmRcIik7IC8vV2luZCBzcGVlZFxuXG5cbi8vRnVuY3Rpb24gZm9yIGZpbGxpbmcgaW4gdGhlIGluZm8gZm9yIHRoZSBhY3RpdmUgd2VhdGhlciBkaXZcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBmaWxsQWN0aXZlSW5mbyhmb3JlY2FzdCwgdGVtcFNjYWxlKSB7IC8vSSB3YW50IHRvIHJlZmFjdG9yIHRoaXMgZnVuY3Rpb24gdG8gYmUgYSB3cmFwcGVyIGZ1bmN0aW9uIHRoYXQgY2FuIGRldGVybWluZSB3aGljaCBmdW5jdGlvbnMgdG8gdXNlIGJhc2VkIG9uIHBhcmFtc1xuICAgIGZvcmVjYXN0ID0gYXdhaXQgZm9yZWNhc3Q7XG4gICAgY29uc29sZS5sb2coZm9yZWNhc3QpO1xuICAgIGFjdGl2ZUNpdHkudGV4dENvbnRlbnQgPSBmb3JlY2FzdC5jaXR5O1xuICAgIGFjdGl2ZUltZy5zcmMgPSBcImh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duL1wiICsgZm9yZWNhc3QuY3VycmVudC53ZWF0aGVyWzBdLmljb24gKyBcIkAyeC5wbmdcIjtcbiAgICBhY3RpdmVXZWF0aGVyLnRleHRDb250ZW50ID0gZm9yZWNhc3QuY3VycmVudC53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuICAgIGxldCBjb252ZXJ0U2NhbGUgPSBudWxsO1xuICAgIGlmICh0ZW1wU2NhbGUgPT09IFwiY1wiKSB7XG4gICAgICAgIGNvbnZlcnRTY2FsZSA9IHRvQ2Vsc2l1cztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnZlcnRTY2FsZSA9IHRvRmFocmVuaGVpdDtcbiAgICB9XG4gICAgYWN0aXZlSGlnaC50ZXh0Q29udGVudCA9IGNvbnZlcnRTY2FsZShmb3JlY2FzdC5kYWlseVswXS50ZW1wLm1heCkgKyBcIlxceEIwXCI7XG4gICAgYWN0aXZlTG93LnRleHRDb250ZW50ID0gY29udmVydFNjYWxlKGZvcmVjYXN0LmRhaWx5WzBdLnRlbXAubWluKSArIFwiXFx4QjBcIjtcbiAgICBhY3RpdmVGZWVscy50ZXh0Q29udGVudCA9IGNvbnZlcnRTY2FsZShmb3JlY2FzdC5jdXJyZW50LmZlZWxzX2xpa2UpICsgXCJcXHhCMFwiO1xuICAgIGFjdGl2ZVBvcC50ZXh0Q29udGVudCA9IGZvcmVjYXN0LmhvdXJseVswXS5wb3AgKiAxMDAgKyBcIiVcIjtcbiAgICBhY3RpdmVIdW1pZGl0eS50ZXh0Q29udGVudCA9IGZvcmVjYXN0LmN1cnJlbnQuaHVtaWRpdHkgKyBcIiVcIjtcbiAgICBhY3RpdmVQcmVzc3VyZS50ZXh0Q29udGVudCA9IGZvcmVjYXN0LmN1cnJlbnQucHJlc3N1cmUgKyBcImhQYVwiO1xuICAgIGFjdGl2ZVdpbmQudGV4dENvbnRlbnQgPSBmb3JlY2FzdC5jdXJyZW50LndpbmRfc3BlZWQgKyBcIm0vc1wiICsgXCIgIChcIiArIE1hdGguZmxvb3IoZm9yZWNhc3QuY3VycmVudC53aW5kX3NwZWVkICogMjIuMzY5NCkgLyAxMCArIFwibWkvaHIpXCI7XG59XG5cblxuIiwiaW1wb3J0IHsgdG9DZWxzaXVzLCB0b0ZhaHJlbmhlaXQgfSBmcm9tIFwiLi9nZXRXZWF0aGVyLmpzXCI7XG5cbi8vQ2FjaGUgRE9NXG5sZXQgZGFpbHlGb3JlY2FzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGFpbHlGb3JlY2FzdFwiKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbGx5RGFpbHlJbmZvKGZvcmVjYXN0LCB0ZW1wU2NhbGUpIHtcbiAgICBmb3JlY2FzdCA9IGF3YWl0IGZvcmVjYXN0O1xuICAgIGxldCBjb252ZXJ0U2NhbGUgPSBudWxsO1xuICAgIGlmICh0ZW1wU2NhbGUgPT09IFwiY1wiKSB7XG4gICAgICAgIGNvbnZlcnRTY2FsZSA9IHRvQ2Vsc2l1cztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnZlcnRTY2FsZSA9IHRvRmFocmVuaGVpdDtcbiAgICB9XG4gICAgcmVtb3ZlQWxsQ2hpbGRyZW4oKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI1OyBpKyspIHsgLy8yNSBiZWNhdXNlIEkgd2FudCB0byBoYXZlIDI1IGRpZmZlcmVudCBob3VyczsgZnJvbSBub3cgdG8gc2FtZSB0aW1lIHRvbW9ycm93XG4gICAgICAgIGxldCBuZXdIb3VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbmV3SG91ci5jbGFzc0xpc3QuYWRkKFwiZGFpbHlEaXZcIik7XG4gICAgICAgIGxldCBuZXdUaW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIG5ld1RpbWUudGV4dENvbnRlbnQgPSBnZXRIb3VyKGZvcmVjYXN0LmhvdXJseVtpXS5kdCk7XG4gICAgICAgIG5ld1RpbWUuc3R5bGUuZm9udFNpemUgPSBcIjMwcHhcIjtcbiAgICAgICAgbGV0IG5ld0ltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG4gICAgICAgIG5ld0ltZy5zcmMgPSBcImh0dHA6Ly9vcGVud2VhdGhlcm1hcC5vcmcvaW1nL3duL1wiICsgZm9yZWNhc3QuaG91cmx5W2ldLndlYXRoZXJbMF0uaWNvbiArIFwiQDJ4LnBuZ1wiO1xuICAgICAgICBuZXdJbWcuc3R5bGUudHJhbnNmb3JtID0gXCJzY2FsZSguNilcIjtcbiAgICAgICAgbGV0IG5ld1BvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICAgICAgICBuZXdQb3AudGV4dENvbnRlbnQgPSBcIlBlcmNpcGl0YXRpb246IFwiICsgTWF0aC5mbG9vcihmb3JlY2FzdC5ob3VybHlbaV0ucG9wICogMTAwMDApIC8gMTAwICsgXCIlXCI7XG4gICAgICAgIG5ld1BvcC5zdHlsZS5mb250U2l6ZSA9IFwiMjBweFwiO1xuICAgICAgICBsZXQgbmV3VGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIG5ld1RlbXAudGV4dENvbnRlbnQgPSBjb252ZXJ0U2NhbGUoZm9yZWNhc3QuaG91cmx5W2ldLnRlbXApICsgXCJcXHhCMFwiO1xuICAgICAgICBuZXdUZW1wLnN0eWxlLmZvbnRTaXplID0gXCIyNXB4XCI7XG4gICAgICAgIFxuICAgICAgICBuZXdIb3VyLmFwcGVuZENoaWxkKG5ld1RpbWUpO1xuICAgICAgICBuZXdIb3VyLmFwcGVuZENoaWxkKG5ld0ltZyk7XG4gICAgICAgIG5ld0hvdXIuYXBwZW5kQ2hpbGQobmV3VGVtcCk7XG4gICAgICAgIG5ld0hvdXIuYXBwZW5kQ2hpbGQobmV3UG9wKTtcbiAgICAgICAgXG4gICAgICAgIGRhaWx5Rm9yZWNhc3QuYXBwZW5kQ2hpbGQobmV3SG91cik7XG4gICAgfVxufVxuXG4vL0Z1bmN0aW9uIGZvciBnZXR0aW5nIHRoZSB0aW1lIG9mIGRheSBmcm9tIHV0YyBzZWNvbmRzXG5mdW5jdGlvbiBnZXRIb3VyKHNlY29uZHMpIHtcbiAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKDApO1xuICAgIGRhdGUuc2V0VVRDU2Vjb25kcyhzZWNvbmRzKTtcbiAgICBsZXQgaG91ciA9IGRhdGUuZ2V0SG91cnMoKTtcbiAgICBpZiAoaG91ciA+IDEyKSB7XG4gICAgICAgIGhvdXIgPSBob3VyIC0gMTIgKyBcInBtXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGhvdXIgPT0gMCkge1xuICAgICAgICBob3VyID0gXCIxMmFtXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGhvdXIgPT0gMTIpIHtcbiAgICAgICAgaG91ciA9IFwiMTJwbVwiO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaG91ciA9IGhvdXIgKyBcImFtXCJcbiAgICB9XG4gICAgcmV0dXJuIGhvdXI7XG59XG5cbi8vRnVuY3Rpb24gdG8gcmVtb3ZlIGFsbCBjaGlsZCBFbGVtZW50cyBmcm9tIGRhaWx5Rm9yZWNhc3Q7IE5lZWRlZCB0byByZW1ha2UgbmV3IGVsZW1lbnRzXG5hc3luYyBmdW5jdGlvbiByZW1vdmVBbGxDaGlsZHJlbigpIHtcbiAgICB3aGlsZShkYWlseUZvcmVjYXN0LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgZGFpbHlGb3JlY2FzdC5maXJzdENoaWxkLnJlbW92ZSgpO1xuICAgIH1cbn0iLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Rm9yZWNhc3QoY2l0eSkge1xuICAgIHRyeSB7XG4gICAgICAgIC8vTm9ybWFsaXppbmcgY2l0eSB0ZXh0OyBpbXBvcnRhbnQgZm9yIGRpc3BsYXlpbmcgY2l0eSBuYW1lIG9uIHdlYnNpdGVcbiAgICAgICAgY2l0eSA9IGNpdHkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY2l0eSA9IGNpdHkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBjaXR5LnNsaWNlKDEpO1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGZldGNoKFwiaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9xPVwiICsgY2l0eSArIFwiJmFwcGlkPTI1MmFkZTU3OGIxMDY3MDlkOThkYjIxNGQwNGM1MDRkXCIsIHttb2RlOiBcImNvcnNcIn0pO1xuICAgICAgICBsZXQgd2VhdGhlciA9IGF3YWl0IGRhdGEuanNvbigpO1xuICAgICAgICBsZXQgbGF0ID0gd2VhdGhlci5jb29yZC5sYXQ7XG4gICAgICAgIGxldCBsb24gPSB3ZWF0aGVyLmNvb3JkLmxvbjtcbiAgICAgICAgbGV0IHdlYXRoZXJPYmogPSAgYXdhaXQgZ2V0RnVsbEZvcmVjYXN0KGxhdCwgbG9uKTtcbiAgICAgICAgbGV0IG91dHB1dE9iaiA9IHtcbiAgICAgICAgICAgIGNpdHk6IGNpdHksXG4gICAgICAgICAgICBjdXJyZW50OiB3ZWF0aGVyT2JqLmN1cnJlbnQsXG4gICAgICAgICAgICBkYWlseTogd2VhdGhlck9iai5kYWlseSxcbiAgICAgICAgICAgIGhvdXJseTogd2VhdGhlck9iai5ob3VybHksXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBvdXRwdXRPYmo7XG4gICAgfVxuICAgIGNhdGNoKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0RnVsbEZvcmVjYXN0KGxhdCwgbG9uKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBmZXRjaChcImh0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS9vbmVjYWxsP2xhdD1cIiArIGxhdCArIFwiJmxvbj1cIiArIGxvbiArIFwiJmV4Y2x1ZGU9bWludXRlbHksYWxlcnRzJmFwcGlkPTI1MmFkZTU3OGIxMDY3MDlkOThkYjIxNGQwNGM1MDRkXCIsIHttb2RlOiBcImNvcnNcIn0pO1xuICAgICAgICBsZXQgd2VhdGhlciA9IGF3YWl0IGRhdGEuanNvbigpO1xuICAgICAgICByZXR1cm4gd2VhdGhlcjtcbiAgICB9XG4gICAgY2F0Y2goZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NhbGUoKSB7XG4gICAgbGV0IHRlbXBTY2FsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVtcFNjYWxlXCIpO1xuICAgIGlmICh0ZW1wU2NhbGUuY2xhc3NMaXN0Lmxlbmd0aCAhPT0gMCkge1xuICAgICAgICByZXR1cm4gXCJjXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gXCJmXCI7XG4gICAgfVxufVxuXG4vL0Z1bmN0aW9uIGZvciBjb252ZXJ0aW5nIHRoZSBrZWx2aW4gc2NhbGUgcmV0dXJuZWQgZnJvbSBhcGkgY2FsbCB0byBDZWxzaXVzXG5leHBvcnQgZnVuY3Rpb24gdG9DZWxzaXVzKGtlbHZpbikge1xuICAgIHJldHVybiBNYXRoLmZsb29yKChrZWx2aW4gLSAyNzMuMTUpICogMTApIC8gMTA7XG59XG5cbi8vRnVuY3Rpb24gZm9yIGNvbnZlcnRpbmcgdGhlIGtlbHZpbiBzY2FsZSByZXR1cm5lZCBmcm9tIGFwaSBjYWxsIHRvIEZhaHJlbmhlaXRcbmV4cG9ydCBmdW5jdGlvbiB0b0ZhaHJlbmhlaXQoa2VsdmluKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKChrZWx2aW4gLSAyNzMuMTUpKjkvNSArIDMyKSAqIDEwKSAvIDEwIDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN3aXRjaFNjYWxlKCkge1xuICAgIGxldCB0ZW1wU2NhbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlbXBTY2FsZVwiKTtcbiAgICBpZiAodGVtcFNjYWxlLmNsYXNzTGlzdC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgdGVtcFNjYWxlLmNsYXNzTGlzdC5yZW1vdmUoXCJsZWZ0XCIpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGVtcFNjYWxlLmNsYXNzTGlzdC5hZGQoXCJsZWZ0XCIpO1xuICAgIH1cbn0iLCJpbXBvcnQgeyB0b0NlbHNpdXMsIHRvRmFocmVuaGVpdCB9IGZyb20gXCIuL2dldFdlYXRoZXIuanNcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbGxXZWVrbHlJbmZvKGZvcmVjYXN0LCB0ZW1wU2NhbGUpIHtcbiAgICBmb3JlY2FzdCA9IGF3YWl0IGZvcmVjYXN0O1xuICAgIGxldCBjb252ZXJ0U2NhbGUgPSBudWxsO1xuICAgIGlmICh0ZW1wU2NhbGUgPT09IFwiY1wiKSB7XG4gICAgICAgIGNvbnZlcnRTY2FsZSA9IHRvQ2Vsc2l1cztcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNvbnZlcnRTY2FsZSA9IHRvRmFocmVuaGVpdDtcbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCA4OyBpKyspIHsgLy9Mb29wIHN0YXJ0cyBhdCAxIGluIG9yZGVyIHRvIHNraXAgdGhlIGN1cnJlbnQgZGF5OyBnb2VzIHVwIHRvIDcgZm9yIGEgZnVsbCB3ZWVrIGZvcmVjYXN0XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2Vla2x5XCIgKyBpKS50ZXh0Q29udGVudCA9IGdldERheShmb3JlY2FzdC5kYWlseVtpXS5kdCk7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2Vla2x5XCIgKyBpKS5zdHlsZS5mb250U2l6ZSA9IFwiMzBweFwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlZWtseUltZ1wiICsgaSkuc3JjID0gXCJodHRwOi8vb3BlbndlYXRoZXJtYXAub3JnL2ltZy93bi9cIiArIGZvcmVjYXN0LmRhaWx5W2ldLndlYXRoZXJbMF0uaWNvbiArIFwiQDJ4LnBuZ1wiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlZWtseVBvcFwiICsgaSkudGV4dENvbnRlbnQgPSBcIlBlcmNpcGl0YXRpb246IFwiICsgKGZvcmVjYXN0LmRhaWx5W2ldLnBvcCAqIDEwMCkgKyBcIiVcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWVrbHlQb3BcIiArIGkpLnN0eWxlLmZvbnRTaXplID0gXCIxOHB4XCI7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjd2Vla2x5SGlnaFwiICsgaSkudGV4dENvbnRlbnQgPSBcIkg6IFwiICsgY29udmVydFNjYWxlKGZvcmVjYXN0LmRhaWx5W2ldLnRlbXAubWF4KSArIFwiXFx4QjBcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWVrbHlIaWdoXCIgKyBpKS5zdHlsZS5mb250U2l6ZSA9IFwiMzBweFwiO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3dlZWtseUxvd1wiICsgaSkudGV4dENvbnRlbnQgPSBcIkw6IFwiICsgY29udmVydFNjYWxlKGZvcmVjYXN0LmRhaWx5W2ldLnRlbXAubWluKSArIFwiXFx4QjBcIjtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN3ZWVrbHlMb3dcIiArIGkpLnN0eWxlLmZvbnRTaXplID0gXCIyMHB4XCI7XG4gICAgfVxufVxuXG4vL0Z1bmN0aW9uIGZvciBnZXR0aW5nIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBkYXkgZnJvbSBhIFVUQyBcbmZ1bmN0aW9uIGdldERheShzZWNvbmRzKSB7XG4gICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgwKTtcbiAgICBkYXRlLnNldFVUQ1NlY29uZHMoc2Vjb25kcyk7XG4gICAgbGV0IGRheSA9IGRhdGUuZ2V0RGF5KCk7XG4gICAgaWYgKGRheSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gXCJTdW5cIjtcbiAgICB9XG4gICAgZWxzZSBpZiAoZGF5ID09PSAxKSB7XG4gICAgICAgIHJldHVybiBcIk1vblwiO1xuICAgIH1cbiAgICBlbHNlIGlmIChkYXkgPT09IDIpIHtcbiAgICAgICAgcmV0dXJuIFwiVHVlc1wiO1xuICAgIH1cbiAgICBlbHNlIGlmIChkYXkgPT09IDMpIHtcbiAgICAgICAgcmV0dXJuIFwiV2VkXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRheSA9PT0gNCkge1xuICAgICAgICByZXR1cm4gXCJUaHVyXCI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRheSA9PT0gNSkge1xuICAgICAgICByZXR1cm4gXCJGcmlcIjtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBcIlNhdFwiO1xuICAgIH1cbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IGdldEZvcmVjYXN0LCBzd2l0Y2hTY2FsZSwgZ2V0U2NhbGUgfSBmcm9tIFwiLi9nZXRXZWF0aGVyLmpzXCI7XG5pbXBvcnQgeyBmaWxsQWN0aXZlSW5mbyB9IGZyb20gXCIuL2N1cnJlbnRXZWF0aGVyLmpzXCJcbmltcG9ydCB7IGZpbGxXZWVrbHlJbmZvIH0gZnJvbSBcIi4vd2Vla2x5V2VhdGhlci5qc1wiXG5pbXBvcnQgZ2V0QmFja2dyb3VuZCBmcm9tIFwiLi9iYWNrZ3JvdW5kLmpzXCJcbmltcG9ydCB7IGZpbGx5RGFpbHlJbmZvIH0gZnJvbSBcIi4vZGFpbHlXZWF0aGVyLmpzXCI7XG5cbi8vQ2FjaGUgRE9NIGZvciBjb252ZW5pZW5jZVxubGV0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoXCIpO1xubGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29udGFpbmVyXCIpO1xubGV0IGJhY2tncm91bmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNiYWNrZ3JvdW5kc1wiKTtcbmNvbnRhaW5lci5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XG5cblxuXG5sZXQgZm9yZWNhc3QgPSBnZXRGb3JlY2FzdChcIm9ybGFuZG9cIik7XG5sb2FkUGFnZSgpO1xuXG5cblxuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RlbXBTY2FsZURpdlwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3dpdGNoU2NhbGUpOyAvL0xpc3RlbmVyIGZvciBtb3ZpbmcgdGhlIHRlbXBTY2FsZSBzbGlkZXI7IHVzZXMgb2xkIGZvcmVjYXN0IGluZm8gKGJlY2F1c2Ugb25seSBjaGFuZ2luZyBzY2FsZSlcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGVtcFNjYWxlRGl2XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICB0b2dnbGVPcGFjaXR5KCk7XG4gICAgd2luZG93LnNldFRpbWVvdXQodG9nZ2xlT3BhY2l0eSwgNzUwKTtcbiAgICBnZXRCYWNrZ3JvdW5kKCk7XG4gICAgZmlsbEFjdGl2ZUluZm8oZm9yZWNhc3QsIGdldFNjYWxlKCkpO1xuICAgIGZpbGxXZWVrbHlJbmZvKGZvcmVjYXN0LCBnZXRTY2FsZSgpKTtcbiAgICBmaWxseURhaWx5SW5mbyhmb3JlY2FzdCwgZ2V0U2NhbGUoKSk7XG59KTtcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlwcmVzc1wiLCBmdW5jdGlvbihlKSB7XG4gICAgaWYgKGUua2V5ID09PSBcIkVudGVyXCIpIHtcbiAgICAgICAgdG9nZ2xlT3BhY2l0eSgpO1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dCh0b2dnbGVPcGFjaXR5LCA3NTApO1xuICAgICAgICBsb2FkUGFnZSgpO1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaFwiKS52YWx1ZSA9IFwiXCI7XG4gICAgfVxufSk7XG5cblxuXG4vL1dyYXBwZXIgZnVuY3Rpb24gdG8gbG9hZCBldmVyeXRoaW5nIG9uIHRoZSBwYWdlOyBIZWxwcyB3aXRoIGNoYW5naW5nIHRlbXAgU2NhbGVcbmFzeW5jIGZ1bmN0aW9uIGxvYWRQYWdlKCkge1xuICAgIGxldCBjaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2hcIikudmFsdWU7XG4gICAgaWYgKGNpdHkgPT09IFwiXCIpIHtcbiAgICAgICAgY2l0eSA9IFwib3JsYW5kb1wiXG4gICAgfVxuICAgIGZvcmVjYXN0ID0gYXdhaXQgZ2V0Rm9yZWNhc3QoY2l0eSk7XG4gICAgaWYgKGZvcmVjYXN0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRDaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhY3RpdmVDaXR5XCIpLnRleHRDb250ZW50O1xuICAgICAgICBmb3JlY2FzdCA9IGdldEZvcmVjYXN0KGN1cnJlbnRDaXR5KTtcbiAgICAgICAgc2VhcmNoLnN0eWxlLmJvcmRlckJvdHRvbSA9IFwiM3B4IHNvbGlkIHJlZFwiO1xuICAgICAgICBzZWFyY2gucGxhY2Vob2xkZXIgPSBcIlBsZWFzZSB0cnkgYWdhaW4uXCJcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHNlYXJjaC5zdHlsZS5ib3JkZXJCb3R0b20gPSBcIjNweCBzb2xpZCB3aGl0ZVwiO1xuICAgICAgICBzZWFyY2gucGxhY2Vob2xkZXIgPSBcIlNlYXJjaCBhIENpdHkuLi5cIlxuICAgIH1cbiAgICBnZXRCYWNrZ3JvdW5kKCk7XG4gICAgYXdhaXQgZmlsbEFjdGl2ZUluZm8oZm9yZWNhc3QsIGdldFNjYWxlKCkpO1xuICAgIGF3YWl0IGZpbGxXZWVrbHlJbmZvKGZvcmVjYXN0LCBnZXRTY2FsZSgpKTtcbiAgICBhd2FpdCBmaWxseURhaWx5SW5mbyhmb3JlY2FzdCwgZ2V0U2NhbGUoKSk7XG59XG5cbi8vRnVuY3Rpb24gdG8gbWFrZSBldmVyeXRoaW5nIHRyYW5zcGFyZW50L29wYXF1ZSB3aGVuIGxvYWRpbmcgaW4gbmV3IGluZm9cbmZ1bmN0aW9uIHRvZ2dsZU9wYWNpdHkoKSB7XG4gICAgaWYgKGNvbnRhaW5lci5zdHlsZS5vcGFjaXR5ID09PSBcIjBcIikge1xuICAgICAgICBjb250YWluZXIuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuICAgICAgICBiYWNrZ3JvdW5kcy5jaGlsZE5vZGVzLmZvckVhY2goZnVuY3Rpb24oaW1hZ2UsIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoaW5kZXglMikge1xuICAgICAgICAgICAgICAgIGltYWdlLnN0eWxlLmZpbHRlciA9IFwiYnJpZ2h0bmVzcygwLjUpXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcbiAgICAgICAgYmFja2dyb3VuZHMuY2hpbGROb2Rlcy5mb3JFYWNoKGZ1bmN0aW9uKGltYWdlLCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKGluZGV4JTIpIHtcbiAgICAgICAgICAgICAgICBpbWFnZS5zdHlsZS5maWx0ZXIgPSBcImJyaWdodG5lc3MoMSlcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==