import React from "react";
import './Profile.css';
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
function Profile({ cards, onSelectCard, onCardLike, handleOpenModal, handleOpenEditModal }) {
    return (
        <div className="profile">
            <SideBar handleOpenEditModal={handleOpenEditModal} />
            <ClothesSection onLikeClick={onCardLike} sectionData={cards} onSelectCard={onSelectCard} handleAddButton={handleOpenModal} />
        </div >
    )
}
export default Profile;