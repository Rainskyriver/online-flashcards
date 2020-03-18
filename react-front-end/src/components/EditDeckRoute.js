import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Button } from '@material-ui/core';
import axios from 'axios';

export default function EditDeck() {
  const { id } = useParams()
  useEffect(() => {
    axios.get(`/api/decks/${id}/edit`).then((res) => {
      console.log(res.data)
    })
  }, [])
  return (
    <div>
      <h2>{`EDIT for deck with id: ${id}`}</h2>
      <Button>Save Deck</Button>
    </div>
  )
}
