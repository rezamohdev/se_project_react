import React from 'react';
import './Main.css';
import { defaultClothingItems, weatherOptions } from '../../utils/constants';
import WeatherCard from '../WeatherCard/WeatherCard ';
import ItemCard from '../ItemCard/ItemCard';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
function Main({ onSelectCard, weatherTemp, cardBackground, dayType, cards }) {
    const { currentTemperatureUnit } = React.useContext(CurrentTemperatureUnitContext);
    const temp = weatherTemp?.temprature?.[currentTemperatureUnit] || 999;
    const currenTemp = weatherTemp?.weather?.temperature?.[currentTemperatureUnit];
    const getWeatherType = () => {
        if (temp >= 86) {
            return 'hot';
        } else if (temp >= 66 && temp <= 85) {
            return 'warm';
        } else if (temp <= 65) {
            return 'cold';
        }
    }
    const weatherType = getWeatherType();

    const filteredCards = cards.filter((card) => {
        return card.weather.toLowerCase() === weatherType;
    });
    return (
        <main className="Main" >
            <section className="weather" id="weather-section" >
                <WeatherCard day={dayType} type={cardBackground} temperature={weatherTemp} />
            </section>
            <section className="items" id="items-section" >
                <span className='weather__suggest'>Today is {currenTemp}{currentTemperatureUnit === 'F' ? '°F' : '°C'} / You may want to wear:</span>
                {/* {/* <p>Weather condition: {cardBackground}</p> */}
                {/* <p>Day or night: {`${dayType}`}</p> */}

                <div className="card-container">
                    {filteredCards.map((item) => {
                        return (<ItemCard card={item} onSelectCard={onSelectCard} key={item._id} />)
                    }
                    )}
                </div>
            </section>
        </main>
    );
}

export default Main;