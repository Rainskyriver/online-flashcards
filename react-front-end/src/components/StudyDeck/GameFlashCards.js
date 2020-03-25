import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


export default function GameFlashCards() {
  const [input, setInput] = useState({
    hours: "",
    minutes: "",
    seconds: "",
    milliseconds: "",
    attempts: "",
    front: "",
    mostWrong: "",
  })

  const { id } = useParams();
  
  useEffect(() => {
    axios.get(`/api/study/${id}`).then((res) => {
      setInput({
        "hours": res.data.averageTime.hours || '00',
        "minutes": res.data.averageTime.minutes || '00',
        "seconds": res.data.averageTime.seconds || '00',
        "milliseconds": res.data.averageTime.milliseconds,
        "attempts": res.data.attempts || '00',
        "front": res.data.front || "No attempts made yet",
        "mostWrong": res.data.mostWrong || ""
      })
    })
  }, [])

  return (
    <div className="game-flash-cards">
      <div className="game-left-display">
        <h1>Flash Cards</h1>
        <h3>Options</h3>
        <ul>
          <li>checkbox1</li>
          <li>checkbox2</li>
          <li>checkbox3</li>
          <li>checkbox4</li>
          <li>checkbox5</li>
          <li>checkbox6</li>
        </ul>
      </div>
      <div className="game-right-display">
        <h1>History</h1>
        <div>
          <p>Most Wrong: <strong>{input.front} {input.mostWrong}</strong></p>
          <p>Average % Correct:</p>
          <p>Average Time Completion: <strong>{input.hours}:{input.minutes}:{input.seconds}</strong> (hh:mm:ss)</p>
          <p>Attempts: <strong>{input.attempts}</strong></p>
          <p>Best Attempt:</p>
        </div>
      </div>
    </div>
  );
}
