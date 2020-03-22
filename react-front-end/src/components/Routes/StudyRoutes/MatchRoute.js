import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Button } from '@material-ui/core';
import axios from 'axios';
import '../../../styles/Game.css';

export default function Match() {
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/study/${id}/match`).then((res) => {
      console.log(res.data)
    })
  }, []);
  
  return (
    <div className="game-landing-page">
      <h2>{`MEMORY MATCH for deck with id: ${id}`}</h2>
      <Button>Start Memory Match</Button>
    </div>
  )
}