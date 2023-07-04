import React, { useState } from "react";
import './ToggleSwitch.css';
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
    const { currentTemperatureUnit, handleToggleSwitchChange } = React.useContext(CurrentTemperatureUnitContext);
    return (
        <label className="switch">
            <input type="checkbox"
                className="switch__box"
                onChange={handleToggleSwitchChange}
            />
            {/* <span className={currentTemperatureUnit === 'F' ? 'switch__slider_F' : 'switch__slider_C'}></span> */}
            <span className='switch__slider'></span>
            <span className={`switch__temp-unit_c ${currentTemperatureUnit === 'F' && 'switch__active'}`}>F</span>
            <span className={`switch__temp-unit_f  ${currentTemperatureUnit === 'C' && 'switch__active'}`}>C</span>
        </label >
    )
}
export default ToggleSwitch;