import { useState, useEffect } from 'react';
import { PlayerContainer } from './PlayerContainer';
import { Deck, Player, Card, PlayerRoster, SuperRandomDeck, AllAcesDeck, PlayerActor, Dealer} from '../classes/GameClasses';
import './GameContainer.css';
import { RankData } from '../constants/Constants';
import { getActiveElement } from '@testing-library/user-event/dist/utils';

export interface GameContainerProperties {
    playerNames: string[];
}

export interface GameContainerState {
    players: Player[],
    deck: Card[],
    inProgress: boolean,
    gameIsOver:boolean,
    viewer: Player
}

const INITIAL_GAME_STATE = {
    players: new Array<Player>(),
    deck: new Deck(),
    inProgress: false,
    gameIsOver: false,
    viewer: new Player("Default")
}

export const GameContainer = (props:GameContainerProperties) => {
    const [gameState, setGameState] = useState(INITIAL_GAME_STATE);
    const debug = false;
    const {playerNames} = props;

    useEffect(()=>{
        console.log("game state: ", gameState)
        if (!gameState.gameIsOver){
            gameLoop(); 
        } else {
            const { players } = gameState;
            players.forEach(player => {
                player.showHand();
            })
        }
    }, [gameState]);

    const startGame = () => {
        let players:Player[] = new PlayerRoster(playerNames).init();
        players.push(new Player("Dealer"));
        let gameDeck:Deck = Math.random() > .5 ? new SuperRandomDeck() : new Deck();
        const selectionIndex:number = Math.ceil(Math.random() * playerNames.length-1);
        let selectedViewer:Player = players[selectionIndex];
        console.log('selection index: ', selectionIndex);
        
        gameDeck.init();
        console.log('Starting game');
        gameDeck.shuffle();
        console.dir(gameDeck);
        console.log('selected: ', selectedViewer.getName());

        for (let i=0;i<2;i++) {
            players.forEach((player)=> {
                console.log('player is selectedViewer: ', player===selectedViewer);
            const card = gameDeck.draw();
            if (card) {
                if (player.getHand().length === 0 && player === selectedViewer) {
                    console.log(`${player.getName()} first card for viewer`);
                    card.flip();
                    player.takeHit(card);
                } else if (player.getHand().length === 0) {
                    player.takeHit(card);
                } else if (player.getHand().length > 0) {
                    card.flip();
                    player.takeHit(card);
                }
            }});
        }
        console.log('game state before change: ', {gameDeck, players, selectedViewer});
        setGameState({...gameState, inProgress: true, deck: gameDeck, players: players, viewer: selectedViewer})
    }

    const endGame = (): void => {
        setGameState(INITIAL_GAME_STATE);
    }

    const resetGame = (): void => {
        endGame();
        startGame();
    }

    const isViewer = (player:Player): boolean => {
        return player === gameState.viewer;
    }

    const hitPlayerAtPosition = (position:number):void => {
        let newPlayersState:Player[] = Object.assign([], gameState.players)
        let newDeckState:Deck = gameState.deck;
        const playerInTerminalState = newPlayersState[position].hasStood()
                                      || newPlayersState[position].isBust()
                                      || newPlayersState[position].hasBlackjack();
        console.log(`hitting player at position ${position}`);

        if (playerInTerminalState) {
            alert("That player cannot take a card.");
        } 
            else 
        {
            if (playerPositionIsValid(position)) {
                const drawnCard = newDeckState.draw();
                if (drawnCard) {
                    drawnCard.flip();
                    newPlayersState[position].takeHit(drawnCard);
                    setGameState({...gameState, deck: newDeckState, players: newPlayersState})
                }
            }
        }
    }

    const standPlayerAtPosition = (position:number):void => {
        let newPlayersState: Player[] = Object.assign([], gameState.players)

        if (playerPositionIsValid(position)) {
            newPlayersState[position].takeStand();
            setGameState({...gameState, players: newPlayersState})
        } else {
            throw new Error("Invalid player position, cannot stand");
        }

    }

    const playerPositionIsValid = (position:number):boolean => {
        return gameState.players[position] !== undefined;
    }

    const calculateHand = (hand:Card[]):void => {
        let handValue = 0;
        let aceInHand:Card[] = hand.filter((card)=>{return card.isAce()})

        hand.forEach((card)=>{
            const cardValue = RankData[card.getRank()].value > 10 ? 10 : RankData[card.getRank()].value;
            handValue += cardValue;
        })

        if (aceInHand && handValue < 21) {
            handValue += aceInHand.length*10;
        }
    }

    const gameLoop = () => {
        const {deck, players, inProgress, gameIsOver, viewer} = gameState;
        console.log('running game loop: ', {deck, players, inProgress, gameIsOver, viewer});

        if (!gameIsOver && inProgress) {
            let playersInPlay:Player[] = gameState.players.filter(player => !player.isBust() && !player.hasStood() && !player.hasBlackjack());
            console.log('game\'s still going');
            if (playersInPlay.length === 0) {
                setGameState({...gameState, gameIsOver: true});
            } else {
                console.log('Players in play: ', playersInPlay);
            }

            for (let i = 0; i<players.length;i++) {
                const newPlayerState:Player = players[i];
                const newPlayersState:Player[] = [...players];
                /*
                get player
                */
                if (viewer === newPlayerState && !newPlayerState.inTerminalState()) {
                    break;
                } else {
                    console.log("running through play order");
                    if (playersInPlay && inProgress && !gameIsOver) {
                        let presentPlayer:PlayerActor;
                        presentPlayer = newPlayerState.getName().toLowerCase() === 'dealer' ?
                            new PlayerActor(newPlayerState, deck)
                            : new Dealer(newPlayerState, deck);
                        if (newPlayerState.isBust()) {
                            continue;
                        }
                        if (newPlayerState.hasStood()) {
                            continue;
                        }
                        if (newPlayerState.hasBlackjack())  {
                            continue;
                        }
                        presentPlayer.act();
                    }
                    newPlayersState[i] = newPlayerState;
                    setGameState({...gameState, players: newPlayersState})
                }
                
            };

        }
    }
    
    const renderPlayerContainers = () => {
        return gameState.players.map((player, index) => {
            //console.log('making player: \nname: ', player, `\nplayer #:${index}`);
            return <PlayerContainer
                player={player}
                index={index}
                hit={() => {hitPlayerAtPosition(index)}}
                stand={() => {standPlayerAtPosition(index)}}
                calculateHand={() => {player.getHandValue()}}
                isSelected={isViewer(player)}
            />
        })
    }

    const renderGameOutcome = () => {
        const { players } = gameState;
        console.log('rendering outcome: ', gameState);
        return (
            <>
            {players.map((player, index) => {
                <div key={`${index}-${player.getName()}`}>{`${player.getName()}: ${player.getHandValue()}`}</div>
            })} 
            </>
        )       
    }

    //TODO: Deal with splitting hands?
    const dealer:Player = gameState.players.filter(player => player.getName().toLowerCase() === 'dealer')[0];
    console.log("returning component");
    return (
    <div>
    <div className="main-div">
        {gameState.players && !gameState.gameIsOver && renderPlayerContainers()}
        {gameState.gameIsOver && renderGameOutcome()}
        {!gameState.inProgress && <div> No game in progress </div>}
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
    <button className="debug-button" onClick={() => hitPlayerAtPosition(gameState.players.length-1)}>hitDealer</button>
    <button className="debug-button" onClick={() => standPlayerAtPosition(gameState.players.length-1)}>standDealer</button>
    <button className="debug-button" onClick={() => dealer.getHandValue()}>D.Hand</button>
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

