import './Main.css';
import WeatherBackground from './WeatherBackground';
import ItemCards from './ItemCards';
function Main() {
    const weatherTemp = "26°C";
    return (
        <>
            <div className="Main" >
                <section className="weather" id="weather-section" >
                    <span className='weather__temperature'>{weatherTemp}</span>
                    <WeatherBackground day={true} type='cloudy' />
                </section>
                <section className="items" id="items-section" >
                    <span className='weather__suggest'>Today is {weatherTemp} / You may want to wear:</span>
                    <ItemCards />
                </section>
            </div>
        </>
    );
}

export default Main;