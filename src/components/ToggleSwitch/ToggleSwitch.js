import React, { useState } from "react";
import './ToggleSwitch.css';
import { CurrentTempratureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
    const { currentTempratureUnit, handleToggleSwitchChange } = React.useContext(CurrentTempratureUnitContext);
    return (
        <label className="switch">
            <input type="checkbox"
                className="switch__box"
                onChange={handleToggleSwitchChange}
            />
            {/* <span className={currentTempratureUnit === 'F' ? 'switch__slider_F' : 'switch__slider_C'}></span> */}
            <span className='switch__slider'></span>
            <span className={`switch__temp-unit_c ${currentTempratureUnit === 'F' && 'switch__active'}`}>C</span>
            <span className={`switch__temp-unit_f  ${currentTempratureUnit === 'C' && 'switch__active'}`}>F</span>
        </label >
    )
}
export default ToggleSwitch;