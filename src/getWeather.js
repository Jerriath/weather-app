let API_KEY = config.API_KEY;

export async function getForecast(city) {
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