import React from 'react';
import FirstCard from './MatchCard/FirstCard';
import SecondCard from './MatchCard/SecondCard';

export default function MatchGame(props) {
  // console.log(props)
  const seperatedCards = [].concat(...props.cards.map((card) => {
    return [{id: card.id, deck_id: card.deck_id, front: card.front, image_url: card.image_url},
            {id: card.id, deck_id: card.deck_id, back: card.back}] 
  }))
  console.log(seperatedCards)
  return (
    <div>
      <FirstCard image_url={"https://ca.slack-edge.com/T2G8TE2E5-UDC0C5605-7147c37e77b3-512"}/>
    </div>
  )
}