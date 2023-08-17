import React from 'react';
import './ModalWithForm.css';
import { useEscape } from '../../hooks/useEscape';
function ModalWithForm({ children, footerChildren, buttonText, title, onClose, name, isOpen, onSubmit, handleOpenSignupModal }) {
    return (
        <div className={`modal modal__type_${name}`}>
            <div className='modal__content'>
                <button type="button" className='modal__close' onClick={onClose} />
                <h3 className='modal__title'>{title}</h3>
                <form className='form modal__form' name={name} onSubmit={onSubmit}>
                    {children}
                    <link to="/signup" onClick={handleOpenSignupModal} className='modal__button' type="submit" >{buttonText}</link>

                </form>
            </div>
        </div>
    );
}

export default ModalWithForm;