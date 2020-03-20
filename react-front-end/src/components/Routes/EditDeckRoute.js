import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Button } from '@material-ui/core';
import Empty from '../Empty'
import CardForm from '../CardForm'
import axios from "axios";
import DeckForm from '../DeckForm'


export default function EditDeck() {
  const { id } = useParams()
  let buildID = 0
  const [cards, setCards] = useState([])
  const [cardData, setCardData] = useState({})
  const [deckData, setDeckData] = useState({})
  const getDeckData = (data => {
    setDeckData(data)
  })
  const getCardData = ((id, input) => {
    setCardData(prev => ({...prev, [id]: input}))
  })
  useEffect(() => {
    axios.get(`/api/decks/${id}/edit`).then((res) => {
      console.log(res.data)
      res.data.cards.forEach((card) => {
        setCards(prev => [...prev, 
          <div key={buildID} >
            <CardForm 
              id={buildID}
              question={card.front} 
              answer={card.back} 
              hint={card.hint}
              image={card.image_url} 
              resources={card.resource} 
              giveCardData={getCardData} 
              />
          </div>])
          buildID++;
        })
      })
    }, [])
    const [cid, setcId] = useState(0)
    return (
    <div>
      <h2>{`EDIT for deck with id: ${id}`}</h2>
      <Button>Save Deck</Button>
      <div className="cardContainer" style={{display: 'flex'}}>
        {cards}
      </div>
    </div>
  )
}
