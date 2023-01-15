import { Card } from '../interfaces/GameInterfaces';
import { Player } from '../classes/GameClasses';
import { PlayerHand } from './PlayerHand';
import './PlayerContainer.css';

export interface PlayerContainerProperties {
    player:Player;
    index:number;
    hit():void;
    stand():void;
    calculateHand(hand:Card[]):void;
}

export const PlayerContainer = (props:PlayerContainerProperties) => {
    console.log('playerContainer props: ', props);
    const {
        player,
        index,
        hit,
        stand,
        calculateHand
    } = props

    return (
    <div>
        <div className={`player-container player-${index}`}>
            <div>Name: {player.getName()}</div>
            <PlayerHand 
                hand={player.getHand()}
            />
            <br />
            { !player.hasStood()
               && !player.isBust()
               && <button className="hit-button" onClick={() => hit()}>Hit</button>}
            { !player.isBust() && <button className="stand-button" onClick={() => stand()}>{player.hasStood() ? `${player.getName()} is standing on ${player.getHandValue()}` : "Stand"} </button>}
            { player.isBust() && <div>{`${player.getName()} has gone bust!`}</div>}
        </div>
    </div>
    );
}

