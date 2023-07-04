import React from "react";
import './Profile.css';
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
function Profile({ cards, onSelectCard }) {
    return (
        <div className="profile">
            <SideBar />
            <ClothesSection sectionData={cards} onSelectCard={onSelectCard} />
        </div >
    )
}
export default Profile;