import React from "react";
import './AddItemModal.css';
import ModalWithForm from "../ModalWithForm/ModalWithForm";
function AddItemModal({ onAddItem, handleCloseModal, isOpen = { isOpen }, }) {
    const [name, setName] = React.useState("");
    const [link, setUrl] = React.useState("");

    const handleNameChange = (e) => {
        console.log(e.target.value);
        setName(e.target.value)
    }

    const handleUrlChange = (e) => {
        console.log(e.target.value);
        setUrl(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddItem({ name, link })
    }
    return (
        <ModalWithForm isOpen={isOpen} title="New garment" onClose={handleCloseModal} name='form' buttonText="Add garment" onSubmit={handleSubmit}>
            <fieldset className='form__fieldset'>
                <label htmlFor='name' className='form__label'>Name</label>
                <input type='text' id='name' className='form__input' placeholder='Name' minLength={1} maxLength={30} value={name} onChange={handleNameChange} />
                <label htmlFor='url' className='form__label'>Image</label>
                <input id='url' type='url' className='form__input' placeholder='Image URL' value={link} onChange={handleUrlChange} />
            </fieldset>
            <fieldset className='form__fieldset'>
                <span className='form__label'>Select the weather type:</span>
                <label htmlFor="wather-hot" className='form__label'><input type='radio' name='weatherType' id='wather-hot' className='form__input' /> Hot</label>
                <label htmlFor="wather-warm" className='form__label'><input type='radio' name='weatherType' id='wather-warm' className='form__input' /> Warm</label>
                <label htmlFor="wather-cold" className='form__label'><input type='radio' name='weatherType' id='wather-cold' className='form__input' /> Cold</label>
            </fieldset>
        </ModalWithForm >

    )
}
export default AddItemModal;