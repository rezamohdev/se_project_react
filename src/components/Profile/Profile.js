import React from "react";
import './Profile.css';
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
function Profile({ cards, onSelectCard, onCardLike, onLogoutUser, handleOpenModal, handleOpenEditModal }) {
    return (
        <div className="profile">
            <SideBar handleOpenEditModal={handleOpenEditModal} onLogoutUser={onLogoutUser} />
            <ClothesSection onLikeClick={onCardLike} sectionData={cards} onSelectCard={onSelectCard} handleAddButton={handleOpenModal} />
        </div >
    )
}
export default Profile;