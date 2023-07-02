import React from "react";
import './ClothesSection.css';
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems, weatherOptions } from '../../utils/constants';

function ClothesSection() {
    return (
        <div className="clothes-section">
            <div className="clothes-section__header">
                <span className="clothes-section__title">Your items</span>
                <button className="clothes-section__button">+ Add new</button>
            </div>
            <div className="card-container">
                {defaultClothingItems.map((item) => {
                    return (<ItemCard item={item} key={item._id} />)
                }
                )}
            </div>
        </div>
    )
}

export default ClothesSection;