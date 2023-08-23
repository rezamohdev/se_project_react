import React from "react";
import './ClothesSection.css';
import ItemCard from "../ItemCard/ItemCard";
import { weatherOptions } from '../../utils/constants';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ClothesSection({ sectionData, onSelectCard, onLikeClick, handleAddButton }) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <div className="clothes-section">
            <div className="clothes-section__header">
                <span className="clothes-section__title">Your items</span>
                <button className="clothes-section__button" onClick={handleAddButton}>+ Add new</button>
            </div>
            <div className="card-container">
                {sectionData.map((item) => {
                    const isOwner = item.owner === currentUser._id;

                    return isOwner && <ItemCard onLikeClick={onLikeClick} card={item} key={item._id} onSelectCard={onSelectCard} />
                }
                )}
            </div>
        </div>
    )
}

export default ClothesSection;