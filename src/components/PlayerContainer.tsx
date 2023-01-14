import React, { useState } from 'react';
import { Card } from '../interfaces/GameInterfaces';

export interface PlayerContainerProperties {
    name: string;
    hand: Card[];
    playerIndex:number;
}

export const PlayerContainer = (props:PlayerContainerProperties) => {
    const {
        name,
        hand,
        playerIndex
    } = props

    return (
    <div className={`player-container player-${playerIndex}`}>
        Player display goes here somewhere
        <div>Player Name: {name}</div>
        { }
    </div>
    );
}

