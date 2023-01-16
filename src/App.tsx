import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GameContainer } from './components/GameContainer';
import { GameTitle } from './components/GameTitle';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GameTitle 
          title={"Black Jack"}
        />
        <GameContainer
          playerNames={["Eric", "Cheryl", "Barry"]}
         />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
