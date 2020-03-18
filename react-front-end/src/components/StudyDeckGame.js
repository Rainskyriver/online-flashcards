import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

import "../styles/StudyDeckGame.css";

// For spacing out the buttons
const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

export default function StudyDeckGame(props) {
  const [mode, setMode] = useState("TEST");

  const classes = useStyles();

  // Help to set the state to call the right component
  const FLASHCARDS = "FLASHCARDS";
  const TEST = "TEST";
  const MEMORYMATCH = "MEMORYMATCH";


  // For the onClick in the Play Button to handle the route
  const handlePlay = (game) => {
    if (mode === FLASHCARDS) {
      // link to FLASHCARDS game route
      console.log('does it work? in FLASHCARDS')
    } else if (mode === TEST) {
      // link to TEST game route
      console.log('does it work? in TEST')
    } else if (mode === MEMORYMATCH) {
      // link to MEMORYMATCH game route
      console.log('does it work? in MEMORYMATCH')
    }
  }

  return (
    <div className="game-display">
      <div className={classes.root} style={{ marginLeft: "2.5vw" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setMode(FLASHCARDS)}
        >
          Flash Cards
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setMode(TEST)}
        >
          Test
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => setMode(MEMORYMATCH)}
        >
          Memory Match
        </Button>
      </div>

      <div className="game-info">
        {mode === FLASHCARDS && (
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
        )}

        {mode === TEST && (
          <div className="game-test">
            <h1>History</h1>
            <div>
              <p>Most Wrong:</p>
              <p>Average % Correct:</p>
              <p>Average Time Completion:</p>
              <p>Attempts:</p>
              <p>Best Attempt:</p>
            </div>
          </div>
        )}

        {mode === MEMORYMATCH && (
          <div className="game-memory-match">
            <div className="game-left-display">
              <h1>Memory Match</h1>
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
          </div>
        )}

      </div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<PlayCircleFilledIcon />}
        onClick={() => handlePlay(mode)}
      >
        Play
      </Button>
    </div>
  );
}
