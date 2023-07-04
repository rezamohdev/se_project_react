import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import './App.css'
import { getWeatherForecast, weatherData, weatherName } from '../../utils/WeatherApi';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route } from 'react-router-dom/cjs/react-router-dom';
import Profile from '../Profile/Profile';
import AddItemModal from '../AddItemModal/AddItemModal';
import api from '../../utils/Api';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import { useEscape } from '../../hooks/useEscape';

function App() {

  const [activeModal, setActiveModal] = React.useState("");
  // const [isMobileMenuOpened, setIsMobileMenuOpened] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [temp, setTemp] = React.useState(0);
  const [cardBackground, setCardBackground] = React.useState("Clear");
  const [location, setLocation] = React.useState("");
  const [dayType, setDayType] = React.useState(true);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = React.useState('F');
  const [clothingItems, setClothingItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);


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
        // getting items
        // here is an example
        getItemList();



        // Weather Api catch
      }).catch((err) => {
        console.error(err);
      });
  }, []);

  function getItemList() {
    // here we create a function that returns a promise 
    function makeRequest() {
      // `return` lets us use a promise chain `then, catch, finally`
      return api.getItemList().then((data) => {
        setClothingItems(data);
        // daatabase api catch
      });
    }
    // here we call handleSubmit passing the request
    handleSubmit(makeRequest);
  }

  function handleSubmit(request) {
    // start loading
    setIsLoading(true);
    request()
      // we need to close only in `then`
      .then(handleCloseModal)
      // we need to catch possible errors
      // console.error is used to handle errors if you don’t have any other ways for that
      .catch(console.error)
      // and in finally we need to stop loading
      .finally(() => setIsLoading(false));
  }

  function handleOnAddItem(item) {
    // here we create a function that returns a promise 
    function makeRequest() {
      // `return` lets us use a promise chain `then, catch, finally`
      return api.addItem(item).then((newItem) => {
        console.log(newItem);
        setClothingItems([newItem, ...clothingItems]);
        handleCloseModal();
      });
    }
    // here we call handleSubmit passing the request
    handleSubmit(makeRequest);
  }

  function handleCardDelete(card) {
    // here we create a function that returns a promise 
    function makeRequest() {
      // `return` lets us use a promise chain `then, catch, finally`
      return api.addItem(card).then(() => {
        setClothingItems((cards) => cards.filter((c) => c.id !== card.id));
        handleCloseModal();
      });
    }
    // here we call handleSubmit passing the request
    handleSubmit(makeRequest);
  }

  const handleToggleSwitchChange = (e) => {
    currentTemperatureUnit === 'C' ? setCurrentTemperatureUnit('F') : setCurrentTemperatureUnit('C');
  }
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
  const openConfirmationModal = () => {
    console.log('confrim delete modal opened!');
    setActiveModal("confirm")
  }
  useEscape(handleCloseModal)


  // const toggleMobileMenu = () => {

  // }


  return (
    <div className="app">
      <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
        <Header handleOpenModal={handleOpenModal} currenLocation={location} />
        <Switch>
          <Route exact path="/">
            <Main onSelectCard={handleSelectedCard} cards={clothingItems} weatherTemp={temp} cardBackground={cardBackground} dayType={dayType} />
          </Route>
          <Route path="/profile">
            <Profile cards={clothingItems} onSelectCard={handleSelectedCard} handleOpenModal={handleOpenModal} />
          </Route>
        </Switch>
      </CurrentTemperatureUnitContext.Provider>
      <Footer />
      {activeModal === "open" && (<AddItemModal handleCloseModal={handleCloseModal} isOpen={activeModal === "open"} onAddItem={handleOnAddItem}
        buttonText={isLoading ? 'Saving...' : 'Add garment'}
      />)}
      {activeModal === "preview" && (<ItemModal onClose={handleCloseModal} selectedCard={selectedCard} onDeleteItem={openConfirmationModal}> </ItemModal>)}
      {activeModal === "confirm" && (<DeleteConfirmationModal onClose={handleCloseModal} onDeleteConfirm={() => handleCardDelete(selectedCard)} buttonText={isLoading ? 'Deleting...' : 'Yes, delete item'} />)}
    </div >
  );
}

export default App;
