const latitude = 40.20;
const longitude = -76.89;
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
    return Math.ceil(temperature);
}
const weatherName = (data) => {
    const name = data.weather[0].main;
    return name;
}
export { weatherData, weatherName };