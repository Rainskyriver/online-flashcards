import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import StudyIndex from "../StudyDeck/StudyIndex";

export default function Study(props) {
  const [input, setInput] = useState({
    title: "",
    description: "",
    image: "",
    tags: "",
    numOfCards: "",
    attempts: "",
    averageTime: "",
    mostWrong: "",
    front: "",
  })
  
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/study/${id}`).then((res) => {
      setInput({
        "title": res.data.deck.name,
        "description": res.data.deck.description,
        "image": res.data.deck.image_url,
        // "tags": res.data.tags
        "numOfCards": res.data.numOfCards,
        "attempts": res.data.attempts,
        "averageTime": res.data.averageTime,
        "mostWrong": res.data.mostWrong,
        "front": res.data.front,
      })

    })
  }, [])

  return (
    <div>
      <StudyIndex 
      title={input.title}
      description={input.description}
      image={input.image}
      numOfCards={input.numOfCards}
      // tags={input.tags}
      attempts={input.attempts}
      averageTime={input.averageTime}
      mostWrong={input.mostWrong}
      front={input.front}
      />
    </div>
  )
}