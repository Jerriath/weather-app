/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
let API_KEY = config.API_KEY;

async function getCityWeather(city) {
    try {
        let data = await fetch("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY, {mode: "cors"});
        let weather = await data.json();
        console.log(weather);
    }
    catch(err) {
        console.log(err);
    }
}
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBOztBQUVBO0FBQ0E7QUFDQSxrSEFBa0gsYUFBYTtBQUMvSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IEFQSV9LRVkgPSBjb25maWcuQVBJX0tFWTtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0Q2l0eVdlYXRoZXIoY2l0eSkge1xuICAgIHRyeSB7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgZmV0Y2goXCJodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzIuNS93ZWF0aGVyP3E9XCIgKyBjaXR5ICsgXCImYXBwaWQ9XCIgKyBBUElfS0VZLCB7bW9kZTogXCJjb3JzXCJ9KTtcbiAgICAgICAgbGV0IHdlYXRoZXIgPSBhd2FpdCBkYXRhLmpzb24oKTtcbiAgICAgICAgY29uc29sZS5sb2cod2VhdGhlcik7XG4gICAgfVxuICAgIGNhdGNoKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn0iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=