import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Button } from '@material-ui/core';
import axios from 'axios';
import '../../../styles/Game.css';

export default function Original() {
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/decks/${id}/original`).then((res) => {
      console.log(res.data)
    })
  }, []);
  
  return (
    <div className="game-landing-page">
      <h2>{`Original for deck with id: ${id}`}</h2>
      <Button>Start Study for Original</Button>
    </div>
  )
}