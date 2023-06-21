import { weatherOptions } from "../../utils/constants";

function WeatherBackground({ day, type }) {
    const imageSource = weatherOptions.filter((i) => {
        return i.day === day && i.type === type
    });
    const imageSourceUrl = imageSource[0].url || "";
    return (
        <img className='weather__bg' src={imageSourceUrl} alt="weather background" />
    );
}

export default WeatherBackground;