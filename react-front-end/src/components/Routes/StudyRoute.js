import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import StudyIndex from "../StudyDeck/StudyIndex"
import axios from 'axios';

export default function Study() {
  const { id } = useParams()
  useEffect(() => {
    axios.get(`/api/study/${id}`).then((res) => {
      console.log(res.data)
    })
  }, [])
  return (
    <div>
      <StudyIndex/>
    </div>
  )
}
