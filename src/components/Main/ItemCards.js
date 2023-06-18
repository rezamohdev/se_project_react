import { defaultClothingItems } from "../utils/utils/constants";
function ItemCards() {
    return (
        <>
            <div className="card-container">
                {defaultClothingItems.map((item) => {
                    { console.log(item.link) }
                    return (
                        <div className="card" >
                            <span className="card__text">{item.name}</span>
                            <img src={item.link} className="card__image" />
                        </div >
                    )
                })}
            </div >
        </>
    );
}
export default ItemCards;