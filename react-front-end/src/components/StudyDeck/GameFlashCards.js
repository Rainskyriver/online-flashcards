import React from "react";

export default function GameFlashCards(props) {
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
          <p>Most Wrong:</p>
          <p>Average % Correct:</p>
          <p>Average Time Completion:</p>
          <p>Attempts:</p>
          <p>Best Attempt:</p>
        </div>
      </div>
    </div>
  );
}
