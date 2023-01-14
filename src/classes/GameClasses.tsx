import { Suits, Ranks } from '../interfaces/GameInterfaces';

export class Player implements Player {
    name: String;
    hand: Card[];
    isStanding: boolean;

    constructor(name:String) {
        this.name = name;
        this.hand = [];
        this.isStanding = false;
    }

    getName():String { return this.name};

    getHand():Card[] { return this.hand}

    getHandValue(): number {
        return -1;
    }

    playStand():void {
        this.isStanding = true;
    }

    playHit(deck:Deck): void {
        this.hand.push(deck.draw());
    }
    
}

export class Card implements Card {
    suit: Suits = Suits.spades;
    rank: Ranks = Ranks.Ace;
    faceUp: boolean = false;

    constructor(suit:Suits, rank:Ranks) {
        this.suit = suit;
        this.rank = rank;
        this.faceUp = false;
    }

    getRank(): Ranks { return this.rank}

    getSuit(): Suits { return this.suit}

    isFaceUp(): boolean { return this.faceUp; }
}

export const DEFAULT_CARD = {
        suit:Suits.spades,
        rank:Ranks.Ace,
        faceUp:false,
        getRank() {
            return Ranks.Ace
        },
        getSuit() {
            return Suits.spades
        },
        isFaceUp() {
            return false;
        }
    };

export const INITIAL_DECK_STATE = [DEFAULT_CARD];


export class Deck implements Deck {
    cards:Card[] = INITIAL_DECK_STATE

    init(): void {
        this.cards = []
        let fullDeck:Card[];
        Object.values(Suits).forEach((suit) => {
            console.log('suit: ', suit)
            Object.values(Ranks).forEach((rank) => {
                console.log('rank: ', rank);
            })
        })

    }

    draw():Card {
        return DEFAULT_CARD;
    }
   
    shuffle(): void {
        console.log('SHUFFLING!');
    }
    cut(): void {
        console.log('CUT THE DECK');
    }

    slipOut(suit:Suits, rank:number): void {
        console.log("Return a card")
    }
}

