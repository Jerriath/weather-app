/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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


(0,_getWeather_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentForecast)("orlando");
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFTztBQUNQO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxrSEFBa0gsYUFBYTtBQUMvSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBLG9IQUFvSCxhQUFhO0FBQ2pJLDBKQUEwSixhQUFhO0FBQ3ZLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztVQzdCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTndFOztBQUV4RSxrRUFBa0IsWSIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2dldFdlYXRoZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgQVBJX0tFWSA9IGNvbmZpZy5BUElfS0VZO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudEZvcmVjYXN0KGNpdHkpIHtcbiAgICB0cnkge1xuICAgICAgICAvL05vcm1hbGl6aW5nIGNpdHkgdGV4dDsgaW1wb3J0YW50IGZvciBkaXNwbGF5aW5nIGNpdHkgbmFtZSBvbiB3ZWJzaXRlXG4gICAgICAgIGNpdHkgPSBjaXR5LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGNpdHkgPSBjaXR5LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgY2l0eS5zbGljZSgxKTtcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBmZXRjaChcImh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L3dlYXRoZXI/cT1cIiArIGNpdHkgKyBcIiZhcHBpZD1cIiArIEFQSV9LRVksIHttb2RlOiBcImNvcnNcIn0pO1xuICAgICAgICBsZXQgd2VhdGhlciA9IGF3YWl0IGRhdGEuanNvbigpO1xuICAgICAgICBsZXQgbGF0ID0gd2VhdGhlci5jb29yZC5sYXQ7XG4gICAgICAgIGxldCBsb24gPSB3ZWF0aGVyLmNvb3JkLmxvbjtcbiAgICAgICAgZ2V0SG91cmx5Rm9yZWNhc3QobGF0LCBsb24sIGNpdHkpO1xuICAgIH1cbiAgICBjYXRjaChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRIb3VybHlGb3JlY2FzdChsYXQsIGxvbiwgY2l0eSkge1xuICAgIHRyeSB7XG4gICAgICAgIC8vbGV0IGRhdGEgPSBhd2FpdCBmZXRjaChcInByby5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvZm9yZWNhc3QvaG91cmx5P3E9XCIgKyBjaXR5ICsgXCJhcHBpZD1cIiArIEFQSV9LRVksIHttb2RlOiBcImNvcnNcIn0pO1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMi41L29uZWNhbGw/bGF0PVwiICsgbGF0ICsgXCImbG9uPVwiICsgbG9uICsgXCImYXBwaWQ9MjUyYWRlNTc4YjEwNjcwOWQ5OGRiMjE0ZDA0YzUwNGRcIiwge21vZGU6IFwiY29yc1wifSk7XG4gICAgICAgIGxldCB3ZWF0aGVyID0gYXdhaXQgZGF0YS5qc29uKCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGNpdHkpO1xuICAgICAgICBjb25zb2xlLmxvZyh3ZWF0aGVyKTtcbiAgICB9XG4gICAgY2F0Y2goZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZ2V0Q3VycmVudEZvcmVjYXN0LCBnZXRIb3VybHlGb3JlY2FzdCB9IGZyb20gXCIuL2dldFdlYXRoZXIuanNcIjtcblxuZ2V0Q3VycmVudEZvcmVjYXN0KFwib3JsYW5kb1wiKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=