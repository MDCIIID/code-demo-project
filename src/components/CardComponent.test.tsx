import React from 'react';
import { render, screen } from '@testing-library/react';
import { CardComponent } from './CardComponent';
import { DEFAULT_CARD, Card } from '../classes/GameClasses';
import { Suits, Ranks, SuitIcons, RankData } from '../constants/Constants';

describe('CardComponent', () => {
    //Given
    let testCard:Card = DEFAULT_CARD;

    beforeEach(() => {
        init();
    });

    const init = () => {
        render(<CardComponent card={DEFAULT_CARD}/>);
    }

    test('renders face down card by default', () => {
    
    let component = screen.getByTestId('cardComponent');
    expect(component).toBeInTheDocument();
    });


    test('renders card with suit and rank when flipped face up', () => {
    render(<CardComponent card={DEFAULT_CARD}/>);
    testCard.flip();
    let component = screen.getByTestId('cardComponent');
    const suit = screen.getByTestId("suit-span").innerHTML;
    const rank = screen.getByTestId("rank-span").innerHTML;
    expect(suit).toEqual(SuitIcons[Suits.spades]);
    expect(rank).toEqual(RankData[Ranks.Ace].letter);
    expect(component).toBeInTheDocument();
    });

  });
