import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function Users() {
  const { id } = useParams()
  useEffect(() => {
    axios.get(`/api/decks/${id}`).then((res) => {
      console.log(res.data)
    })
  }, [])
  return (
    <div>
      <h2>{`Information for deck with id: ${id}`}</h2>
    </div>
  )
}
