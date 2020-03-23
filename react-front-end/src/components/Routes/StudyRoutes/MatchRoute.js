import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { Button } from '@material-ui/core';
import MatchGame from './MatchGame/MatchGame';
import axios from 'axios';
import '../../../styles/Game.css';

export default function Match() {
  const { id } = useParams();
  const [cardData, setCardData] = useState([])

  useEffect(() => {
    axios.get(`/api/study/${id}/match`).then((res) => {
      setCardData(res.data.cards)
    })
  }, []);
  
  return (
    <div className="game-landing-page">
      <MatchGame cards={cardData} />
    </div>
  )
}