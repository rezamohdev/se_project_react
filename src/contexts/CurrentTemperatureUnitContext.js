import React from "react";
const CurrentTempratureUnitContext = React.createContext({
    currentTempratureUnit: "",
    handleToggleSwitchChange: () => { }
})

export { CurrentTempratureUnitContext }