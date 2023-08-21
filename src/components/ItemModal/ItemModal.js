import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './ItemModal.css';
function ItemModal({ onClose, selectedCard, onDeleteItem }) {
    const currentUser = React.useContext(CurrentUserContext);
    // Checking if the current user is the owner of the current clothing item
    const isOwn = selectedCard.owner === currentUser._id;
    // isOwn ? console.log('t') : console.log('f');
    console.log(selectedCard.owner);
    const itemDeleteButtonClassName = (
        `modal__delete-button ${isOwn ? 'modal__delete-button_visible' : 'modal__delete-button_hidden'}`
    );

    return (
        <div className={`modal modal__type_image`}>
            <div className='modal__content'>
                <div className="modal__body" >
                    <button type="button" className='modal__close' onClick={onClose} />
                    <img src={selectedCard.imageUrl} className="modal__image" alt="image of modal" />
                </div>
                <div className='modal__footer' >
                    <div className='modal__footer-top'>
                        <p className='modal__paragraph modal__item-name'>{selectedCard.name}</p>
                        <button className={itemDeleteButtonClassName} onClick={onDeleteItem}>Delete item</button>
                    </div>
                    <p className='modal__paragraph modal__weather-type'>Weather: {selectedCard.weather}</p>
                </div>
            </div>
        </div>
    );
}

export default ItemModal;