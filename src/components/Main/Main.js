import './Main.css';
import WeatherBackground from './WeatherBackground';
import ItemCards from './ItemCards';
function Main({ onSelectCard, temp }) {

    return (
        <>
            <div className="Main" >
                <section className="weather" id="weather-section" >
                    <span className='weather__temperature'>{temp} °F</span>
                    <WeatherBackground day={true} type='cloudy' />
                </section>
                <section className="items" id="items-section" >
                    <span className='weather__suggest'>Today is {temp}°F / You may want to wear:</span>
                    <ItemCards onSelectCard={onSelectCard} />
                </section>
            </div>
        </>
    );
}

export default Main;