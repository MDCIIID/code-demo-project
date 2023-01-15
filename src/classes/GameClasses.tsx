import { Suits, Ranks, RankData } from '../constants/Constants';

export class Player implements Player {
    name: string ='';
    hand: Card[];
    isStanding: boolean = false;
    blackjack: boolean = false;
    wentBust: boolean = false;

    constructor(name:string) {
        this.name = name;
        this.hand = [];
        this.isStanding = false;
    }

    getName():string { return this.name};
    getHand():Card[] { return this.hand}
    getHandValue(): number {
        //console.log(`${this.name} calculating hand`);
        let handValue = 0;
        let aceInHand:Card[] = this.hand.filter((card)=>{return card.isAce()})

        this.hand.forEach((card, index)=>{
            //console.log(`${this.name}'s #${index} card: `, card);
            if (!card.isAce()) {
                //console.log(`\tcard not an ace: `, card);
            const cardValue = RankData[card.getRank()].value > 10 ? 10 : RankData[card.getRank()].value;
            handValue += cardValue;
            }
        })
        //console.log('\tpost for loop: ', handValue);

        if (aceInHand.length) {
            //console.log('aceInHand.length: ', aceInHand.length, '\n', aceInHand)
            const calculatedValue:number = ((aceInHand.length)*11)
            const calculatedAltValue:number = ((aceInHand.length)*1); 
            
            if (handValue + calculatedValue > 21 && handValue + calculatedAltValue > 21) {
                handValue = handValue + calculatedAltValue;
            } else if (handValue + calculatedValue <= 21) {
                handValue = handValue + calculatedValue;
            } else if (handValue + calculatedAltValue <= 21) {
                handValue = handValue + calculatedAltValue;
            }
        }

        if (handValue === 21) {
            this.blackjack = true;
        }

        if (handValue > 21) {
            this.wentBust = true;
        }

        //console.log('\thand: ', handValue);
        return handValue;
    }
    hasStood():boolean {return this.isStanding}
    takeStand():void {
        console.log("I'm Standing!")
        this.isStanding = true;
    }
    takeHit(card:Card): void {
        //console.log("Hit me!");
        this.hand.push(card);
    }
    isDealer():boolean {return this.name.toLocaleLowerCase() === 'dealer'}

    isBust():boolean { return this.getHandValue() > 21}
    hasBlackjack():boolean { return this.blackjack }
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

    flip(): void { this.faceUp = !this.faceUp }

    isFaceUp(): boolean { return this.faceUp; }

    isAce(): boolean { return this.rank === Ranks.Ace; }

    toString(): string { return "card string:" + this.getRank() + this.getSuit()}
}

export const DEFAULT_CARD = new Card(Suits.spades, Ranks.Ace);

export const INITIAL_DECK_STATE = [DEFAULT_CARD];

//The basic deck with some chance to shuffle
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
        if (this.cards.length > 0) {
            return this.cards.shift();
        } else {
            return undefined;
        }
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

//Just an extra random deck for shuffling
export class SuperRandomDeck extends Deck {
    chanceToSwap:number = .99;
}

//Debug deck to check ace value calculation
export class AllAcesDeck extends Deck {
    init(): void {
        console.log()
        this.cards = new Array(52);
        this.cards.fill(new Card(Suits.spades, Ranks.Ace));
    }
}
