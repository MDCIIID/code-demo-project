import { Suits, Ranks } from '../interfaces/GameInterfaces';

export class Player implements Player {
    name: string ='';
    hand: Card[];
    isStanding: boolean = false;

    constructor(name:string) {
        this.name = name;
        this.hand = [];
        this.isStanding = false;
    }

    getName():string { return this.name};
    getHand():Card[] { return this.hand}
    getHandValue(): number {return -1}
    hasStood():boolean {return this.isStanding}
    takeStand():void {
        console.log("I'm Standing!")
        this.isStanding = true;
    }
    takeHit(card:Card): void {
        console.log("Hit me!");
        this.hand.push(card);
    }
    isDealer():boolean {return this.name.toLocaleLowerCase() === 'dealer'}
}

export class PlayerRoster {
    players: string[] = [];
    roster: Player[] = [];

    constructor(players:string[]) {
        this.players = players;
    }

    init():Player[] {
        this.players.forEach((name)=>{
            this.roster.push(new Player(name));
        });     
        return this.roster
    }
}

export class Card implements Card {
    suit: Suits = Suits.spades;
    rank: Ranks = Ranks.Ace;
    faceUp: boolean;

    constructor(suit:Suits, rank:Ranks) {
        this.suit = suit;
        this.rank = rank;
        this.faceUp = false;
    }

    getRank(): Ranks { return this.rank}

    getSuit(): Suits { return this.suit}

    isFaceUp(): boolean { return this.faceUp; }

    isAce(): boolean { return this.rank === Ranks.Ace; }

    toString(): string { return "card string:" + this.getRank() + this.getSuit()}
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
    cards:Card[] = []
    chanceToSwap:number = .35;

    init(): void {
        console.log()
        this.cards = []
        Object.values(Suits).forEach((suit) => {
            Object.values(Ranks).forEach((rank) => {
                this.cards.push(new Card(suit, rank))
            })
        })
        console.log('Initialized: ', this.cards);
    }

    draw():Card | undefined {
        const card = this.cards.shift();
        if (card) {
        return card;
        }
        return undefined;
    }


   
    shuffle(): void {
        console.log('SHUFFLING!');
        this.cards.forEach((card, index)=>{
            let placeholder:Card;
            if (Math.random() <= this.chanceToSwap){
                placeholder = card;
                const newCardIndex:number = Math.floor(Math.random() * this.cards.length);
                this.cards[index] = this.cards[newCardIndex];
                this.cards[newCardIndex] = placeholder;
            }
        })
    }

    cut(): void {
        const deckBefore:Card[] = [...this.cards];
        console.log('pre cut: ', deckBefore);
        const middleIndex:number = Math.floor(this.cards.length / 2);
        const firstHalf = this.cards.splice(0,middleIndex);
        const secondHalf = this.cards.splice(-middleIndex);
        this.cards = [...secondHalf, ...firstHalf];
        console.log("post cut:", this.cards);
    }

    slipOut(suit:Suits, rank:number): void {
        console.log("Return a card")
    }

    getCards():Card[] {
        return this.cards;
    }

    toString():string {
        const output:string ='';
        this.cards.forEach((card)=> output + ", " + card.toString())
        return output;
    }
}

export class SuperRandomDeck extends Deck {
    chanceToSwap:number = .99;
}

