import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, IconButton } from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useTransition, animated } from "react-spring";
import axios from "axios";
import FlashCard from "../../FlashCard";
// import ReactDOM from "react-dom";

import ProgressBar from "./ProgressBar";
import Stopwatch from "./Stopwatch";

import "../../../styles/Game.css";

export default function Original() {
  const [cards, setCards] = useState([]);
  const [deckTitle, setDeckTitle] = useState();
  const [start, setStart] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [correctness, setCorrectness] = useState({});
  const [clicked, setClicked] = useState({});
  const [stopTime, setStopTime] = useState(false);
  const [hotkeyFlip, setHotkeyFlip] = useState(false);

  const { id } = useParams();

  // Gets data for the deck and cards based on deckid
  useEffect(() => {
    axios.get(`/api/study/${id}/original`).then(res => {
      setCards(res.data.cards);
      setDeckTitle(res.data.deck.name);
    });
  }, []);

  // Find cookie user id
  const getCurrentUser = cookieName => {
    var value = "; " + document.cookie;
    var parts = value.split("; " + cookieName + "=");
    if (parts.length === 2)
      return parts
        .pop()
        .split(";")
        .shift();
  };

  const userId = getCurrentUser("LoggedIn");

  // Renders all the cards for the selected deck
  const flashCards = cards.map(result => {
    return ({ style }) => (
      <animated.div style={{ ...style }}>
        <FlashCard
          key={result.id}
          question={result.front}
          image={result.image_url}
          hint={result.hint}
          answer={result.back}
          resources={result.resource}
          hotkeyFlip={hotkeyFlip}
        />
      </animated.div>
    );
  });

  // Toggle next card or previous card
  const nextCard = () => {
    if (currentCard === flashCards.length - 1) {
      return;
    }
    setCurrentCard(currentCard + 1);
    setHotkeyFlip(false);
  };

  const previousCard = () => {
    if (currentCard === 0) {
      return;
    }
    setCurrentCard(currentCard - 1);
    setHotkeyFlip(false);
  };

  // Hotkeys to navigate through the test
  const hotKeys = e => {
    e = e || window.event;
    if (e.keyCode === 37) {
      // Left arrow key
      previousCard();
    } else if (e.keyCode === 39) {
      // Right arrow key
      nextCard();
    } else if (e.keyCode === 88) {
      // X key
      handleIncorrect();
    } else if (e.keyCode === 67) {
      // C key
      handleCorrect();
    } else if (e.keyCode === 13) {
      // Enter key
      setStopTime(true);
      console.log("hello hoang", stopTime);
    } else if (e.keyCode === 32) {
      // Space bar key
      setHotkeyFlip(currentState => !currentState);
    }
  };

  document.onkeydown = hotKeys;

  // For animation card slide
  const rightTransition = useTransition(currentCard, p => p, {
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-80%,0,0)" }
  });

  // const leftTransition = useTransition(currentCard, p => p, {
  //   from: { opacity: 0, transform: "translate3d(-80%,0,0)" },
  //   enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
  //   leave: { opacity: 0, transform: "translate3d(100%,0,0)" }
  // });

  // Setting the card answer value
  const handleCorrect = () => {
    setCorrectness({ ...correctness, [cards[currentCard].id]: true });
    setClicked({ ...clicked, [cards[currentCard].id]: 2 });
  };

  const handleIncorrect = () => {
    setCorrectness({ ...correctness, [cards[currentCard].id]: false });
    setClicked({ ...clicked, [cards[currentCard].id]: 1 });
  };

  const startGame = () => {
    if (start === false) {
      return (
        <div className="start-container">
          <h1>Flashcards for </h1>
          <h1 style={{ marginTop: "0px", color: "#3f51b5" }}>"{deckTitle}"</h1>
          <h2 className="start-message">
            Are you ready to flip through all these cards?!
          </h2>
          <Button
            variant="contained"
            color="primary"
            style={{ height: "100px", width: "50%", alignSelf: "center" }}
            onClick={() => setStart(true)}
          >
            Start Test
          </Button>
        </div>
      );
    } else if (start === true) {
      return (
        <>
          <Stopwatch
            answers={correctness}
            cards={cards}
            game="original"
            title={deckTitle}
            stopTime={stopTime}
          />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <div className="previous-button">
              <IconButton onClick={previousCard}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className="game-box">
              {rightTransition.map(({ item, props, key }) => {
                const Page = flashCards[item];
                return <Page key={key} style={props} />;
              })}
            </div>
            <div className="next-button">
              <IconButton onClick={nextCard}>
                <ArrowForwardIcon />
              </IconButton>
            </div>
          </div>
          <div className="answer-buttons">
            <Button
              variant={
                clicked[cards[currentCard].id] === 1 ? "contained" : "outlined"
              }
              style={{ color: red[500] }}
              onClick={() => handleIncorrect()}
            >
              Incorrect
            </Button>
            <Button
              variant={
                clicked[cards[currentCard].id] === 2 ? "contained" : "outlined"
              }
              style={{ color: green[500] }}
              onClick={() => handleCorrect()}
            >
              Correct
            </Button>
          </div>
          <ProgressBar current={currentCard + 1} length={flashCards.length} />
          <h2 style={{ textAlign: "center", textDecoration: "underline", marginTop: "50px", marginBottom: "0px" }}>Hotkeys:</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignSelf: "center"
            }}
          >
            <div style={{ marginLeft: "40px", marginRight: "10px" }}>
              <p>
                Next Card:
                <br />
                Previous Card:
                <br />
                Mark Incorrect:
                <br />
                Mark Correct:
                <br />
                Flip Card:
                <br />
                Complete Test:
                <br />
              </p>
            </div>
            <div>
              <p>
                <strong>"Right Arrow" Key</strong>
                <br />
                <strong>"Left Arrow" Key</strong>
                <br />
                <strong>"X" Key</strong>
                <br />
                <strong>"C" Key</strong>
                <br />
                <strong>"Space Bar" Key</strong>
                <br />
                <strong>"Enter/Return" Key</strong>
              </p>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <div className="game-landing-page">
      <div>{startGame()}</div>
    </div>
  );
}
