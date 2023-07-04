import React from "react";
const CurrentTemperatureUnitContext = React.createContext({
    currentTempratureUnit: "",
    handleToggleSwitchChange: () => { }
})

export { CurrentTemperatureUnitContext }