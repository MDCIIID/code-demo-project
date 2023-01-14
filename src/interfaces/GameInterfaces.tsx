export interface Card {
    suit: Suits;
    rank: Ranks;
    faceUp: boolean;
    getRank(): Ranks;
    getSuit(): Suits;
    isFaceUp(): boolean;
    isAce():boolean;
}


export enum Suits {
    spades = "SPADES",
    hearts = "HEARTS",
    diamonds = "DIAMONDS",
    clubs = "CLUBS"
}

export interface Deck {
    cards: Card[];
    init(): void;
    draw(): Card;
    shuffle(): void;
    cut(): void;
    slipOut(suit:Suits, rank:number): Card;
}

export enum Ranks {
    Ace = "1",
    Two = "2",
    Three = "3",
    Four = "4",
    Five = "5",
    Six = "6",
    Seven = "7",
    Eight = "8",
    Nine = "9",
    Ten = "10",
    Jack = "11",
    Queen = "12",
    King = "13"
}
