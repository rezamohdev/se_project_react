import React from 'react';
import './Header.css';
// import logo from "./logo.svg";
function Header({ handleOpenModal, currenLocation }) {

    const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });

    return (
        <>
            <div className="header">
                <button className='header__menu-button'></button>
                <div className="header__left-side">
                    <img src={require("../../images/Logo.svg").default} alt="logo" className="header__logo" />
                    <p className="header__date">{currentDate}, {currenLocation}</p>
                </div>
                <div className="header__right-side">
                    <button className="header__button" onClick={handleOpenModal}>+ Add clothes</button>
                    <p className="header__user-title">Terrence Tegegne</p>
                    <img className="header__avatar" src={require("../../images/avatar.svg").default} />
                </div>
            </div>
        </>
    );
}
export default Header;