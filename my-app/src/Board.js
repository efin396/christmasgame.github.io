import React, { useState } from "react";
import './Board.css';
import Cell from "./Cell";


function Board(props) {
   // const { } = props;
    //const lastClick = [-1,-1]
    

    //create size*size matrix state, randomly setting isOn to true/false
    const startGrid = [
        ["r","r","r","r"],
        ["r","+","+","r"],
        ["b","+","+","b"],
        ["b","b","b","b"]
    ]
    const [player, setPlayer] = useState(true)
    const [ board, setBoard ] = useState({ grid: startGrid });
    const [ click, setClick ] = useState([0,0]);
    const updateLastClick = (cellRowIndex,cellColIndex, click) => {
        const newClick= [cellRowIndex,cellColIndex];
        setClick(newClick);
      }

    const updatePlayer = (player) => {
        const newPlayer= !player;
        setPlayer(newPlayer);
      }
    /** getSelections: shows potential moves for a given chip */
    const getSelections = function(cellIndex){
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
        updateLastClick(cellRowIndex,cellColIndex,click)
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
        setBoard(currSt => (
            {   ...currSt,
                grid: currSt.grid
            }
        ))
    }
    /** displayMoves: either shows possible selections for moves or updates player move if applicable*/
    function displayMoves(cellIndex){
        let [ cellRowIndex, cellColIndex ] = cellIndex.split("");
        cellRowIndex = parseInt(cellRowIndex);
        cellColIndex = parseInt(cellColIndex);
      
        if ((board.grid[cellRowIndex][cellColIndex] === "r" && !player)|| (board.grid[cellRowIndex][cellColIndex] === "b" && player)){
            getSelections(cellIndex);
        }
        else if ((board.grid[click[0]][click[1]] === "b" && player && board.grid[cellRowIndex][cellColIndex] === "s")){
            handleMove(cellIndex)
            updatePlayer(player)
        }
        else if ((board.grid[click[0]][click[1]] === "r" && !player && board.grid[cellRowIndex][cellColIndex] === "s")){
            handleMove(cellIndex)
            updatePlayer(player)
        }


       

        }
    function checkPoints(){
        let bluePoint = ['+bbr','+rbb', 'bbr+', '+rbb', 'rbb+']
        let redPoint = ['+rrb','+brr', 'rrb+', '+brr', 'brr+']
        for (let i=0; i < 4; i++){
            let row = board.grid[i][0]+board.grid[i][1]+board.grid[i][2]+board.grid[i][3]
            let col = board.grid[0][i]+board.grid[1][i]+board.grid[2][i]+board.grid[3][i]
            //console.log(row)
            if (bluePoint.indexOf(row) !== -1){
                console.log(row)
                for (let j=0; j < 4; j++){
                    if (board.grid[i][j] === "r"){
                        board.grid[i][j] = "+"
                    }
                } 
            } 
            if (bluePoint.indexOf(col) !== -1){
                for (let j=0; j < 4; j++){
                    if (board.grid[j][i] === "r"){
                        board.grid[j][i] = "+"
                    }
                } 
            } 
            if (redPoint.indexOf(row) !== -1){
                console.log(row)
                for (let j=0; j < 4; j++){
                    if (board.grid[i][j] === "b"){
                        board.grid[i][j] = "+"
                    }
                } 
            } 
            if (redPoint.indexOf(col) !== -1){
                console.log(col)
                for (let j=0; j < 4; j++){
                    if (board.grid[j][i] === "b"){
                        board.grid[j][i] = "+"
                    }
                } 
            } 
            }
            setBoard(currSt => (
                {   ...currSt,
                    grid: currSt.grid
                }
            ))
        }
    
    function handleMove(cellIndex){
        let [ cellRowIndex, cellColIndex ] = cellIndex.split("");
        cellRowIndex = parseInt(cellRowIndex);
        cellColIndex = parseInt(cellColIndex);
        // console.log(click)
        board.grid[cellRowIndex][cellColIndex] = board.grid[click[0]][click[1]]
        board.grid[click[0]][click[1]] = "+"
       
        for (let i=0; i < 4; i++){
            for (let j=0; j < 4; j++){
                if (board.grid[i][j] === "s"){
                    board.grid[i][j] = "+"
                }
            }
        }
        checkPoints()
        setBoard(currSt => (
            {   ...currSt,
                grid: currSt.grid
            }
        ))
    }

    /** hasWon: checks if any blue or red remain */
    function hasWon() {
        if (board.grid.every( row => row.every( cell => !cell.includes('b')) )){
            return "red"
        }
        if (board.grid.every( row => row.every( cell => !cell.includes('r')) )){
            return "blue"
        }
        return 
    }
    
    
    const gridDisplay = board.grid.map( function (row, rowIndex) {
            return (
                
                <div className="Board-row" key={rowIndex}>
                    {row.map((col, colIndex) => (
                        <Cell 
                            key={[rowIndex, colIndex].join("")}
                            cellIndex={[rowIndex, colIndex].join("")} 
                            isOn={board.grid[rowIndex][colIndex]}
                            getSelections={displayMoves}
                         />
                    ))}
                </div>
                

            );
        });
    

    return(
        <div className="Board">
           {hasWon() === "red"? <div className="Board-hasWon">Congratulations Red Won!</div> : hasWon() === "blue"? <div className="Board-hasWon">Congratulations Blue Won!</div>: gridDisplay }
           <h1 className='App-h1'><span className="App-blue">Score Board</span></h1>
        </div>
    );

    }
export default Board;