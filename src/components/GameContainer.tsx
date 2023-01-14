import React, { useState } from 'react';
import { PlayerContainer } from './PlayerContainer';
import { Player, Suits, Ranks, Card } from '../interfaces/GameInterfaces';
import { Deck } from '../classes/GameClasses';
import './GameContainer.css';

export interface GameContainerProperties {
    playerNames: String[],
    deck: Card[]
}

const INITIAL_GAME_STATE = {
    playerNames: ["dealer", "player"],
    deck: [{suit:"Default", rank: -1}],
    inProgress: false
}

const NON_INTIALIZED_GAME_STATE = {
    playerNames: [],
    deck: [],
    inProgress: false
}

export const GameContainer = (props:GameContainerProperties) => {
    const [gameState, setState] = useState(INITIAL_GAME_STATE);
    const [players, setPlayers] = useState(undefined);
    const [deck, setDeck] = useState<Deck>(new Deck());
    const {playerNames } = props;

    const startGame = (): void => {
        console.log('STARTING GAME!');
        initPlayers();
        let gameDeck:Deck = new Deck()
        gameDeck.init();
        setDeck(gameDeck);
        console.dir(deck);
        setState({...gameState, inProgress: true})
        console.log('gameState: ', gameState);

    }

    const endGame = (): void => {
        setState(NON_INTIALIZED_GAME_STATE);
    }

    const resetGame = (): void => {
        setState(NON_INTIALIZED_GAME_STATE);
    }

    const initPlayers = ():void => {
        console.log('initializing players');
    }

    
    return (
    <div>
    <div className="main-div">
        <div className="main-game-container">
        <>
        
        {playerNames.map((player) =>{
            <PlayerContainer
                name={player}
                hand={[]}

            />
        })}
        </>
        </div>

    </div>
    {playerNames && <button className="start-button" onClick={() => startGame()}>START</button>}
    {gameState.inProgress && <button className="end-button" onClick={() => endGame()}>END</button>}
    {gameState.inProgress && <button className="reset-button" onClick={() => resetGame()}>RESET</button>}
    </div>);
}

