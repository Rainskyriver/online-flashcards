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

  const handleDefault = (e) => {
    e.target.src = 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
  }

  return (
    <div className="deck-display">
      <div className="left-display">
        <div>
          <h1>{input.title}</h1>
        </div>
        <div>
          <img
            onError={handleDefault}
            src={input.image}
            alt={input.title}
            className="deck-image"
          ></img>
        </div>
      </div>

      <div className="right-display">
        <div style={{ fontSize: "larger" }}>
          <h2 className="header-spacing">Number of Cards: </h2><p className="paragraph-spacing">Hey! This deck has <strong>{input.numOfCards}</strong> cards!</p>
        </div>
        <div>
          <h2 className="header-spacing">Description: </h2><p className="paragraph-spacing">{input.description}</p>
        </div>
        <div>
          <h2 className="header-spacing">Tags: </h2> <p className="paragraph-spacing">{input.tags}</p>
        </div>
      </div>
    </div>
  );
}
