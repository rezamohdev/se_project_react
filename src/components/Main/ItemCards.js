import React from 'react';

// import { defaultClothingItems } from "../utils/constants";
import { defaultClothingItems } from '../utils/constants';
function ItemCards({ onSelectCard }) {
    return (
        <>
            <div className="card-container">
                {defaultClothingItems.map((item) => {
                    return (
                        <div className="card" key={item._id} >
                            <span className="card__text">{item.name}</span>
                            <img src={item.link} className="card__image" onClick={() => onSelectCard(item)} />
                        </div >
                    )
                })}
            </div >
        </>
    );
}
export default ItemCards;