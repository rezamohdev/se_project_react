import { weatherOptions } from "../../utils/constants";

function WeatherBackground({ day, type }) {
    // weatherOptions.find((item) => console.log(item.day === day && item.type === type));
    const weatherOption = weatherOptions.find((item) => {
        console.log(item.day === day && item.type === type);
        return item.day === day && item.type === type
    });
    const imageSourceUrl = weatherOption?.url || "";
    console.log(weatherOption?.url);
    return (
        <img className='weather__bg' src={imageSourceUrl} alt="weather background" />
    );
}

export default WeatherBackground;