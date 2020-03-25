import React, { useState, useEffect } from "react";
import { Button } from '@material-ui/core'
import Empty from '../Empty'
import CardForm from '../CardForm'
import axios from "axios";
import DeckForm from '../DeckForm'
import '../../styles/EditDeckRoute.css'
import {green, yellow} from '@material-ui/core/colors'

const primary = green[700];
const secondary = []
export default function EditDeck() {
  const [id, setId] = useState(0)
  const [cards, setCards] = useState([])
  const [cardData, setCardData] = useState({})
  const [deckData, setDeckData] = useState({})
  const getDeckData = (data => {
    setDeckData(data)
  })
  const getCardData = ((id, input) => {
    setCardData(prev => ({...prev, [id]: input}))
  })
  const saveDeck = (e) => {
    e.preventDefault();
    const data = JSON.stringify({deckData, cardData})
    axios.post('/api/decks/new', {
      data
    }).then((res) => {console.log(res)})
  };
  const newCard = () => {
    setCards(prev => [...prev, <div key={id}><CardForm giveCardData={getCardData} id={id}/></div>])
    setId(prev => prev + 1)
  }
  const hello = {
     averageTime: {days: 34, hours: 12, minutes: 26, seconds: 22, milliseconds: 422.222}
  }
  return (
    <div className={'deckWrapper'}>
      <h2>{`NEW deck`}</h2>
      <DeckForm edit={true} averageTime={hello.averageTime} giveDeckData={getDeckData} />
      <div style={{display: 'flex', alignItems: 'center', padding: '10px', justifyContent: 'center'}}>
        <Empty onClick={newCard} />
      </div>
      <div>
      {cards}
      </div>
      <form onSubmit={saveDeck}>
      <Button type='submit' color={'primary'} variant={'contained'} style={{ width: '100%', position: 'fixed', bottom:'0px', zIndex:'5', right:'0'}} >Save Deck</Button>
      </form>
    </div>
  );
}
