const latitude = 44.34;
const longitude = 10.99;
const APIkey = "48dd2c71369f97404ad7ca3630020d84";
// https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}
export const getWeatherForecast = () => {
    const weatherApi = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`).then(res => {
        console.log(res);
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Error: ${res.status}`);
        }
    });
    console.log(weatherApi)
    return weatherApi;
}

const weatherData = (data) => {
    console.log(data);
    const main = data.main;
    const temperature = main && main.temp;
    console.log(Math.ceil(temperature));
    return Math.ceil(temperature);
}
export { weatherData };