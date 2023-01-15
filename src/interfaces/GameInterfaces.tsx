import { Suits, Ranks } from "../constants/Constants"

export interface Card {
    suit: Suits;
    rank: Ranks;
    faceUp: boolean;
    getRank(): typeof Ranks;
    getSuit(): Suits;
    isFaceUp(): boolean;
    isAce():boolean;
}

export interface Deck {
    cards: Card[];
    init(): void;
    draw(): Card;
    shuffle(): void;
    cut(): void;
    slipOut(suit:Suits, rank:number): Card;
}
