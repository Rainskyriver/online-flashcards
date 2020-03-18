import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function Search() {
  const { tag } = useParams()
  useEffect(() => {
    axios.get(`/api/search/${tag}`).then((res) => {
      console.log(res.data)
    })
  }, [])
  return (
    <div>
      <h2>{`Showing search results for: ${ tag }`}</h2>
    </div>
  )
}
