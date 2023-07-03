import React from "react";
import './Profile.css';
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
function Profile({ cards }) {
    return (
        <div className="profile">
            <SideBar />
            <ClothesSection sectionData={cards} />
        </div >
    )
}
export default Profile;