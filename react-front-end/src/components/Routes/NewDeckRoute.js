import React, { useState, useEffect } from "react";
import { Button } from '@material-ui/core'
import Empty from '../Empty'
import CardForm from '../CardForm'
import axios from "axios";
import DeckForm from '../DeckForm'

export default function EditDeck() {
  const [id, setId] = useState(0)
  const [cards, setCards] = useState([])
  const [deck, setDeck] = useState({})
  const getDeckData = (data => {
    setDeck(data)
  })
  const saveDeck = (e) => {
    e.preventDefault();
    const data = JSON.stringify({deck, cards})
    console.log(data);
    axios.post('/api/decks/new', data, {
      headers: {
        'Content-Type': 'application/json',
    }
    }).then((res) => {
      console.log(res)
    })
  };
  const newCard = () => {
    console.log(id)
    setCards(prev => [...prev, <div key={id}><CardForm id={id}/></div>])
    setId(prev => prev + 1)
  }
  return (
    <div>
      <h2>{`NEW deck`}</h2>
      <DeckForm giveDeckData={getDeckData} />
      <div style={{display: 'flex', alignItems: 'center', padding: '10px', justifyContent: 'center'}}>
        <Empty onClick={newCard} />
      </div>
      <div className="cardContainer" style={{display:'flex'}}>
      {cards}
      </div>
      <form onSubmit={saveDeck}>
      <Button type='submit' color={'primary'} variant={'contained'} style={{position: 'fixed', bottom:'0px', zIndex:'5', right:'0'}} >Save Deck</Button>
      </form>
    </div>
  );
}
