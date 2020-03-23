import React, { useRef, useState, useEffect } from 'react';
import FirstCard from './MatchCard/FirstCard';
import SecondCard from './MatchCard/SecondCard';
import '../../../../styles/MatchGame.css'

function shuffle(array) {
  const returnArray = array.slice(0);
  var currentIndex = returnArray.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = returnArray[currentIndex];
    returnArray[currentIndex] = returnArray[randomIndex];
    returnArray[randomIndex] = temporaryValue;
  }

  return returnArray;
}
function historyHelper(arr) {
  const returnArray = arr
  returnArray.splice(returnArray.length - 2);
  console.log(returnArray)
  return [...returnArray]
}
export default function MatchGame(props) {
  const [deck, setDeck] = useState([])
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [flipHistory, setFlipHistory] = useState([])
  const selectedCard = (id, uid) => {
    if (!first) {
      setFirst(() => id);
      setFlipHistory(prev => [...prev, uid])
    } else if (!second) {
      setSecond(() => id);
      setFlipHistory(prev => [...prev, uid])
    } else if (first === second) {
      console.log('match!')
      setFirst(0);
      setSecond(0);
    } else {
      setFlipHistory(prev => [...historyHelper(prev)])
      setFirst(0);
      setSecond(0);
    } 
  }
  console.log(flipHistory)
  useEffect(() => {
    let uid=-2;
    const seperatedCards = [].concat(...props.cards.map((card) => {
      uid+=2;
      return [{uid: uid, id: card.id, deck_id: card.deck_id, front: card.front, image_url: card.image_url},
              {uid: uid+1, id: card.id, deck_id: card.deck_id, back: card.back}] 
    }))
    setDeck(shuffle(seperatedCards));
  }, [props.cards])
  const deckR = (deck.map((card) => {
    if (card.front) {
      return (
        <div key={Math.random()}>
          <FirstCard
          selectCard={selectedCard}
          uid={card.uid}
          flip={flipHistory.includes(card.uid) ? true : false}
          id={card.id}
          deck_id={card.deck_id}
          front={card.front}
          image_url={card.image_url}
          />
        </div>
      )
    } else {
      return (
        <div key={Math.random()}>
          <SecondCard
          uid={card.uid}
          selectCard={selectedCard}
          flip={flipHistory.includes(card.uid) ? true : false}
          id={card.id}
          deck_id={card.deck_id}
          back={card.back}
          />
        </div>
      )
    }
  }))
  return (
    <div className="wrapper">
      <div className='container' >
        {deckR}
      </div>
    </div>
  )
}