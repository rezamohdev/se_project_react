import { weatherOptions } from "../utils/constants";

function WeatherBackground({ day, type }) {
    const imageSource = weatherOptions.filter((i) => {
        return i.day === day && i.type === type
    });
    console.log(imageSource[0])
    console.log(imageSource)
    const imageSourceUrl = imageSource[0].url || "";
    { console.log(imageSource[0].url) }
    return (<>
        <img className='weather__bg' src={imageSourceUrl} />
    </>);
}

export default WeatherBackground;