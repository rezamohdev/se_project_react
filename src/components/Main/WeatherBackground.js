const weatherOptions = [
    {
        url: require("../../images/weather_conditions/day-cloudy.svg").default,
        type: 'cloudy',
        day: true
    },
    {
        url: require("../../images/weather_conditions/day-fog.svg").default,
        type: 'fog',
        day: true
    },
    {
        url: require("../../images/weather_conditions/day-rain.svg").default,
        type: 'rain',
        day: true
    },
    {
        url: require("../../images/weather_conditions/day-snow.svg").default,
        type: 'snow',
        day: true
    },
    {
        url: require("../../images/weather_conditions/day-storm.svg").default,
        type: 'storm',
        day: true
    },
    {
        url: require("../../images/weather_conditions/day-sunny.svg").default,
        type: 'sunny',
        day: true
    },
    {
        url: require("../../images/weather_conditions/night-cloudy.svg").default,
        type: 'cloudy',
        day: false
    },
    {
        url: require("../../images/weather_conditions/night-fog.svg").default,
        type: 'fog',
        day: false
    },
    {
        url: require("../../images/weather_conditions/night-moon.svg").default,
        type: 'moon',
        day: false
    },
    {
        url: require("../../images/weather_conditions/night-rain.svg").default,
        type: 'rain',
        day: false
    },
    {
        url: require("../../images/weather_conditions/night-snow.svg").default,
        type: 'snow',
        day: false
    },
    {
        url: require("../../images/weather_conditions/night-storm.svg").default,
        type: 'storm',
        day: false
    },
];


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