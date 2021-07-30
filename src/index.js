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