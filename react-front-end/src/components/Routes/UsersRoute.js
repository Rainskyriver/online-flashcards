import React, { useEffect, useState } from 'react';
import Deck from '../Deck';
import { useParams } from "react-router-dom";
import axios from 'axios';
import '../../styles/SearchRoute.css'
import Empty from '../Empty'
export default function Users() {
  let deck_id = -1
  const { id } = useParams()
  const [decks, setDecks] = useState([])
  useEffect(() => {
    axios.get(`/api/users/${id}`).then((res) => {
      setDecks(res.data)
    })
  }, [])
  const decklist = decks.map((deck) => {
    deck_id++
    console.log(deck);
    return (
      <div  className='searchElement' key={deck.id}>
        <Deck image={deck.image_url} title={deck.name} description={deck.description} id={deck_id} deck_id={deck.id}/>
      </div>
    )
  })
  return (
    <div style={{textAlign: 'center', height: 'auto'}}>
      <h2>{`Your decks`}</h2>
      <div className='searchContainer' >
        <div className='searchElement' >
        <Empty />
        </div>
        {decklist}
      </div>
    </div>  
  )
}
