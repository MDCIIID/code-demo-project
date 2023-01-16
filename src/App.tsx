import React from 'react';
import logo from './logo.svg';
import './App.css';
import { GameContainer } from './components/GameContainer';
import { GameTitle } from './components/GameTitle';
import { QuickQuote } from './components/QuickQuote';
import './components/QuickQuote';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GameTitle 
          title={"Black Jack"}
        />
        <GameContainer
          playerNames={["Eric", "Cheryl", "Bret", "Bob"]}
         />
        <QuickQuote />
      </header>
    </div>
  );
}

export default App;
