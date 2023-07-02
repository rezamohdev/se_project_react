import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import { CurrentTempratureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import './App.css'
import { getWeatherForecast, weatherData, weatherName } from '../../utils/WeatherApi';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import Profile from '../Profile/Profile';
import AddItemModal from '../AddItemModal/AddItemModal';

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
  const handleOnAddItem = (values) => {
    console.log(values)
  }
  // const toggleMobileMenu = () => {

  // }


  return (
    <div className="app">
      <CurrentTempratureUnitContext.Provider value={{ currentTempratureUnit, handleToggleSwitchChange }}>
        <Header handleOpenModal={handleOpenModal} currenLocation={location} />

        <Switch>
          <Route exact path="/">
            <Main onSelectCard={handleSelectedCard} weatherTemp={temp} cardBackground={cardBackground} dayType={dayType} />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </CurrentTempratureUnitContext.Provider>
      <Footer />
      {activeModal === "open" && (<AddItemModal handleCloseModal={handleCloseModal} isOpen={activeModal === "open"} onAddItem={handleOnAddItem} />)}
      {activeModal === "preview" && (<ItemModal onClose={handleCloseModal} selectedCard={selectedCard}> </ItemModal>)}
    </div >
  );
}

export default App;
