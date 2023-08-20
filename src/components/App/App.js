import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './App.css'
import { getWeatherForecast, weatherData, weatherName } from '../../utils/WeatherApi';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, useHistory } from 'react-router-dom/cjs/react-router-dom';
import Profile from '../Profile/Profile';
import AddItemModal from '../AddItemModal/AddItemModal';
import api from '../../utils/Api';
import auth from '../../utils/auth';
import DeleteConfirmationModal from '../DeleteConfirmationModal/DeleteConfirmationModal';
import { useEscape } from '../../hooks/useEscape';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../RegisterModal/RegisterModal ';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

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
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currecnUser, setCurrentUser] = React.useState({});
  const history = useHistory();


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
        getItemList();

        // Weather Api catch
      }).catch((err) => {
        console.error(err);
      });
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      handleTokenCheck(token).finally(() => setIsLoading(false))
    } else {
      setIsLoggedIn(false);
    }
  }, [setCurrentUser, setIsLoggedIn, handleTokenCheck])

  function getItemList() {
    // here we create a function that returns a promise 
    function makeRequest() {
      // `return` lets us use a promise chain `then, catch, finally`
      return api.getItemList().then((data) => {
        setClothingItems(data);
        // daatabase api catch
      }).catch((err) => {
        console.error(err);
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
  function onRegisterUser({ name, avatar, email, password }) {
    function makeRequest() {
      return auth.signupUser({ name, avatar, email, password }).then((user) => {
        console.log(user);
        history.push('/signin');
        handleCloseModal();
      })
    }
    handleSubmit(makeRequest);
  }
  function onSignInUser({ email, password }) {
    function makeRequest() {
      return auth.signinUser({ email, password }).then((data) => {
        if (data.token) {
          console.log(data);
          handleLogin();
          setCurrentUser(data);
          history.push('/profile')
          handleCloseModal();
        }

      })
    }
    handleSubmit(makeRequest);
  }
  function handleTokenCheck(token) {
    if (token) {
      return auth.checkToken(token).then((res) => {
        handleLogin();
        setCurrentUser(res.data);
      }).catch(err => {
        console.error(err);
      });
      history.push('/profile');

    }
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
  const handleLogin = () => {
    setIsLoggedIn(true);
  }
  const openConfirmationModal = () => {
    console.log('confrim delete modal opened!');
    setActiveModal("confirm")
  }
  const handleOpenLoginModal = () => {
    setActiveModal('login');
  }
  const handleOpenSignupModal = () => {
    setActiveModal('register')
  }
  useEscape(handleCloseModal)

  // const toggleMobileMenu = () => {

  // }


  return (
    <CurrentUserContext.Provider value={currecnUser}>
      <div className="app">
        <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
          <Header isLoggedIn={isLoggedIn} handleOpenModal={handleOpenModal} currenLocation={location} handleOpenLoginModal={handleOpenLoginModal} handleOpenSignupModal={handleOpenSignupModal} />
          <Switch>
            <Route exact path="/">
              <Main onSelectCard={handleSelectedCard} cards={clothingItems} weatherTemp={temp} cardBackground={cardBackground} dayType={dayType} />
            </Route>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/profile" >
              <Profile cards={clothingItems} onSelectCard={handleSelectedCard} handleOpenModal={handleOpenModal} />
            </ProtectedRoute>
          </Switch>
        </CurrentTemperatureUnitContext.Provider>
        <Footer />
        {activeModal === "open" && (<AddItemModal handleCloseModal={handleCloseModal} isOpen={activeModal === "open"} onAddItem={handleOnAddItem}
          buttonText={isLoading ? 'Saving...' : 'Add garment'}
        />)}
        {activeModal === "preview" && (<ItemModal onClose={handleCloseModal} selectedCard={selectedCard} onDeleteItem={openConfirmationModal}> </ItemModal>)}
        {activeModal === "confirm" && (<DeleteConfirmationModal onClose={handleCloseModal} onDeleteConfirm={() => handleCardDelete(selectedCard)} buttonText={isLoading ? 'Deleting...' : 'Yes, delete item'} />)}
        {activeModal === "login" && (
          <LoginModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "login"}
            buttonText='Login'
            handleOpenSignupModal={handleOpenSignupModal}
            onSignInUser={onSignInUser}
          />)}
        {activeModal === "register" && (
          <RegisterModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "login"}
            buttonText='Next'
            handleOpenLoginModal={handleOpenLoginModal}
            handleOpenSignupModal={handleOpenSignupModal}
            onRegisterUser={onRegisterUser} />)}
      </div >
    </CurrentUserContext.Provider>
  );
}

export default App;
