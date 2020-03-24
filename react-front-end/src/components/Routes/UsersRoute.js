import React, { useEffect, useState } from 'react';
import Deck from '../Deck';
import { useParams } from "react-router-dom";
import axios from 'axios';
import '../../styles/SearchRoute.css'
import Empty from '../Empty'
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export default function Users() {
  let deck_id = -1
  const { id } = useParams()
  const [decks, setDecks] = useState([])
  const [login, setLogin] = useState(cookies.get('LoggedIn'))
  useEffect(() => {
    axios.get(`/api/users/${id}`).then((res) => {
      setDecks(res.data)
    })
  }, [])
  const decklist = decks.map((deck) => {
    deck_id++
    if (cookies.get('LoggedIn')) {
      return (
      <div  className='searchElement' key={deck.id}>
        <Deck image={deck.image_url} title={deck.name} description={deck.description} id={deck_id} deck_id={deck.id}/>
      </div>
      )
    } else {
      return (
        <div  className='searchElement' key={deck.id}>
        <Deck edit={true} image={deck.image_url} title={deck.name} description={deck.description} id={deck_id} deck_id={deck.id}/>
      </div>
      )
    }
  })
  const newDeck = () => {
    window.location.href = '/decks/new';
  }
  const loginHandler = () => {
    console.log(login);
    if (login) {
      return (
        <div style={{textAlign: 'center', height: 'auto'}}>
          <h2 style={{ paddingTop: "100px", marginBlockEnd: "0" }}>{'Your Decks'}</h2>
          <div className='searchContainer' >
            <div className='searchElement' >
              <Empty onClick={newDeck}/>
            </div>
            {decklist}
          </div>
        </div>  
      )
    } else {
      return (
        <div style={{textAlign: 'center', height: 'auto'}}>
          <h2 style={{ paddingTop: "100px", marginBlockEnd: "0" }}>{"Bob Loblaw's Decks"}</h2>
          <div className='searchContainer' >
            {decklist}
          </div>
        </div>  
      )
    }
  }
  return (
    loginHandler()
  )
}
