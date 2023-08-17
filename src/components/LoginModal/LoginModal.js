import React from "react";
import './LoginModal.css';
import { useEscape } from '../../hooks/useEscape';
import ModalWithForm from "../ModalWithForm/ModalWithForm";
function LoginModal({ handleSubmit, handleCloseModal, isOpen = { isOpen }, buttonText, handleChange }) {
    return (
        <ModalWithForm isOpen={isOpen} title="Log in" onClose={handleCloseModal} name='login' buttonText={buttonText} onSubmit={handleSubmit}>
            <fieldset className='form__fieldset'>
                <label htmlFor='email' className='form__label'>Email</label>
                <input type='email' id='email' className='form__input' placeholder='Email' name="email" minLength={1} maxLength={30} onChange={handleChange} />
                <label htmlFor='password' className='form__label'>Password</label>
                <input id='password' type='password' className='form__input' placeholder='Password' name="password" onChange={handleChange} />
            </fieldset>
        </ModalWithForm >
    );
}

export default LoginModal;