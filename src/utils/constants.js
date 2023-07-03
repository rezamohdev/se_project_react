// day backgrounds
import dayCloud from "../images/weather_conditions/day-cloudy.svg"
import dayRain from "../images/weather_conditions/day-rain.svg";
import dayFog from "../images/weather_conditions/day-fog.svg";
import daySnow from "../images/weather_conditions/day-snow.svg";
import dayStrom from "../images/weather_conditions/day-storm.svg";
import dayClear from "../images/weather_conditions/day-sunny.svg";
import dayMist from "../images/weather_conditions/day-mist.svg";

// night backgrounds
import nightCloud from "../images/weather_conditions/night-cloudy.svg"
import nightRain from "../images/weather_conditions/night-rain.svg";
import nightFog from "../images/weather_conditions/night-fog.svg";
import nightSnow from "../images/weather_conditions/night-snow.svg";
import nightStrom from "../images/weather_conditions/night-storm.svg";
import nightClear from "../images/weather_conditions/night-moon.svg";
import nightMist from "../images/weather_conditions/night-mist.svg";

// weather conditions array
const weatherOptions = [
    {
        url: dayCloud,
        type: 'Clouds',
        day: true
    },
    {
        url: dayFog,
        type: 'Fog',
        day: true
    },
    {
        url: dayRain,
        type: 'Rain',
        day: true
    },
    {
        url: daySnow,
        type: 'Snow',
        day: true
    },
    {
        url: dayStrom,
        type: 'Thunderstorm',
        day: true
    },
    {
        url: dayClear,
        type: 'Clear',
        day: true
    },
    {
        url: dayFog,
        type: 'Mist',
        day: true
    },
    {
        url: dayFog,
        type: 'Haze',
        day: true
    },
    {
        url: nightCloud,
        type: 'Clouds',
        day: false
    },
    {
        url: nightFog,
        type: 'Fog',
        day: false
    },
    {
        url: nightClear,
        type: 'Clear',
        day: false
    },
    {
        url: nightRain,
        type: 'Rain',
        day: false
    },
    {
        url: nightSnow,
        type: 'Snow',
        day: false
    },
    {
        url: nightStrom,
        type: 'Thunderstorm',
        day: false
    },
    {
        url: nightFog,
        type: 'Mist',
        day: false
    },
    {
        url: nightFog,
        type: 'Haze',
        day: false
    },
];
export { weatherOptions };