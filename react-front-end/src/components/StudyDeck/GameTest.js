import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function GameFlashCards(props) {
  const [input, setInput] = useState({
    hours: "",
    minutes: "",
    seconds: "",
    milliseconds: "",
    attempts: "",
    front: "",
    mostWrong: "",
    averageCorrect: "",
    bestAttempt: "",
    bestAttemptData: "",
    numOfCards: "",
  })

  const { id } = useParams();
  
  useEffect(() => {
    axios.get(`/api/study/${id}`).then((res) => {
      setInput({
        "hours": res.data.averageTime.hours || "00",
        "minutes": res.data.averageTime.minutes || "00",
        "seconds": res.data.averageTime.seconds || "00",
        "milliseconds": res.data.averageTime.milliseconds,
        "attempts": res.data.attempts || "00",
        "front": res.data.front || "No attempts made yet",
        "mostWrong": res.data.mostWrong || "",
        "averageCorrect": res.data.averageCorrect || "00",
        "bestAttempt": res.data.bestAttempt || "No attempts made yet",
        "bestAttemptData": res.data.bestAttemptData || "",
        "numOfCards": res.data.numOfCards || "00"
      })
    })
  }, [])

  return (
    <div className="game-test">
    <h1>History</h1>
    <div>
          <p>Most Wrong: <strong>{input.front} {input.mostWrong}</strong></p>
          <p>Average % Correct: <strong>{input.averageCorrect}%</strong></p>
          <p>Average Time Completion: <strong>{input.hours}:{input.minutes}:{input.seconds}</strong> (hh:mm:ss)</p>
          <p>Attempts: <strong>{input.attempts}</strong></p>
          <p>Best Attempt: <strong>{input.bestAttempt}/{input.numOfCards}</strong></p>
        </div>
  </div>
  );
}
