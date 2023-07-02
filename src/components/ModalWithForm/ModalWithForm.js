import React from 'react';
import './ModalWithForm.css';
function ModalWithForm({ children, buttonText, title, onClose, name, isOpen, onSubmit }) {
    return (
        <div className={`modal modal__type_${name}`}>
            <div className='modal__content'>
                <button type="button" className='modal__close' onClick={onClose} />
                <h3 className='modal__title'>{title}</h3>
                <form className='form modal__form' name='modalWithForm' onSubmit={onSubmit}>
                    {children}
                    <button className='modal__button' type="submit" >{buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default ModalWithForm;