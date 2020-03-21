import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Button } from '@material-ui/core';
import Empty from '../Empty'
import CardForm from '../CardForm'
import axios from "axios";
import DeckForm from '../DeckForm'


export default function EditDeck() {
  let buildID = -1
  const { id } = useParams()
  // const [cards, setCards] = useState([])
  const [cardData, setCardData] = useState([])
  const [deckData, setDeckData] = useState({})
  const getDeckData = (data => {
    setDeckData(data)
  })
  const getCardData = ((id, input) => {
    setCardData(prev => ({...prev, [id]: input}))
  })
  useEffect(() => {
    axios.get(`/api/decks/${id}/edit`).then(res => {
      setCardData(res.data.cards)
      setDeckData(res.data.deck)
    })
  }, [])
  console.log(deckData)
  const cardList = cardData.map(card => {
    buildID++;
    return (
      <div key={buildID} >
        <CardForm 
        id={buildID}
        question={card.front}
        image={card.image_url}
        answer={card.back}
        hint={card.hint}
        resources={card.resource}/>
      </div>
    )
  })
  const [cid, setCid] = useState(cardList.length - 1)
  const newCard = () => {
    setCardData(prev => [...prev, <div key={cid}><CardForm giveCardData={getCardData} id={cid}/></div>])
    setCid(prev => prev + 1)
  }
  return (
    <div>
      <h2>{`EDIT for deck with id: ${id}`}</h2>
      <DeckForm title={deckData.name} description={deckData.description} image={deckData.image_url} giveDeckData={getDeckData} />
      <div style={{display: 'flex', alignItems: 'center', padding: '10px', justifyContent: 'center'}}>
        <Empty onClick={newCard} />
      </div>
      <Button>Save Deck</Button>
      <div className="cardContainer" style={{display: 'flex'}}>
        {cardList}
      </div>
    </div>
  )
}
