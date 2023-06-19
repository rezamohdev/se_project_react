import React from 'react';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import ModalWithForm from './components/ModalWithForm/ModalWithForm';

function App() {
  const [activeModal, setActiveModal] = React.useState("");

  const handleOpenModal = () => {
    setActiveModal("open");
  }
  const handleCloseModal = () => {
    setActiveModal("");
  }

  return (
    <div className="App">
      <Header onAddItem={handleOpenModal} />
      <Main />
      <Footer />
      {activeModal === "open" && (
        <ModalWithForm title="New garment" onClose={handleCloseModal}>
          <fieldset className='form__fieldset'>
            <label className='form__label'>Name</label>
            <input type='text' className='form__input' placeholder='Name' />
            <label className='form__label'>Image</label>
            <input type='url' className='form__input' placeholder='Image URL' />
          </fieldset>
          <fieldset className='form__fieldset'>
            <span for="wather-type" className='form__label'>Select the weather type:</span>
            <label for="wather-hot" className='form__label'><input type='radio' name='weatherType' id='wather-hot' className='form__input' /> Hot</label>
            <label for="wather-warm" className='form__label'><input type='radio' name='weatherType' id='wather-warm' className='form__input' /> Warm</label>
            <label for="wather-cold" className='form__label'><input type='radio' name='weatherType' id='wather-cold' className='form__input' /> Cold</label>
          </fieldset>
        </ModalWithForm>)}
    </div>
  );
}

export default App;
