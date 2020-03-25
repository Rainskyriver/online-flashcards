import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "15px",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function ProgressBar(props) {
  const classes = useStyles();
  const [completed, setCompleted] = useState(0);
  const { current, length } = props;

  useEffect(() => {
    function progress() {
      setCompleted(() => {
        const diff = (current / length) * 100;
        return Math.min(diff, 100);
      });
    }

    progress();
  }, [current]);

  return (
    <div className={classes.root}>
      <LinearProgress
        style={{ height: "inherit" }}
        variant="determinate"
        value={completed}
      />
      <h2 style={{ textAlign: "center" }}>
        {current}/{length}
      </h2>
    </div>
  );
}
