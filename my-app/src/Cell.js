import React from "react";
import './Cell.css';

function Cell(props){
    const { cellIndex, isOn, toggleLight } = props;

    function handleToggleLight() {
        toggleLight(cellIndex);
        
    }

    return (
        <button 
            className={isOn === "b"?"Cell-b":isOn === "w"? "Cell-w":isOn === "s"? "options": "Cell-off"} 
            onClick={handleToggleLight}
        ></button>
    );
}

export default Cell;