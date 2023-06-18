import { weatherOptions } from "../utils/utils/constants";


function WeatherBackground({ day, type }) {
    const imageSource = weatherOptions.filter((i) => {
        return i.day === day && i.type === type
    });
    const imageSourceUrl = imageSource[0].url || "";
    return (<>
        <img className='weather__bg' src={imageSourceUrl} />
    </>);
}

export default WeatherBackground;