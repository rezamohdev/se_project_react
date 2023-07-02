import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import { CurrentTempratureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import './App.css'
import { getWeatherForecast, weatherData, weatherName } from '../../utils/WeatherApi';

function App() {
  const [activeModal, setActiveModal] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState({});
  const [temp, setTemp] = React.useState(0);
  const [cardBackground, setCardBackground] = React.useState("Clear");
  const [location, setLocation] = React.useState("");
  const [dayType, setDayType] = React.useState(true);
  // const [isMobileMenuOpened, setIsMobileMenuOpened] = React.useState(false);
  const [currentTempratureUnit, setCurrentTempratureUnit] = React.useState('F');
  function handleToggleSwitchChange(e) {
    currentTempratureUnit === 'C' ? setCurrentTempratureUnit('F') : setCurrentTempratureUnit('C');
  }

  React.useEffect(() => {
    getWeatherForecast().
      then((data) => {
        const weatherCondition = weatherName(data);
        setCardBackground(weatherCondition);
        const currentLocation = data.name;
        setLocation(currentLocation);
        const temperature = weatherData(data);
        setTemp(temperature);
        const sunset = new Date((data.sys.sunset) * 1000);
        const sunrise = new Date((data.sys.sunrise) * 1000);
        if (Date.now() >= sunrise) {
          setDayType(true)
        } else if (Date.now() <= sunset) {
          setDayType(false)
        }
      }).catch((err) => {
        console.error(err);
      });
  }, []);


  const handleOpenModal = () => {
    setActiveModal("open");
  }
  const handleCloseModal = () => {
    setActiveModal("");
  }
  const handleSelectedCard = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  }

  // const toggleMobileMenu = () => {

  // }


  return (
    <div className="app">
      <CurrentTempratureUnitContext.Provider value={{ currentTempratureUnit, handleToggleSwitchChange }}>
        <Header handleOpenModal={handleOpenModal} currenLocation={location} />
        <Main onSelectCard={handleSelectedCard} weatherTemp={temp} cardBackground={cardBackground} dayType={dayType} />
      </CurrentTempratureUnitContext.Provider>
      <Footer />
      {activeModal === "open" && (
        <ModalWithForm title="New garment" onClose={handleCloseModal} name='form' buttonText="Add garment" >
          <fieldset className='form__fieldset'>
            <label htmlFor='name' className='form__label'>Name</label>
            <input type='text' id='name' className='form__input' placeholder='Name' />
            <label htmlFor='url' className='form__label'>Image</label>
            <input id='url' type='url' className='form__input' placeholder='Image URL' />
          </fieldset>
          <fieldset className='form__fieldset'>
            <span className='form__label'>Select the weather type:</span>
            <label htmlFor="wather-hot" className='form__label'><input type='radio' name='weatherType' id='wather-hot' className='form__input' /> Hot</label>
            <label htmlFor="wather-warm" className='form__label'><input type='radio' name='weatherType' id='wather-warm' className='form__input' /> Warm</label>
            <label htmlFor="wather-cold" className='form__label'><input type='radio' name='weatherType' id='wather-cold' className='form__input' /> Cold</label>
          </fieldset>
        </ModalWithForm>)
      }
      {
        activeModal === "preview" && (
          <ItemModal onClose={handleCloseModal} selectedCard={selectedCard}>
          </ItemModal>)
      }
    </div >
  );
}

export default App;
