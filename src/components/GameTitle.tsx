import React, { useState } from 'react';
import './GameContainer.css';

export interface GameContainerProperties {
    title:string;
}

export const GameTitle = (props:GameContainerProperties) => {
    console.log('title props: ', props);

    return (
    <div className="game-title"
         data-testid="gameTitle">
        {Array.from(props.title).map((letter, index)=>{
            return <div className="title-letter" key={`${letter+index}`} data-testid="titleLetter">{letter}</div>
        })}
    </div>);
}

