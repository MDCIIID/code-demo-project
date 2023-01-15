import React from 'react';
import { render, screen } from '@testing-library/react';
import { CardComponent } from './CardComponent';
import { DEFAULT_CARD, Card } from '../classes/GameClasses';
import { Suits, Ranks, SuitIcons, RankData } from '../constants/Constants';

test('renders CardComponent', () => {
    let testCard:Card = DEFAULT_CARD;
    testCard.flip();

    render(<CardComponent card={DEFAULT_CARD}/>);
    const component = screen.getByTestId('cardComponent');
    const suit = screen.getByTestId("suit-span").innerHTML;
    const rank = screen.getByTestId("rank-span").innerHTML;
    expect(suit).toEqual(SuitIcons[Suits.spades]);
    expect(rank).toEqual(RankData[Ranks.Ace].letter);
    expect(component).toBeInTheDocument();
  });
