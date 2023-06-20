import React from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import ModalWithForm from './components/ModalWithForm/ModalWithForm';
import ItemModal from './components/ItemModal/ItemModal';
import { getWeatherForecast, weatherData, weatherName } from './utils/WeatherApi';

function App() {
  const [activeModal, setActiveModal] = React.useState("");
  const [selectedCard, setSelectedCard] = React.useState({});
  const [temp, setTemp] = React.useState(0);
  const [cardBackground, setCardBackground] = React.useState("Clear");
  React.useEffect(() => {
    getWeatherForecast().then((data) => {
      const weatherCondition = weatherName(data);
      setCardBackground(weatherCondition);
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
  React.useEffect(() => {
    getWeatherForecast().then((data) => {
      const temperature = weatherData(data);
      setTemp(temperature);
    });
  }, []);

  return (
    <div className="App">
      <Header handleOpenModal={handleOpenModal} />
      <Main onSelectCard={handleSelectedCard} temp={temp} cardBackground={cardBackground} />
      <Footer />
      {activeModal === "open" && (
        <ModalWithForm title="New garment" onClose={handleCloseModal} name='form'>
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
        </ModalWithForm>)}
      {activeModal === "preview" && (
        <ItemModal onClose={handleCloseModal} selectedCard={selectedCard}>
        </ItemModal>)}
    </div>
  );
}

export default App;
