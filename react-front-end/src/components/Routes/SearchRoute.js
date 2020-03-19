import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Deck from '../Deck';
import axios from 'axios';
export default function Search() {
  let id = 0
  const { tag } = useParams()
  const [search, setSearch] = useState([])
  useEffect(() => {
    axios.get(`/api/search/${tag}`).then((res) => {
      setSearch(res.data)
    })
  }, [])
  const decks = search.map((result) => {
    console.log(result);
    return (
      <div style={{padding: '50px'}} key={result.id}>
        <Deck  title={result.name} description={result.description} id={id} deck_id={result.id}/>
        {id++}
      </div>
    )
  })
  return (
    <div>
      <h2>{`Showing search results for: ${ tag }`}</h2>
      {decks}
    </div>
  )
}
