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

/***/ "./src/getWeather.js":
/*!***************************!*\
  !*** ./src/getWeather.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCurrentForecast": () => (/* binding */ getCurrentForecast),
/* harmony export */   "getHourlyForecast": () => (/* binding */ getHourlyForecast)
/* harmony export */ });
let API_KEY = config.API_KEY;

async function getCurrentForecast(city) {
    try {
        //Normalizing city text; important for displaying city name on website
        city = city.toLowerCase();
        city = city.charAt(0).toUpperCase() + city.slice(1);
        let data = await fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY, {mode: "cors"});
        let weather = await data.json();
        let lat = weather.coord.lat;
        let lon = weather.coord.lon;
        getHourlyForecast(lat, lon, city);
    }
    catch(err) {
        console.log(err);
    }
}

async function getHourlyForecast(lat, lon, city) {
    try {
        //let data = await fetch("pro.openweathermap.org/data/2.5/forecast/hourly?q=" + city + "appid=" + API_KEY, {mode: "cors"});
        let data = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=252ade578b106709d98db214d04c504d", {mode: "cors"});
        let weather = await data.json();
        console.log(city);
        console.log(weather);
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
/* harmony import */ var _background_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./background.js */ "./src/background.js");





(0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentForecast)("orlando");
(0,_background_js__WEBPACK_IMPORTED_MODULE_1__.default)();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsNkJBQWUsc0NBQVc7QUFDMUI7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ3hDQTs7QUFFTztBQUNQO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxrSEFBa0gsYUFBYTtBQUMvSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBLG9IQUFvSCxhQUFhO0FBQ2pJLDBKQUEwSixhQUFhO0FBQ3ZLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQzdCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ053RTtBQUM3Qjs7OztBQUkzQyxrRUFBa0I7QUFDbEIsdURBQWEsRyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2JhY2tncm91bmQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZ2V0V2VhdGhlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vQ2FjaGUgRE9NXG5sZXQgc3VucmlzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3VucmlzZVwiKTtcbmxldCBub29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNub29uXCIpO1xubGV0IHN1bnNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc3Vuc2V0XCIpO1xubGV0IG5pZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNuaWdodFwiKTtcblxuXG4vL0Z1bmN0aW9uIHRvIGRldGVybWluZSB0aW1lIG9mIGRheSBhbmQgc2hvdyBjb3Jlc3BvbmRpbmcgYmFja2dyb3VuZFxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gICAgaGlkZUFMTCgpO1xuICAgIGxldCBjdXJyZW50RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgbGV0IGN1cnJlbnRIb3VyID0gY3VycmVudERhdGUuZ2V0SG91cnMoKTtcblxuXG4gICAgaWYgKGN1cnJlbnRIb3VyID49IDUgJiYgY3VycmVudEhvdXIgPCAxMikge1xuICAgICAgICBzaG93KHN1bnJpc2UpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjdXJyZW50SG91ciA+PSAxMiAmJiBjdXJyZW50SG91ciA8IDE3KSB7XG4gICAgICAgIHNob3cobm9vbik7XG4gICAgfVxuICAgIGVsc2UgaWYgKGN1cnJlbnRIb3VyID49IDE3ICYmIGN1cnJlbnRIb3VyIDwgMjApIHtcbiAgICAgICAgc2hvdyhzdW5zZXQpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgc2hvdyhuaWdodCk7XG4gICAgfVxuXG59XG5cbi8vRnVuY3Rpb24gZm9yIGhpZGluZyBhbGwgYmFja2dyb3VuZCBpbWdzXG5mdW5jdGlvbiBoaWRlQUxMKCkge1xuICAgIHN1bnJpc2Uuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIG5vb24uc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIHN1bnNldC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgbmlnaHQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xufVxuXG4vL0Z1bmN0aW9uIGZvciBkaXNwbGF5aW5nIG9ubHkgb25lIGJhY2tncm91bmRcbmZ1bmN0aW9uIHNob3coZWxlbWVudCkge1xuICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbn0iLCJsZXQgQVBJX0tFWSA9IGNvbmZpZy5BUElfS0VZO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudEZvcmVjYXN0KGNpdHkpIHtcbiAgICB0cnkge1xuICAgICAgICAvL05vcm1hbGl6aW5nIGNpdHkgdGV4dDsgaW1wb3J0YW50IGZvciBkaXNwbGF5aW5nIGNpdHkgbmFtZSBvbiB3ZWJzaXRlXG4gICAgICAgIGNpdHkgPSBjaXR5LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNpdHkgPSBjaXR5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgY2l0eS5zbGljZSgxKTtcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBmZXRjaChcImh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT1cIiArIGNpdHkgKyBcIiZhcHBpZD1cIiArIEFQSV9LRVksIHttb2RlOiBcImNvcnNcIn0pO1xuICAgICAgICBsZXQgd2VhdGhlciA9IGF3YWl0IGRhdGEuanNvbigpO1xuICAgICAgICBsZXQgbGF0ID0gd2VhdGhlci5jb29yZC5sYXQ7XG4gICAgICAgIGxldCBsb24gPSB3ZWF0aGVyLmNvb3JkLmxvbjtcbiAgICAgICAgZ2V0SG91cmx5Rm9yZWNhc3QobGF0LCBsb24sIGNpdHkpO1xuICAgIH1cbiAgICBjYXRjaChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRIb3VybHlGb3JlY2FzdChsYXQsIGxvbiwgY2l0eSkge1xuICAgIHRyeSB7XG4gICAgICAgIC8vbGV0IGRhdGEgPSBhd2FpdCBmZXRjaChcInByby5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3QvaG91cmx5P3E9XCIgKyBjaXR5ICsgXCJhcHBpZD1cIiArIEFQSV9LRVksIHttb2RlOiBcImNvcnNcIn0pO1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L29uZWNhbGw/bGF0PVwiICsgbGF0ICsgXCImbG9uPVwiICsgbG9uICsgXCImYXBwaWQ9MjUyYWRlNTc4YjEwNjcwOWQ5OGRiMjE0ZDA0YzUwNGRcIiwge21vZGU6IFwiY29yc1wifSk7XG4gICAgICAgIGxldCB3ZWF0aGVyID0gYXdhaXQgZGF0YS5qc29uKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGNpdHkpO1xuICAgICAgICBjb25zb2xlLmxvZyh3ZWF0aGVyKTtcbiAgICB9XG4gICAgY2F0Y2goZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2V0Q3VycmVudEZvcmVjYXN0LCBnZXRIb3VybHlGb3JlY2FzdCB9IGZyb20gXCIuL2dldFdlYXRoZXIuanNcIjtcbmltcG9ydCBnZXRCYWNrZ3JvdW5kIGZyb20gXCIuL2JhY2tncm91bmQuanNcIlxuXG5cblxuZ2V0Q3VycmVudEZvcmVjYXN0KFwib3JsYW5kb1wiKTtcbmdldEJhY2tncm91bmQoKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=