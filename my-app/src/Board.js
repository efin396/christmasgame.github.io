import React, { useState } from "react";
import './Board.css';
import Cell from "./Cell";


function Board(props) {
    //const { size, chanceLightStartsOn } = props;

    // /** randomLight: returns random boolean */
    // function randomLight(){
    //     return Math.random() < chanceLightStartsOn;
    // }

    //create size*size matrix state, randomly setting isOn to true/false
    const startGrid = [
        ["b","b","b","b"],
        ["b","+","+","b"],
        ["w","+","+","w"],
        ["w","w","w","w"]
    ]

    const [ board, setBoard ] = useState({ grid: startGrid });
    

    /** toggleLight: toggles a single light on/off in the state */
    const toggleLight = function(cellIndex){
        let [ cellRowIndex, cellColIndex ] = cellIndex.split("");
        cellRowIndex = parseInt(cellRowIndex);
        cellColIndex = parseInt(cellColIndex);
        for (let i=0; i < 4; i++){
            for (let j=0; j < 4; j++){
                if (board.grid[i][j] === "s"){
                    board.grid[i][j] = "+"
            }
            }
        }
        try{
        if (board.grid[cellRowIndex+1][cellColIndex] === "+"){
            board.grid[cellRowIndex+1][cellColIndex] = "s"
        }
        } catch(TypeError){}
        try{
        if (board.grid[cellRowIndex-1][cellColIndex] === "+"){
            board.grid[cellRowIndex-1][cellColIndex] = "s"
        }} catch(TypeError){}
        try{
        if (board.grid[cellRowIndex][cellColIndex-1] === "+"){
            board.grid[cellRowIndex][cellColIndex-1] = "s"
        }} catch(TypeError){}
        try{
        if (board.grid[cellRowIndex][cellColIndex+1] === "+"){
            board.grid[cellRowIndex][cellColIndex+1] = "s"
        }} catch(TypeError){}
        try{
        if (board.grid[cellRowIndex+1][cellColIndex+1] === "+"){
            board.grid[cellRowIndex+1][cellColIndex+1] = "s"
        }} catch(TypeError){}
        try{
        if (board.grid[cellRowIndex+1][cellColIndex-1] === "+"){
            board.grid[cellRowIndex+1][cellColIndex-1] = "s"
        }} catch(TypeError){}
        try{
        if (board.grid[cellRowIndex-1][cellColIndex+1] === "+"){
            board.grid[cellRowIndex-1][cellColIndex+1] = "s"
        }} catch(TypeError){}
        try{
        if (board.grid[cellRowIndex-1][cellColIndex-1] === "+"){
            board.grid[cellRowIndex-1][cellColIndex-1] = "s"
        }} catch(TypeError){}
        setBoard(currSt => (
            {   ...currSt,
                grid: currSt.grid
            }
        ))
    }

    /** toggleAllLights: toggles clicked-on light and its neighbours */
    function displayMoves(cellIndex){
        let [ cellRowIndex, cellColIndex ] = cellIndex.split("");
        cellRowIndex = parseInt(cellRowIndex);
        cellColIndex = parseInt(cellColIndex);
        
        if (board.grid[cellRowIndex][cellColIndex] === "b"|| board.grid[cellRowIndex][cellColIndex] === "w"){
            toggleLight(cellIndex);                                 //toggle clicked on cell
        }
    }

    /** hasWon: checks if all lights are off */
    function hasWon() {
        return board.grid.every( row => row.every( cell => !cell ) )
    }
    
    
    const gridDisplay = board.grid.map( function (row, rowIndex) {
            return (
                <div className="Board-row" key={rowIndex}>
                    {row.map((col, colIndex) => (
                        <Cell 
                            key={[rowIndex, colIndex].join("")}
                            cellIndex={[rowIndex, colIndex].join("")} 
                            isOn={board.grid[rowIndex][colIndex]}
                            toggleLight={displayMoves}
                         />
                    ))}
                </div>
            );
        });

    return(
        <div className="Board">
           {hasWon() ? <div className="Board-hasWon">Congratulations!</div> : gridDisplay }
        </div>
    )
}

export default Board;