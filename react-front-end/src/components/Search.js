import React from 'react';
import { useParams } from "react-router-dom";

export default function Search() {
  let { tag } = useParams()
  return (
    <div>
      <h2>{`Showing search results for: ${tag}`}</h2>
    </div>
  )
}
