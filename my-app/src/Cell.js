import React from "react";
import './Cell.css';

function Cell(props){
    const { cellIndex, isOn, getSelections } = props;

    function handleToggleLight() {
        getSelections(cellIndex);
        
    }

    return (
        <button 
            className={isOn === "r"?"Cell-r":isOn === "b"? "Cell-b":isOn === "s"? "options": "Cell-off"} 
            onClick={handleToggleLight}
        ></button>
    );
}

export default Cell;