import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Deck from './Deck';
import axios from 'axios';

export default function Search() {
  const { tag } = useParams()
  const [search, setSearch] = useState([])
  useEffect(() => {
    axios.get(`/api/search/${tag}`).then((res) => {
      setSearch(res.data)
      console.log(search);
    })
  }, [])
  console.log(search)
  const decks = search.map((result) => {
    return (
      <Deck key={result.id} title={result.name} description={result.description}/>
    )
  })
  return (
    <div>
      <h2>{`Showing search results for: ${ tag }`}</h2>
      {decks}
    </div>
  )
}
