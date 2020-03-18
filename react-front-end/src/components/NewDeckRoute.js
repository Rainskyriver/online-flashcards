import React from "react";
import { Button } from '@material-ui/core'
import axios from "axios";
import DeckForm from './DeckForm'

export default function EditDeck() {
  const saveDeck = () => {};
  return (
    <div>
      <h2>{`NEW deck`}</h2>
      <DeckForm/>
      <Button>Save Deck</Button>
    </div>
  );
}
