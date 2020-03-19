import React, { Fragment } from "react";

import StudyDeckDisplay from "./StudyDeckDisplay";
import StudyDeckGame from "./StudyDeckGame";

export default function StudyIndex(props) {
  const { title, description, image, tags, numOfCards } = props;
  return (
    <Fragment>
      <StudyDeckDisplay 
      title={title}
      description={description}
      image={image}
      // tags={tags}
      // numOfCards={numOfCards}
      />
      <StudyDeckGame />
    </Fragment>
  );
}
