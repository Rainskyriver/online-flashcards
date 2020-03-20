import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Button } from '@material-ui/core';
import axios from 'axios';
import '../../../styles/Game.css';

export default function Test() {
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/decks/${id}/test`).then((res) => {
      console.log(res.data)
      console.log('here')
    })
  }, []);

  return (
    <div className="game-landing-page">
      <h2>{`TEST for deck with id: ${id}`}</h2>
      <h1>HELLO</h1>
      <Button>Start Test</Button>
    </div>
  )
}