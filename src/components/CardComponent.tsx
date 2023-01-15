import React, { useState } from 'react';
import { Ranks, Suits } from '../constants/constants';
import { Card } from '../classes/GameClasses';

export interface CardComponentProperties {
    card:Card
}

export const CardComponent = (props:CardComponentProperties) => {
    const {
        suit,
        rank
    } = props.card

    return (
        <div className="card-component">
            {suit}
            {rank}
        </div>
    );
}

