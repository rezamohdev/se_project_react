function ItemCards({ onSelectCard, item }) {
    return (
        <>

            <div className="card" key={item._id} >
                <span className="card__text">{item.name}</span>
                <img src={item.link} className="card__image" onClick={() => onSelectCard(item)} />
            </div >

            {/* </div > */}
        </>
    );
}
export default ItemCards;