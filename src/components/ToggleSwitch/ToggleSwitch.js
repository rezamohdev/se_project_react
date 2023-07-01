import React, { useState } from "react";
import './ToggleSwitch.css';
function ToggleSwitch() {
    const [currentTempratureUnit, setCurrentTempratureUnit] = useState('F');
    function handleChange(e) {

        currentTempratureUnit === 'C' ? setCurrentTempratureUnit('F') : setCurrentTempratureUnit('C');
        console.log(currentTempratureUnit)
    }
    return (
        <label className="switch">
            <input type="checkbox"
                className="switch__box"
                onChange={handleChange}
            />
            <span className={currentTempratureUnit === 'F' ? 'switch__slider_F' : 'switch__slider_C'}></span>
            <span className={`switch__temp-unit_f  ${currentTempratureUnit === 'F' && 'switch__active'}`}>F</span>
            <span className={`switch__temp-unit_c ${currentTempratureUnit === 'C' && 'switch__active'}`}>C</span>
        </label >
    )
}
export default ToggleSwitch;