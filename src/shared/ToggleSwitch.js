import React from "react";
import ReactSwitch from "react-switch";

function ToggleSwitch({ handleToggle, checked }) {
  return (
    <>
      <ReactSwitch
        checked={checked}
        onChange={handleToggle}
        onColor="#FF8084"
        onHandleColor="#FF4D53"
        handleDiameter={30}
      />
    </>
  );
}

export default ToggleSwitch;
