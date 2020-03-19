import React, { useState, useEffect } from "react";
import { Button } from '@material-ui/core'
import Empty from '../Empty'
import CardForm from '../CardForm'
import axios from "axios";
import DeckForm from '../DeckForm'

export default function EditDeck() {
  const [id, setId] = useState(0)
  const [cards, setCards] = useState([])
  const saveDeck = () => {};
  const newCard = () => {
    setCards(prev => [...prev, <div key={id}><CardForm/></div>])
    setId(prev => prev + 1)
  }
  return (
    <div>
      <h2>{`NEW deck`}</h2>
      <DeckForm/>
      <div style={{display: 'flex', alignItems: 'center', padding: '10px', justifyContent: 'center'}}>
        <Empty onClick={newCard} />
      </div>
      {cards}
      <Button>Save Deck</Button>
    </div>
  );
}
