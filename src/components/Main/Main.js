import React from 'react';
import './Main.css';
import { defaultClothingItems, weatherOptions } from '../../utils/constants';
import WeatherBackground from '../WeatherCard/WeatherCard ';
import ItemCard from '../ItemCard/ItemCard';
import { CurrentTempratureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
function Main({ onSelectCard, weatherTemp, cardBackground, dayType }) {
    const { currentTempratureUnit } = React.useContext(CurrentTempratureUnitContext);
    console.log(currentTempratureUnit);
    const temp = weatherTemp?.temprature?.[currentTempratureUnit] || 999;
    console.log(weatherTemp);
    const getWeatherType = () => {
        if (temp >= 86) {
            return 'hot';
        } else if (temp >= 66 && temp <= 85) {
            return 'warm';
        } else if (temp <= 65) {
            return 'cold';
        }
    }
    console.log(temp);
    const weatherType = getWeatherType();

    const filteredCards = defaultClothingItems.filter((card) => {
        return card.weather.toLowerCase() === weatherType;
    });
    return (
        <div className="Main" >
            <section className="weather" id="weather-section" >
                <span className='weather__temperature'>{temp} °F</span>
                <WeatherBackground day={dayType} type={cardBackground} />
            </section>
            <section className="items" id="items-section" >
                <span className='weather__suggest'>Today is {temp}°F / You may want to wear:</span>
                {/* {/* <p>Weather condition: {cardBackground}</p> */}
                {/* <p>Day or night: {`${dayType}`}</p> */}

                <div className="card-container">
                    {filteredCards.map((item) => {
                        return (<ItemCard item={item} onSelectCard={onSelectCard} key={item._id} />)
                    }
                    )}
                </div>
            </section>
        </div>
    );
}

export default Main;