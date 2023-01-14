import { Card } from '../classes/GameClasses';
import { CardComponent } from './CardComponent';

export interface PlayerContainerProperties {
    hand: Card[];
}

export const PlayerHand = (props:PlayerContainerProperties) => {
    const {
        hand
    } = props

    return (
    <div>
        {hand.map((card) => {return <CardComponent card={card} />})}
    </div>
    );
}

