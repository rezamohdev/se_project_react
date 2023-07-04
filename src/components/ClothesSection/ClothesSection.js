import React from "react";
import './ClothesSection.css';
import ItemCard from "../ItemCard/ItemCard";
import { weatherOptions } from '../../utils/constants';

function ClothesSection({ sectionData }) {
    return (
        <div className="clothes-section">
            <div className="clothes-section__header">
                <span className="clothes-section__title">Your items</span>
                <button className="clothes-section__button">+ Add new</button>
            </div>
            <div className="card-container">
                {sectionData.map((item) => {
                    return (<ItemCard card={item} key={item.id} />)
                }
                )}
            </div>
        </div>
    )
}

export default ClothesSection;