import { Card } from '../interfaces/GameInterfaces';
import { Player } from '../classes/GameClasses';
import { PlayerHand } from './PlayerHand';
import './PlayerContainer.css';

export interface PlayerContainerProperties {
    player:Player;
    index:number;
    hit():void;
    stand():void;
    calculateHand():void;
    isSelected:boolean;
}

export const PlayerContainer = (props:PlayerContainerProperties) => {
    //console.log('playerContainer props: ', props);
    const {
        player,
        index,
        hit,
        stand,
        calculateHand,
        isSelected
    } = props

    return (
    <div>
        <div className={`player-container player-${index}`}>
            <div>Name: {player.getName()}</div>
            <PlayerHand 
                hand={player.getHand()}
            />
            <br />
            {  isSelected
                && ( !player.hasStood()
                && !player.isBust()
                && !player.hasBlackjack()
                && <button className="hit-button" onClick={() => hit()}>Hit</button>)}
            { isSelected 
                && (!player.isBust() && <button className="stand-button" onClick={() => stand()}>{player.hasStood() ? `${player.getName()} is standing on ${player.getHandValue()}` : "Stand"} </button>)}
            { isSelected
                && (player.isBust() && <div>{`${player.getName()} has gone bust!`}</div>)}
        </div>
    </div>
    );
}

