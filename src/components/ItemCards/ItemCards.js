import './ItemCards.css'
function ItemCards({ onSelectCard, item }) {
    return (
        <>
            <div className="card"  >
                <span className="card__text">{item.name}</span>
                <img src={item.link} className="card__image" onClick={() => onSelectCard(item)} />
            </div >

        </>
    );
}
export default ItemCards;