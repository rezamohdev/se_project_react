import React from "react";
import { weatherOptions } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import "./WeatherCard.css";

function WeatherCard({ day, type, temperature }) {
    const { currentTempratureUnit } = React.useContext(CurrentTemperatureUnitContext);

    console.log(temperature?.weather?.temperature?.F);
    // weatherOptions.find((item) => console.log(item.day === day && item.type === type));
    const weatherOption = weatherOptions.find((item) => {
        return item.day === day && item.type === type
    });
    const imageSourceUrl = weatherOption?.url || "";
    return (
        <div className="weather-card">
            <span className='weather__temperature'>{currentTempratureUnit === 'F' ? temperature?.weather?.temperature?.F : temperature?.weather?.temperature?.C} {currentTempratureUnit === 'F' ? '°F' : '°C'}</span>
            <img className='weather__bg' src={imageSourceUrl} alt="weather background" />
        </div>
    );
}

export default WeatherCard;