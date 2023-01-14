import React, { useState } from 'react';
import './GameContainer.css';

export interface GameContainerProperties {
    title:string;
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

