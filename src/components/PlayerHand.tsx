import { Card } from '../classes/GameClasses';
import { CardComponent } from './CardComponent';
import './PlayerHand.css';
export interface PlayerContainerProperties {
    hand: Card[];
}

export const PlayerHand = (props:PlayerContainerProperties) => {
    const {
        hand
    } = props

    return (
    <div className="player-hand">
        {hand.map((card) => {return <CardComponent card={card} />})}
    </div>
    );
}

