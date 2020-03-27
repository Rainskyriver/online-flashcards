import React from "react";
import StudyDeckDisplay from "../StudyDeck/StudyDeckDisplay";
import StudyDeckGame from "../StudyDeck/StudyDeckGame"

export default function Study() {
  return (
    <div style={{ height: "100%"}}> 
      <StudyDeckDisplay />
      <StudyDeckGame />
    </div>
  );
}