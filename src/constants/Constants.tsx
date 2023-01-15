export const CONSTANTS = {
    DealerName: "Dealer"
}

export enum SuitIcons {
    "SPADES" = "♠",
    "HEARTS" = "♥",
    "CLUBS" = "♣",
    "DIAMONDS" = "♦"
}

export enum Suits {
    spades = "SPADES",
    hearts = "HEARTS",
    diamonds = "DIAMONDS",
    clubs = "CLUBS"
}

export enum Ranks {
    Ace     = "Ace",
    Two     = "Two",
    Three   = "Three",
    Four    = "Four",
    Five    = "Five",
    Six     = "Six",
    Seven   = "Seven",
    Eight   = "Eight",
    Nine    = "Nine",
    Ten     = "Ten",
    Jack    = "Jack",
    Queen   = "Queen",
    King    = "King"
}

export enum RanksToValues {
    "Ace"   = 1,
    "Two"   = 2,
    "Three" = 3,
    "Four"  = 4,
    "Five"  = 5,
    "Six"   = 6,
    "Seven" = 7,
    "Eight" = 8,
    "Nine"  = 9,
    "Ten"   = 10,
    "Jack"  = 11,
    "Queen" = 12,
    "King"  = 13
}

export const RankData = {
    [Ranks.Ace] :   {value: 1, Letter: "A"},
    [Ranks.Two] :   {value: 2, Letter: undefined},
    [Ranks.Three] : {value: 3, Letter: undefined},
    [Ranks.Four] :  {value: 4, Letter: undefined},
    [Ranks.Five] :  {value: 5, Letter: undefined},
    [Ranks.Six] :   {value: 6, Letter: undefined},
    [Ranks.Seven] : {value: 7, Letter: undefined},
    [Ranks.Eight] : {value: 8, Letter: undefined},
    [Ranks.Nine] :  {value: 9, Letter: undefined},
    [Ranks.Ten] :   {value: 10, Letter: undefined},
    [Ranks.Jack] :  {value: 11, Letter: "J"},
    [Ranks.Queen] : {value: 12, Letter: "Q"},
    [Ranks.King] :  {value: 13, Letter: "K"}
}
