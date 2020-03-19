import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Deck from '../Deck';
import axios from 'axios';
import '../../styles/SearchRoute.css'
export default function Search() {
  let id = -1
  const { tag } = useParams()
  const [search, setSearch] = useState([])
  useEffect(() => {
    axios.get(`/api/search/${tag}`).then((res) => {
      setSearch(res.data)
    })
  }, [])
  const decks = search.map((result) => {
    id++
    console.log(result);
    return (
      <div  className='searchElement' key={result.id}>
        <Deck image={result.image_url} title={result.name} description={result.description} id={id} deck_id={result.id}/>
      </div>
    )
  })
  return (
    <div style={{textAlign: 'center', height: 'auto'}}>
      <h2>{`Showing search results for: ${ tag }`}</h2>
      <div className='searchContainer' >
      {decks}
      </div>
    </div>
  )
}
