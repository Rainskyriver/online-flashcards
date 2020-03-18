import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';

import "../styles/StudyDeckGame.css";

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

export default function StudyDeckGame(props) {
  const classes = useStyles();

  return (
    <div className="game-display">
      <div className={classes.root} style={{ marginLeft: "2.5vw" }}>
        <Button variant="outlined" color="primary">
          Flash Cards
        </Button>
        <Button variant="outlined" color="primary">
          Test
        </Button>
        <Button variant="outlined" color="primary">
          Memory Match
        </Button>
      </div>

      <div className="game-info">
        <div className="game-flash-cards">
          <div className="game-left-display">
            <h1>TITLE</h1>
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
              <p>Average % Corret:</p>
              <p>Average Time Completion:</p>
              <p>Attempts:</p>
              <p>Best Attempt:</p>
            </div>
          </div>
        </div>
      </div>
      <Button
      variant="contained"
      color="primary"
      size="large"
      startIcon={<PlayCircleFilledIcon />}
      >
        Play
      </Button>

    </div>
  );
}
