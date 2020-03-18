import React from "react";
import "../styles/StudyDeckDisplay.css";

export default function StudyDeckDisplay(props) {
  const { title, image, numOfCards, description, tags } = props;

  return (
    <div className="deck-display">
      <div className="left-display">
        <div>
          <h1>title: {title}</h1>
        </div>
        <div>
          <img
            src="https://external-preview.redd.it/m946jqmcLv5lwf5LBsNwjILkX6h76K3PM3JNPd20zFY.png?auto=webp&s=329081a64c646ed24826cedd743d9046463d562c"
            alt={title}
            className="deck-image"
          ></img>
        </div>
      </div>

      <div className="right-display">
        <div>Number of Cards: {numOfCards}</div>
        <div>Description: {description}</div>
        <div>Tags: {tags}</div>
      </div>
    </div>
  );
}
