import React from "react";
import './SideBar.css';
import avatarImage from '../../images/avatar.svg';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SideBar() {
    const userData = React.useContext(CurrentUserContext);

    return (
        <div className="sidebar">
            <div className="sidebar__info">
                {/* <img src={userData.avatar} alt="User avatar" className="sidebar__user-avatar" /> */}
                {userData?.avatar ? (<img className="sidebar__user-avatar" src={userData?.avatar} alt='avatar' />) :
                    <div className='header__avatar-placeholder'>{Array.from(userData?.name)[0].toUpperCase()}</div>}
                <p className="sidebar__user-title">{userData.name}</p>
            </div>
        </div>
    )
}
export default SideBar;