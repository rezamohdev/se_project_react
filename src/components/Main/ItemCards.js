import React from 'react';

import { defaultClothingItems } from "../utils/utils/constants";
function ItemCards() {
    return (
        <>
            <div className="card-container">
                {defaultClothingItems.map((item) => {
                    return (
                        <div className="card" key={item._id} >
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