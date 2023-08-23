import './ItemCard.css'
import likeBackground from '../../images/avatar.svg';
import { useContext, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function ItemCard({ onSelectCard, card, onLikeClick }) {

    const currentUser = useContext(CurrentUserContext);
    const checkLikeStatus = () => {
        card.likes.some(user => user._id === currentUser._id);
    }
    const [isLiked, setIsLiked] = useState(checkLikeStatus);


    const handleLikeClick = () => {
        setIsLiked(!isLiked);
        onLikeClick({ id: card._id, isLiked: !isLiked, user: currentUser })

    }

    return (
        <div className="card"  >
            <div className='card__header'>
                <span className="card__text">{card.name}</span>
                <button className={card.likes.length > 0 ? 'card__like-button_liked' : 'card__like-button'} onClick={handleLikeClick}></button>

            </div>
            <img src={card.imageUrl} className="card__image" alt='image item' onClick={() => onSelectCard(card)} />
        </div >

    );
}
export default ItemCard;