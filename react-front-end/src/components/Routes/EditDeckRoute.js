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
  const [cardData, setCardData] = useState({})
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
  const cardList = Object.keys(cardData).map(key => {
    buildID++;
    return (
      <div key={buildID} >
        <CardForm 
        id={buildID}
        giveCardData={getCardData}
        question={cardData[key].front}
        image={cardData[key].image_url}
        answer={cardData[key].back}
        hint={cardData[key].hint}
        resources={cardData[key].resource}
        />
      </div>
    )
  })
  const deck = Object.keys(deckData).map(() => {
    return (
      <DeckForm
        title={deckData.name} 
        description={deckData.description} 
        image={deckData.image_url} 
        giveDeckData={getDeckData} 
        edit={true}
      />
      )
  })
  const newCard = () => {
    setCardData(prev => {
      return {...prev, [cardList.length]: 0}
    })
  }
  const saveDeck = (e) => {
    e.preventDefault()
    console.log(deckData, cardData)
    const data = JSON.stringify({deckData, cardData})
    axios.post(`/api/decks/${id}/edit`, {
      data
    }).then((res) => {console.log(res)})
  }
  return (
    <div>
      <h2>{`EDIT for deck with id: ${id}`}</h2>
        {deck[0]}
      <div style={{display: 'flex', alignItems: 'center', padding: '10px', justifyContent: 'center'}}>
        <Empty onClick={newCard} />
      </div>
      <div className="cardContainer" style={{display: 'flex'}}>
        {cardList}
      </div>
      <form onSubmit={saveDeck}>
      <Button type='submit' color={'primary'} variant={'contained'} style={{position: 'fixed', bottom:'0px', zIndex:'5', right:'0'}} >Save Deck</Button>
      </form>
    </div>
  )
}
