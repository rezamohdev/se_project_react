import './Header.css';
// import logo from "./logo.svg";
function Header() {
    return (
        <>
            <div className="header">
                <div className="header__left-side">
                    <img src="/images/logo.svg" alt="logo" className="header__logo" />
                    <p className="header__date">June 15 New York</p>
                </div>
                <div className="header__right-side">
                    <button className="header__button">Add clothes +</button>
                    <p className="header__user-title">Terrence Tegegne</p>
                    <img className="header__avatar" src="/images/avatar.svg" />
                </div>
            </div>
        </>
    );
}
export default Header;