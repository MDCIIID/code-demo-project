import React, { useState } from 'react';
import { PlayerContainer } from './PlayerContainer';
import { Deck, Player, Card, DEFAULT_CARD } from '../classes/GameClasses';
import './GameContainer.css';

export interface GameContainerProperties {
    playerNames: string[]
}

export interface GameContainerState {
    players: Player[],
    deck: Card[],
    gameIsOver: boolean,
}

const INITIAL_GAME_STATE = {
    players: new Array<Player>(),
    deck: new Deck(),
    inProgress: false
}

const NON_INTIALIZED_GAME_STATE = {
    playerNames: [],
    deck: new Deck(),
    inProgress: false
}

export const GameContainer = (props:GameContainerProperties) => {
    const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
    const debug = true;
    const {playerNames } = props;

    const startGame = (): void => {
        console.log('STARTING GAME!');
        initPlayers();
        let gameDeck:Deck = new Deck()
        gameDeck.init();
        gameDeck.shuffle();
        console.dir(gameState.deck);
        setGameState({...gameState, inProgress: true, deck: gameDeck})
        console.log('gameState: ', gameState);
    }

    const endGame = (): void => {
        setGameState(INITIAL_GAME_STATE);
    }

    const resetGame = (): void => {
        endGame();
        startGame();
    }

    const initPlayers = ():void => {
        console.log('initializing players');
        let roster:Player[] = [];
        playerNames.forEach((name)=>{
            let newPlayer = new Player(name);
            roster.push(newPlayer);
        })
        setGameState({...gameState, players: roster});
    }

    const hitPlayerAtPosition = (position:number):void => {
        const {players, deck} = gameState;
        const playerToHit = players[position];
        const card = deck.draw();
        if (card) {
            playerToHit.takeHit(card);
        } else {
            console.log()
        }
    }
    const standPlayerAtPosition = (position:number):void => {
        const player = gameState.players[position];
        player.takeStand();
    }

    const calculateHand = (hand:Card[]):void => {
        let handValue = 0;
        hand.forEach((card)=>{
            const cardValue = parseInt(card.getRank()) > 10 ? 10 : parseInt(card.getRank());
            handValue += cardValue;
        })
        console.log('handValue: ', handValue);
    }

    const gameLoop = () => {
        const playersInPlay = gameState.players.filter(player => player.hasStood);
        if (playersInPlay.length) {
            console.log('still players in play: ', playersInPlay);
        }
    }
    
    return (
    <div>
    <div className="main-div">
        <div className="main-game-container">
        <>
        
        {playerNames.map((player, index) =>{
            <PlayerContainer
                name={player}
                hand={[]}
                playerIndex={index}
            />
        })}
        </>
        </div>

    </div>
    {playerNames && <button className="start-button" onClick={() => startGame()}>START</button>}
    {gameState.inProgress && <button className="end-button" onClick={() => endGame()}>END</button>}
    {gameState.inProgress && <button className="reset-button" onClick={() => {resetGame()}}>RESET</button>}
    {debug && <button className="reset-button" onClick={() => console.log(gameState)}>GameState</button>}
    {debug && <button className="reset-button" onClick={() => calculateHand(gameState.deck.getCards())}>Calculate</button>}
    </div>);
}

