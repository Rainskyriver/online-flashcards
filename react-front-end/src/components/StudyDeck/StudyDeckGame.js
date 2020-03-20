import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";
import { Link } from "react-router-dom";

import GameFlashCards from "./GameFlashCards";
import GameTest from "./GameTest";
import GameMemoryMatch from "./GameMemoryMatch";

import "../../styles/StudyDeckGame.css";

// For spacing out the buttons
const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

export default function StudyDeckGame(props) {
  const [mode, setMode] = useState("FLASHCARDS");

  const classes = useStyles();

  // Help to set the state to call the right component
  const FLASHCARDS = "FLASHCARDS";
  const TEST = "TEST";
  const MEMORYMATCH = "MEMORYMATCH";

  // For the onClick in the Play Button to handle the route

  const handlePlay = game => {
    if (game === FLASHCARDS) {
      // link to FLASHCARDS game route
      console.log("does it work? in FLASHCARDS");
      return "/study/:id/original";;

    } else if (game === "TEST") {
      // link to TEST game route
      console.log("does it work? in TEST");
      return "/study/:id/test";

    } else if (game === MEMORYMATCH) {
      // link to MEMORYMATCH game route
      console.log("does it work? in MEMORYMATCH");
      return "/study/:id/match";

    }
  };


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
        {mode === FLASHCARDS && <GameFlashCards />}

        {mode === TEST && <GameTest />}

        {mode === MEMORYMATCH && <GameMemoryMatch />}
      </div>
      {/* <Link to="/study/3/test"> */}
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={<PlayCircleFilledIcon />}
          onClick={() => handlePlay(mode)}
          style={{ width: "fit-content", marginTop: "30px" }}
          component={Link}
          to={handlePlay(mode)}
        >
          Play
        </Button>
      {/* </Link> */}
    </div>
  );
}
