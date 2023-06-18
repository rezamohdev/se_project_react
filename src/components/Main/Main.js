import './Main.css';
function Main() {
    return (
        <>
            <div className="Main" >
                <section className="weather" id="weather-section" >
                    <span className='weather__temperature'>23°C</span>
                    <img className='weather__bg' src='images/weather_conditions/day-cloudy.svg' />
                </section>
                <section className="items" id="items-section" ></section>
            </div>
        </>
    );
}

export default Main;