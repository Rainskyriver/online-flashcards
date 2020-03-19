import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";

import "../styles/Empty.css";

export default function Empty(props) {
  return (
    <div className="cover" onClick={props.onClick}>
      <Tooltip
        title="Add"
        aria-label="add"
        style={{ fontSize: 50, alignSelf: "center" }}>
        <Fab color="primary">
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}
