import React from 'react';
import './Main.css';
import { defaultClothingItems, weatherOptions } from '../utils/constants';
import WeatherBackground from './WeatherBackground';
import ItemCards from './ItemCards';
import { getWeatherForecast, } from '../utils/WeatherApi';
function Main({ onSelectCard, temp, cardBackground }) {
    const [dayType, setDayType] = React.useState(true);

    const weatherType = React.useMemo(() => {
        if (temp >= 86) {
            return 'hot';
        } else if (temp >= 66 && temp <= 85) {
            return 'warm';
        } else if (temp <= 65) {
            return 'cold';
        }
    }, [temp]);


    React.useEffect(() => {
        getWeatherForecast().then((data) => {
            const sunset = new Date((data.sys.sunset) * 1000);
            const sunrise = new Date((data.sys.sunrise) * 1000);
            if (Date.now() >= sunrise) {
                setDayType(true)
            } else if (Date.now() <= sunset) {
                setDayType(false)
            }
        })
    });

    var hr = (new Date().getHours());

    const filteredCards = defaultClothingItems.filter((card) => {
        return card.weather.toLowerCase() === weatherType;
    });
    return (
        <>
            <div className="Main" >
                <section className="weather" id="weather-section" >
                    <span className='weather__temperature'>{temp} °F</span>
                    <WeatherBackground day={dayType} type={cardBackground} />
                </section>
                <section className="items" id="items-section" >
                    <span className='weather__suggest'>Today is {temp}°F / You may want to wear:</span>
                    {/* <p>Weather condition: {cardBackground}</p>
                    <p>Day or night: {`${dayType}`}</p> */}

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