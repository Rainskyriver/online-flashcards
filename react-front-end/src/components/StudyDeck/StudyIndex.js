import React, { Fragment } from "react";

import StudyDeckDisplay from "./StudyDeckDisplay";
import StudyDeckGame from "./StudyDeckGame";

export default function StudyIndex(props) {
  return (
    <Fragment>
      <StudyDeckDisplay />
      <StudyDeckGame />
    </Fragment>
  );
}
