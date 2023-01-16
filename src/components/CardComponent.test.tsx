import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { CardComponent } from './CardComponent';
import { Card } from '../classes/GameClasses';
import { Suits, Ranks, SuitIcons, RankData } from '../constants/Constants';

describe('CardComponent', () => {
    //Given
    let testCard = new Card(Suits.spades, Ranks.Ace);

    afterEach(() =>{
        cleanup();
    })
    
    describe('Rendering CardComponent', () => {

        test('renders face down card by default', () => {
            render(<CardComponent card={testCard} />)
            let component = screen.getByTestId('cardComponent');
            expect(component).toBeInTheDocument();
            });
        
        test('renders card with suit and rank when flipped face up', () => {
            testCard.flip();
            render(<CardComponent card={testCard} />)
            let component = screen.getByTestId('cardComponent');
            const suit = screen.getByTestId("suit-span").innerHTML;
            const rank = screen.getByTestId("rank-span").innerHTML;
            expect(suit).toEqual(SuitIcons[Suits.spades]);
            expect(rank).toEqual(RankData[Ranks.Ace].letter);
            expect(component).toBeInTheDocument();
            });
    })
  });
