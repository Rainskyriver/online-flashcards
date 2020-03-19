import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function Users() {
  const { id } = useParams()
  useEffect(() => {
    axios.get(`/api/users/${id}`).then((res) => {
      console.log(res.data)
    })
  }, [])
  return (
    <div style={{textAlign: 'center', height: 'auto'}}>
      <h2>{`Your decks`}</h2>
    </div>  
  )
}
