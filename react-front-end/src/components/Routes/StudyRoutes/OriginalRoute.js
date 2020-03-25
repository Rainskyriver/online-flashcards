import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, IconButton } from "@material-ui/core";
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import blue from "@material-ui/core/colors/blue";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import { useTransition, animated } from "react-spring";
import axios from "axios";
import FlashCard from "../../FlashCard";

import ProgressBar from "./ProgressBar";
import Stopwatch from "./Stopwatch";

import "../../../styles/Game.css";

export default function Original() {
  const [cards, setCards] = useState([]);
  const [start, setStart] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [correctness, setCorrectness] = useState({});

  const { id } = useParams();

  // Gets data for the deck and cards based on deckid
  useEffect(() => {
    axios.get(`/api/study/${id}/original`).then(res => {
      setCards(res.data.cards);
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
  };

  const previousCard = () => {
    if (currentCard === 0) {
      return;
    }
    setCurrentCard(currentCard - 1);
  };

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
  };

  const handleIncorrect = () => {
    setCorrectness({ ...correctness, [cards[currentCard].id]: false });
  };

  const startGame = () => {
    if (start === false) {
      return (
        <div className="start-container">
          <Button style={{ color: blue[500] }} onClick={() => setStart(true)}>
            Start Test
          </Button>
          <h1 className="start-message">Are you ready to ace this test?!</h1>
        </div>
      );
    } else if (start === true) {
      const startTime = Date.now();

      return (
        <>
          <Stopwatch
            startTimer={startTime}
            answers={correctness}
            cards={cards}
            game="original"
          />

          <div style={{ display: "flex", alignItems: "center" }}>
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
              style={{ color: red[500] }}
              onClick={() => handleIncorrect()}
            >
              Incorrect
            </Button>
            <Button
              style={{ color: green[500] }}
              onClick={() => handleCorrect()}
            >
              Correct
            </Button>
          </div>
          <ProgressBar current={currentCard + 1} length={flashCards.length} />
        </>
      );
    }
  };

  return (
    <div className="game-landing-page">
      <h2>{`ORIGINAL for deck with id: ${id}, for user id ${userId}`}</h2>
      <h1>HELLO</h1>
      <div>{startGame()}</div>
    </div>
  );
}
