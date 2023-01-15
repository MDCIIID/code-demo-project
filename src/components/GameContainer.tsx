import React, { useState, useEffect } from 'react';
import { PlayerContainer } from './PlayerContainer';
import { Deck, Player, Card, PlayerRoster, SuperRandomDeck} from '../classes/GameClasses';
import { CONSTANTS, Ranks } from '../constants/constants';
import './GameContainer.css';

export interface GameContainerProperties {
    playerNames: ["Dealer", "Eric", "Cheryl"]
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

export const GameContainer = (props:GameContainerProperties) => {
    const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
    const debug = true;
    const {playerNames } = props;

    useEffect(()=>{
        gameLoop();
    }, [gameState]);

    const startGame = () => {
        let players:Player[] = new PlayerRoster(playerNames).init();
        let gameDeck:Deck = Math.random() > .5 ? new SuperRandomDeck() : new Deck();
        gameDeck.init();
        console.log('Starting game');
        gameDeck.shuffle();
        console.dir(gameDeck);

        for (let i=0;i<2;i++) {
            players.forEach((player)=> {
            const card = gameDeck.draw();
            if (card) {
            player.takeHit(card)
            }
        })
        }
        setGameState({...gameState, inProgress: true, deck: gameDeck, players: players})
    }

    const endGame = (): void => {
        setGameState(INITIAL_GAME_STATE);
    }

    const resetGame = (): void => {
        endGame();
        startGame();
    }

    const hitPlayerAtPosition = (position:number):void => {
        let newPlayersState: Player[] = Object.assign([], gameState.players)
        let newDeckState:Deck = gameState.deck;
        console.log('hitting player at position');
        if (playerPositionIsValid(position)) {
            const drawnCard = newDeckState.draw();
            if (drawnCard) {
                newPlayersState[position].takeHit(drawnCard);
                setGameState({...gameState, deck: newDeckState, players: newPlayersState})
            }
        } else {
            throw new Error("Invalid player position, cannot hit");
        }
    }

    const standPlayerAtPosition = (position:number):void => {
        let newPlayersState: Player[] = Object.assign([], gameState.players)

        if (playerPositionIsValid(position)) {

        } else {
            throw new Error("Invalid player position, cannot stand");
        }

    }

    const playerPositionIsValid = (position:number):boolean => {
        return gameState.players[position] !== undefined;
    }

    const calculateHand = (hand:Card[]):void => {
        console.log("calculating a hand");
        let handValue = 0;
        let aceInHand:boolean = hand.some((card)=>{return card.isAce()})

        hand.forEach((card)=>{
            const cardValue = parseInt(card.getRank()) > 10 ? 10 : parseInt(card.getRank());
            handValue += cardValue;
        })
        console.log('handValue: ', handValue);
    }

    const gameLoop = () => {
        console.log('running game loop: ', gameState);
        const playersInPlay = gameState.players.filter(player => player.hasStood);
        if (playersInPlay.length) {
            console.log('still players in play: ', playersInPlay);
        }
    }
    
const renderPlayerContainers = () => {
    return gameState.players.map((player, index) => {
        console.log('making player: \nname: ', player, `\nplayer #:${index}`);
        return <PlayerContainer
            player={player}
            index={index}
            hit={() => {hitPlayerAtPosition(index)}}
            stand={() => {standPlayerAtPosition(index)}}
        />
    })
}

    //TODO: Deal with splitting hands?

    return (
    <div>
    <div className="main-div">
        {gameState.players && renderPlayerContainers()}
    </div>
    {playerNames && <button className="start-button" onClick={() => {startGame()}}>START</button>}
    {gameState.inProgress && <button className="end-button" onClick={() => endGame()}>END</button>}
    {gameState.inProgress && <button className="reset-button" onClick={() => {resetGame()}}>RESET</button>}
    {debug && <div>
    <button className="debug-button" onClick={() => console.log(gameState)}>GameState</button>
    <button className="debug-button" disabled={!gameState.inProgress} onClick={() => setGameState({...gameState, inProgress: false})}>GAME OVER</button>
    <button className="debug-button" onClick={() => calculateHand(gameState.deck.getCards())}>DeckV</button>
    </div>}
    {debug &&
    <div>
    <button className="debug-button" onClick={() => hitPlayerAtPosition(0)}>hitDealer</button>
    <button className="debug-button" onClick={() => standPlayerAtPosition(0)}>standDealer</button>
    <button className="debug-button" onClick={() => calculateHand(gameState.players[0].getHand())}>D.Hand</button>
    </div>}
    {debug &&
    <div>
    <button className="debug-button" disabled={gameState.deck.getCards().length <= 0} onClick={() => gameState.deck.shuffle()}>shuffle</button>
    <button className="debug-button" disabled={gameState.deck.getCards().length <= 0} onClick={() => console.log(gameState.deck.draw())}>draw</button>
    <button className="debug-button" disabled={gameState.deck.getCards().length <= 0} onClick={() => console.log(gameState.deck.toString())}>get cards</button>
    <button className="debug-button" disabled={gameState.deck.getCards().length <= 0} onClick={() => console.log(gameState.deck.cut())}>cut</button>
    </div>}
    </div>);
}

