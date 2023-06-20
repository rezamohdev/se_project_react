// default clothing items array
const defaultClothingItems = [
    {
        _id: 0,
        name: "Cap",
        weather: "hot",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png?etag=f3dad389b22909cafa73cff9f9a3d591",
    },
    {
        _id: 1,
        name: "Hoodie",
        weather: "warm",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png?etag=5f52451d0958ccb1016c78a45603a4e8",
    },
    {
        _id: 2,
        name: "Jacket",
        weather: "cold",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png?etag=f4bb188deaa25ac84ce2338be2d404ad",
    },
    {
        _id: 3,
        name: "Sneakers",
        weather: "cold",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png?etag=3efeec41c1c78b8afe26859ca7fa7b6f",
    },
    {
        _id: 4,
        name: "T-Shirt",
        weather: "hot",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png?etag=44ed1963c44ab19cd2f5011522c5fc09",
    },
    {
        _id: 5,
        name: "Winter coat",
        weather: "cold",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png?etag=298717ed89d5e40b1954a1831ae0bdd4",
    }
];


// weather conditions array
const weatherOptions = [
    {
        url: require("../images/weather_conditions/day-cloudy.svg").default,
        type: 'Clouds',
        day: true
    },
    {
        url: require("../images/weather_conditions/day-fog.svg").default,
        type: 'Fog',
        day: true
    },
    {
        url: require("../images/weather_conditions/day-rain.svg").default,
        type: 'Rain',
        day: true
    },
    {
        url: require("../images/weather_conditions/day-snow.svg").default,
        type: 'Snow',
        day: true
    },
    {
        url: require("../images/weather_conditions/day-storm.svg").default,
        type: 'Thunderstorm',
        day: true
    },
    {
        url: require("../images/weather_conditions/day-sunny.svg").default,
        type: 'Clear',
        day: true
    },
    {
        url: require("../images/weather_conditions/night-cloudy.svg").default,
        type: 'Clouds',
        day: false
    },
    {
        url: require("../images/weather_conditions/night-fog.svg").default,
        type: 'Fog',
        day: false
    },
    {
        url: require("../images/weather_conditions/night-moon.svg").default,
        type: 'Clear',
        day: false
    },
    {
        url: require("../images/weather_conditions/night-rain.svg").default,
        type: 'Rain',
        day: false
    },
    {
        url: require("../images/weather_conditions/night-snow.svg").default,
        type: 'Snow',
        day: false
    },
    {
        url: require("../images/weather_conditions/night-storm.svg").default,
        type: 'Thunderstorm',
        day: false
    },
];
export { defaultClothingItems, weatherOptions };