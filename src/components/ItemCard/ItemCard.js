import './ItemCard.css'
function ItemCard({ onSelectCard, card }) {
    return (
        <div className="card"  >
            <span className="card__text">{card.name}</span>
            <img src={card.imageUrl} className="card__image" alt='image item' onClick={() => onSelectCard(card)} />
        </div >

    );
}
export default ItemCard;