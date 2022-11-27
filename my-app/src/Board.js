import React, { useState } from "react";
import './Board.css';
import Cell from "./Cell";


function Board(props) {

    //create starting matrix state
    const startGrid = [
        ["r","r","r","r"],
        ["r","+","+","r"],
        ["b","+","+","b"],
        ["b","b","b","b"]
    ]

    const [ board, setBoard ] = useState({ grid: startGrid });
    
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
        
        if (board.grid[cellRowIndex][cellColIndex] === "r"|| board.grid[cellRowIndex][cellColIndex] === "b"){
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