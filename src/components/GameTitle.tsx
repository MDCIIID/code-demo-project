import React, { useState } from 'react';
import { PlayerContainer } from './PlayerContainer';
import { Player, Suits, Ranks, Card } from '../interfaces/GameInterfaces';
import { Deck } from '../classes/GameClasses';
import './GameContainer.css';

export interface GameContainerProperties {
    title:String;
}

export const GameTitle = (props:GameContainerProperties) => {
    console.log('title props: ', props);

    return (
    <div className="game-title">
        {Array.from(props.title).map((letter)=>{
            return <div className="title-letter">{letter}</div>
        })}
    </div>);
}

