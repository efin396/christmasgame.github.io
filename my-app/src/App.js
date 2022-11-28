import React from "react";
import './App.css';
import Board from './Board';

function App() {
  return (
    <div className="App">
      <h1 className='App-h1'><span className="App-blue">Testing</span></h1>
      <Board isBlue = {true} />
      <h1 className='App-h1'><span className="App-blue">Score Board</span></h1>
    </div>
  );
}

export default App;