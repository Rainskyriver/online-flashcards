import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import "../../styles/StudyDeckDisplay.css";

export default function StudyDeckDisplay() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    image: "",
    tags: "",
    numOfCards: "",
  })
  
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/study/${id}`).then((res) => {
      let tagDisplay = "";

      res.data.tags.forEach(tag => {
        tagDisplay += `${tag.name}, `;  
      });

      setInput({
        "title": res.data.deck.name,
        "description": res.data.deck.description,
        "image": res.data.deck.image_url,
        "tags": tagDisplay.replace(/,\s*$/, ""),
        "numOfCards": res.data.numOfCards,
      })

    })
  }, [])

  return (
    <div className="deck-display">
      <div className="left-display">
        <div>
          <h1>{input.title}</h1>
        </div>
        <div>
          <img
            src={input.image}
            alt={input.title}
            className="deck-image"
          ></img>
        </div>
      </div>

      <div className="right-display">
        <div>
          <h3>Number of Cards: </h3><p>Hey! This deck has <strong>{input.numOfCards}</strong> cards!</p>
        </div>
        <div>
          <h3>Description: </h3><p>{input.description}</p>
        </div>
        <div>
          <h3>Tags: </h3> <p>{input.tags}</p>
        </div>
      </div>
    </div>
  );
}
