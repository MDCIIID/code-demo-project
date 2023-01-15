import React, { useState } from 'react';
import { Card } from '../interfaces/GameInterfaces';
import { Player } from '../classes/GameClasses';
import { PlayerHand } from './PlayerHand';
import './PlayerContainer.css';

export interface PlayerContainerProperties {
    player:Player;
    index:number;
    hit():void;
    stand():void;
}

export const PlayerContainer = (props:PlayerContainerProperties) => {
    console.log('playerContainer props: ', props);
    const {
        player,
        index,
        hit,
        stand
    } = props

    return (
    <div>
        <div className={`player-container player-${index}`}>
            <div>Name: {player.getName()}</div>
            <PlayerHand 
                hand={player.getHand()}
            />
        <button className="player-hit-button" disabled={player.hasStood()} onClick={() => hit()}>Hit</button>
        <button className="player-stand-button" onClick={() => stand()}>Stand</button>
        </div>
    </div>
    );
}

