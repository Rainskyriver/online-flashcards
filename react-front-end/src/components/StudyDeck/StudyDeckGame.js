import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { Link, useParams } from "react-router-dom";

import GameFlashCards from "./GameFlashCards";
import GameTest from "./GameTest";
import GameMemoryMatch from "./GameMemoryMatch";

import "../../styles/StudyDeckGame.css";

// For spacing out the buttons
const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      marginBottom: theme.spacing(2)
    }
  }
}));

export default function StudyDeckGame(props) {
  const [mode, setMode] = useState("FLASHCARDS");

  const classes = useStyles();
  const { id } = useParams();

  // Help to set the state to call the right component
  const FLASHCARDS = "FLASHCARDS";
  const TEST = "TEST";
  const MEMORYMATCH = "MEMORYMATCH";

  // For the onClick in the Play Button to handle the route
  const handlePlay = game => {
    if (game === FLASHCARDS) {
      return `/study/${id}/original/`;
    } else if (game === "TEST") {
      return `/study/${id}/test/`;
    } else if (game === MEMORYMATCH) {
      return `/study/${id}/match/`;
    }
  };

  return (
    <>
      <div className="game-display">
        <h3>Choose a study mode to begin!</h3>
        <div className={classes.root}>
          <Button
            variant={mode === FLASHCARDS ? "contained" : "outlined"}
            color="primary"
            onClick={() => setMode(FLASHCARDS)}
          >
            Flash Cards
          </Button>
          <Button
            variant={mode === TEST ? "contained" : "outlined"}
            color="primary"
            onClick={() => setMode(TEST)}
          >
            Test
          </Button>
          <Button
            variant={mode === MEMORYMATCH ? "contained" : "outlined"}
            color="primary"
            onClick={() => setMode(MEMORYMATCH)}
          >
            Memory Match
          </Button>
        </div>

        <div className="game-info">
          {mode === FLASHCARDS && <GameFlashCards />}

          {mode === TEST && <GameTest />}

          {mode === MEMORYMATCH && <GameMemoryMatch />}
        </div>
      </div>
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<PlayCircleFilledIcon />}
        onClick={() => handlePlay(mode)}
        style={{ width: "100%", bottom: "0", position: "absolute" }}
        component={Link}
        to={handlePlay(mode)}
      >
        Play
      </Button>
    </>
  );
}
