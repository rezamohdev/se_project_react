import { weatherOptions } from "../../utils/constants";
import "./WeatherCard.css";

function WeatherCard({ day, type }) {
    // weatherOptions.find((item) => console.log(item.day === day && item.type === type));
    const weatherOption = weatherOptions.find((item) => {
        return item.day === day && item.type === type
    });
    const imageSourceUrl = weatherOption?.url || "";
    return (
        <img className='weather__bg' src={imageSourceUrl} alt="weather background" />
    );
}

export default WeatherCard;