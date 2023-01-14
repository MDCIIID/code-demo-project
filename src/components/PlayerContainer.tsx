import React, { useState } from 'react';
import { Card } from '../interfaces/GameInterfaces';

export interface PlayerContainerProperties {
    name: String;
    hand: Card[];
}

const INITIAL_GAME_STATE = {
    players: ["dealer", "player"],
    deck: []
}

export const PlayerContainer = (props:PlayerContainerProperties) => {
    const {
        name,
        hand
    } = props

    return (
    <div>
        Player display goes here
        <div>Player Name: {name}</div>
        { }
    </div>
    );
}

