import React from 'react';
import './ModalWithForm.css';
function ModalWithForm({ children, buttonText, title, onClose, name }) {
    return (
        <div className={`modal modal__type_${name}`}>
            <div className='modal__content'>
                <button type="button" className='modal__close' onClick={onClose} />
                <h3 className='modal__title'>{title}</h3>
                <form className='form modal__form' name='modalWithForm'>{children}</form>
                <button className='modal__button' type="submit" >{buttonText}</button>
            </div>
        </div>
    );
}

export default ModalWithForm;