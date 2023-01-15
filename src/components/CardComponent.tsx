import { SuitIcons, RanksToValues, Ranks, RankData } from '../constants/Constants';
import { Card } from '../classes/GameClasses';
import './CardComponent.css';
import CardBack from '../resources/card back blue 25 percent.png';

export interface CardComponentProperties {
    card:Card
}

export const CardComponent = (props:CardComponentProperties) => {
    const {
        card
    } = props;
    const { suit, rank } = card;

    const showRank = (rank:Ranks) => {
        //console.log('show rank')
        if (RanksToValues[rank] > 10 || RanksToValues[rank] === 1) {
            return RankData[rank].Letter;
        }
        return RanksToValues[rank];
    }

    return (
        <div className="card-component">
            {card.isFaceUp() && 
            <div className="card-front">
                {SuitIcons[suit]}
                {showRank(rank)}
            </div>}
            {!card.isFaceUp() &&
            <div>
                <img className="card-back" src={CardBack} />
            </div>
            }
        </div>
    );
}

