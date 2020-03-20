import React from "react";
import "../../styles/StudyDeckDisplay.css";

export default function StudyDeckDisplay(props) {
  const { title, image, numOfCards, description, tags } = props;

  return (
    <div className="deck-display">
      <div className="left-display">
        <div>
          <h1>{title}</h1>
        </div>
        <div>
          <img
            src={image}
            alt={title}
            className="deck-image"
          ></img>
        </div>
      </div>

      <div className="right-display">
        <div>
          <h3>Number of Cards: </h3><p>{numOfCards}Hey I've got cards</p>
        </div>
        <div>
          <h3>Description: </h3><p>{description}</p>
        </div>
        <div>
          <h3>Tags: </h3> <p>{tags} hi I'm a tag</p>
        </div>
      </div>
    </div>
  );
}
