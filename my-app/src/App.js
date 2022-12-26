import React from "react";
import './App.css';
import Board from './Board';

function App() {
  return (
    <div className="App">
      <h1 className='App-h1'><span className="App-blue">Testing</span></h1>
      <Board isBlue = {true} />
    </div>
  );
}

export default App;