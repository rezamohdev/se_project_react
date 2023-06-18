import './Main.css';
import WeatherBackground from './WeatherBackground';
function Main() {
    return (
        <>
            <div className="Main" >
                <section className="weather" id="weather-section" >
                    <span className='weather__temperature'>23°C</span>
                    <WeatherBackground day={true} type='sunny' />
                </section>
                <section className="items" id="items-section" ></section>
            </div>
        </>
    );
}

export default Main;