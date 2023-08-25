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
import EditProfileModal from '../EditProfileModal/EditProfileModal';

function App() {

  const [activeModal, setActiveModal] = React.useState("");
  // const [isMobileMenuOpened, setIsMobileMenuOpened] = React.useState(false);
  const [temp, setTemp] = React.useState(0);
  const [token, setToken] = React.useState(localStorage.getItem('jwt'));
  const [cardBackground, setCardBackground] = React.useState("Clear");
  const [selectedCard, setSelectedCard] = React.useState({});
  const [location, setLocation] = React.useState("");
  const [dayType, setDayType] = React.useState(true);
  const [clothingItems, setClothingItems] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = React.useState('F');
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
    // const token = localStorage.getItem('jwt');
    if (token) {
      handleTokenCheck(token)
        .finally(() => {
          setIsLoading(true);
          setIsLoggedIn(true);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, [token])

  function getItemList() {
    // here we create a function that returns a promise 
    function makeRequest() {
      // `return` lets us use a promise chain `then, catch, finally`
      return api.getItemList().then((data) => {
        setClothingItems(data);
        // daatabase api catch
      })
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
      return api.addItem(item, token)
        .then((newItem) => {
          console.log(newItem);
          setClothingItems([newItem, ...clothingItems]);
        });
    }
    // here we call handleSubmit passing the request
    handleSubmit(makeRequest);
  }

  function handleCardDelete(item) {
    // here we create a function that returns a promise 
    function makeRequest() {
      // `return` lets us use a promise chain `then, catch, finally`
      return api.removeItem(item._id, token).then(() => {
        setClothingItems((cards) => cards.filter((card) => card._id !== item._id));
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
      })
    }
    handleSubmit(makeRequest);
  }
  function onSignInUser({ email, password }) {
    function makeRequest() {
      return auth.signinUser({ email, password }).then((data) => {
        if (data.token) {
          console.log('sign in data', data);
          setIsLoggedIn(true);
          localStorage.setItem('jwt', data.token)
          // setCurrentUser(data);
          handleTokenCheck(data.token);
          history.push('/profile')
        }

      })
    }
    handleSubmit(makeRequest);
  }
  function onLogoutUser() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
  }
  function onUpdateUser({ name, avatar }) {
    function makeRequest() {
      return auth.updateUser({ name, avatar }, token)
        .then((res) => {
          setCurrentUser(res);
          console.log(res);
        })
    }
    handleSubmit(makeRequest);
  }
  function handleTokenCheck(token) {
    if (token) {
      return auth.checkToken(token)
        .then((res) => {
          setCurrentUser(res);
          history.push('/profile');
        }).catch(err => {
          console.error(err);
        });

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
  const handleLikeClick = ({ id, isLiked, currecnUser }) => {
    // Check if this card is now liked
    isLiked
      ? // if so, send a request to add the user's id to the card's likes array
      api
        // the first argument is the card's id
        .addItemLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((c) => (c._id === id ? updatedCard : c))
          );
        })
        .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
      api
        // the first argument is the card's id
        .removeItemLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((c) => (c._id === id ? updatedCard : c))
          );
        })
        .catch(console.error);
  };
  const openConfirmationModal = () => {
    console.log('confrim delete modal opened!');
    setActiveModal("confirm")
  }
  const handleOpenLoginModal = () => {
    setActiveModal('login');
  }
  const handleOpenEditModal = () => {
    setActiveModal('edit');
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
              <Main
                isLoggedIn={isLoggedIn}
                onCardLike={handleLikeClick}
                onSelectCard={handleSelectedCard} cards={clothingItems} weatherTemp={temp} cardBackground={cardBackground} dayType={dayType} />
            </Route>
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/profile" >
              <Profile
                isLoggedIn={isLoggedIn}
                cards={clothingItems}
                onSelectCard={handleSelectedCard}
                handleOpenModal={handleOpenModal}
                handleOpenEditModal={handleOpenEditModal}
                onUpdateUser={onUpdateUser}
                onCardLike={handleLikeClick}
                onLogoutUser={onLogoutUser}

              />
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
            buttonText={isLoading ? 'Logging in...' : 'Login'}
            handleOpenSignupModal={handleOpenSignupModal}
            onSignInUser={onSignInUser}
          />)}
        {activeModal === "register" && (
          <RegisterModal
            handleCloseModal={handleCloseModal}
            isOpen={activeModal === "register"}
            buttonText='Next'
            handleOpenLoginModal={handleOpenLoginModal}
            handleOpenSignupModal={handleOpenSignupModal}
            onRegisterUser={onRegisterUser} />)}
      </div >
      {activeModal === "edit" && (
        <EditProfileModal
          handleCloseModal={handleCloseModal}
          isOpen={activeModal === 'edit'}
          onUpdateUser={onUpdateUser}
          buttonText={isLoading ? 'Saving Changes...' : 'Save Changes'} />)}
    </CurrentUserContext.Provider>
  );
}

export default App;
