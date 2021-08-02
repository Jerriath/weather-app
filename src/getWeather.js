let API_KEY = config.API_KEY;

export async function getCurrentForecast(city) {
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

export async function getHourlyForecast(lat, lon, city) {
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