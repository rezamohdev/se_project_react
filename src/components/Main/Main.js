import React from 'react';
import './Main.css';
import { defaultClothingItems } from '../utils/constants';
import WeatherBackground from './WeatherBackground';
import ItemCards from './ItemCards';
function Main({ onSelectCard, temp }) {

    const weatherType = React.useMemo(() => {
        if (temp >= 86) {
            return 'hot';
        } else if (temp >= 66 && temp <= 85) {
            return 'warm';
        } else if (temp <= 65) {
            return 'cold';
        }
    }, [temp]);

    const filteredCards = defaultClothingItems.filter((card) => {
        return card.weather.toLowerCase() === weatherType;
    });

    return (
        <>
            <div className="Main" >
                <section className="weather" id="weather-section" >
                    <span className='weather__temperature'>{temp} °F</span>
                    <WeatherBackground day={true} type='cloudy' />
                </section>
                <section className="items" id="items-section" >
                    <span className='weather__suggest'>Today is {temp}°F / You may want to wear:</span>
                    <div className="card-container">

                        {filteredCards.map((item) => {
                            return (<ItemCards item={item} onSelectCard={onSelectCard} key={item._id} />)
                        }
                        )}
                    </div>
                </section>
            </div>
        </>
    );
}

export default Main;