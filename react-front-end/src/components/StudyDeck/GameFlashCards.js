import React, { useState, useEffect } from "react";

export default function GameFlashCards(props) {
  const [input, setInput] = useState({
    hours: "",
    minutes: "",
    seconds: "",
    milliseconds: "",
    attempts: "",
    front: "",
  })

  const { attempts, averageTime, mostWrong, front } = props;

  useEffect(() => {
    setInput({
      "hours": averageTime.hours || '00',
      "minutes": averageTime.minutes || '00',
      "seconds": averageTime.seconds || '00',
      "milliseconds": averageTime.milliseconds,
      "attempts": attempts || '00',
      "front": front || "No attempts made yet"
    })

  }, [props])

  console.log(input.front)

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
          <p>Most Wrong: <strong>{input.front} {mostWrong}</strong></p>
          <p>Average % Correct:</p>
          <p>Average Time Completion: <strong>{input.hours}:{input.minutes}:{input.seconds}</strong> (hh:mm:ss)</p>
          <p>Attempts: <strong>{input.attempts}</strong></p>
          <p>Best Attempt:</p>
        </div>
      </div>
    </div>
  );
}
