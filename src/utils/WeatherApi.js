const latitude = 40.69;
const longitude = -73.97;
const APIkey = "48dd2c71369f97404ad7ca3630020d84";

// https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
export const getWeatherForecast = () => {
    const weatherApi = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`).then(processServerResponse);
    return weatherApi;
}
const processServerResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
}

const weatherData = (data) => {
    const main = data.main;
    const temperature = main && main.temp;
    const weather = {
        temperature: {
            F: Math.round(temperature),
            C: Math.round((temperature - 32) * 5 / 9)
        }
    }
    // return Math.ceil(temperature);
    return { weather };
}
const weatherName = (data) => {
    const name = data.weather[0].main;
    return name;
}
// weather.temperature.F = `${Math.round(data.main.temp)}°F`;
// weather.temperature.C = `${Math.round((data.main.temp - 32) * 5 / 9)}°C`;
export { weatherData, weatherName };