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
    })
  }, []);
  
  return (
    <div className="game-landing-page">
      <h2>{`Test for deck with id: ${id}`}</h2>
      <Button>Start Study for Test</Button>
    </div>
  )
}