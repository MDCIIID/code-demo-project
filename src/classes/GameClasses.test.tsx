import { Suits, Ranks, RankData } from '../constants/Constants';
import { Player, Card, PlayerActor } from '../classes/GameClasses';

describe('Classes', () => {
    let testPlayerName:string = "Bob";
    let testPlayer:Player;

    beforeEach(() => {
         testPlayer = new Player(testPlayerName);
    })

    describe('Player', () => {

        test('newly initialized returns name', () => {
            expect(testPlayer.getName()).toEqual(testPlayerName);
        });

        test('newly initialized hand is empty', () => {
            expect(testPlayer.getHand().length).toEqual(0);
        })

        test('newly initialized state is not terminal', () => {
            expect(testPlayer.inTerminalState()).toEqual(false);
        })
    });
});
