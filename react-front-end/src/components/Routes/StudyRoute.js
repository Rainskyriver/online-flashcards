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
    numOfCards: ""
  })
  
  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/study/${id}`).then((res) => {
      console.log(res.data)
      setInput({
        "title": res.data.deck.name,
        "description": res.data.deck.description,
        "image": res.data.deck.image_url,
        // "tags": res.data.tags
      })

    })
  }, [])

  return (
    <div>
      <StudyIndex 
      title={input.title}
      description={input.description}
      image={input.image}
      // numOfCards={}
      // tags={input.tags}
      />
    </div>
  )
}
