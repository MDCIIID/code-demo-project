import React, { useState } from 'react';
import { Card } from '../interfaces/GameInterfaces';
import { PlayerHand } from './PlayerHand';
import './PlayerContainer.css';

export interface PlayerContainerProperties {
    name: string;
    hand: Card[];
    playerIndex:number;
    hit():void;
    stand():void;
}

export const PlayerContainer = (props:PlayerContainerProperties) => {
    console.log('playerContainer props: ', props);
    const {
        name,
        hand,
        playerIndex,
        hit,
        stand
    } = props

    return (
    <div>
        <div className={`player-container player-${playerIndex}`}>
            Player display goes here somewhere
            <div>Player Name: {name}</div>
            <PlayerHand 
                hand={hand}
            />
        <button className="player-hit-button" onClick={() => hit()}>Hit</button>
        <button className="player-stand-button" onClick={() => stand()}>Stand</button>
        </div>
    </div>
    );
}

