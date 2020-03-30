import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import axios from "axios";
import TestCard from "../StudyRoutes/TestGame/TestCard";
import "../../../styles/Game.css";
import Stopwatch from "./Stopwatch";
import ProgressBar from "./ProgressBar";
import green from "@material-ui/core/colors/green";

const { randomSelection, shuffle } = require("./TestGame/Helpers");

export default function Test() {
  const [cards, setCards] = useState([]);
  const [deckTitle, setDeckTitle] = useState();
  const [start, setStart] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [currentCard, setCurrentCard] = useState(1);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState({});
  const [stopTime, setStopTime] = useState(false);
  const [hotkeyFlip, setHotkeyFlip] = useState(false);
  // const [clicked, setClicked] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/study/${id}/test`).then(res => {
      setCards(shuffle(res.data.cards));
      setCurrentCard(0);
      setDeckTitle(res.data.deck.name);
    });
  }, []);

  useEffect(() => {
    setAnswers(shuffle(randomSelection(currentCard, cards)));
  }, [currentCard]);

  const TestCards = cards.map(result => {
    return (
      <TestCard
        answered={answered}
        key={result.id}
        question={result.front}
        image={result.image_url}
        hint={result.hint}
        answer={result.back}
        resources={result.resource}
        hotkeyFlip={hotkeyFlip}
      />
    );
  });

  const answerHandler = id => {
    if (id === cards[currentCard].id) {
      setCorrect({ ...correct, [cards[currentCard].id]: true });
    } else {
      setCorrect({ ...correct, [cards[currentCard].id]: false });
    }
  };

  const submitHandler = () => {
    setAnswered(true);
  };

  const RandomAnswers = answers.map(result => {
    if (
      answered &&
      correct[Object.keys(correct)[Object.keys(correct).length - 1]]
    ) {
      return (
        <Button
          variant="contained"
          writable="true"
          style={{ backgroundColor: "#c5e1a5" }}
          disabled={true}
          onClick={() => answerHandler(result.id)}
          key={result.id}
        >
          {result.back}
        </Button>
      );
    } else if (
      answered &&
      !correct[Object.keys(correct)[Object.keys(correct).length - 1]]
    ) {
      return (
        <Button
          variant="contained"
          style={{ backgroundColor: "#ef9a9a" }}
          disabled={true}
          onClick={() => answerHandler(result.id)}
          key={result.id}
        >
          {result.back}
        </Button>
      );
    } else {
      return (
        <Button
          // variant="outlined"
          onClick={() => answerHandler(result.id)}
          key={result.id}
        >
          {result.back}
        </Button>
      );
    }
  });

  const handleNextCard = () => {
    setAnswered(false);
    if (currentCard === TestCards.length - 1) {
      return;
    }
    setCurrentCard(currentCard + 1);
    setHotkeyFlip(false)
  };

  // Hotkeys to navigate through the test
  const hotKeys = e => {
    e = e || window.event;
    if (e.keyCode === 39) {
      // Right arrow key
      handleNextCard();
    } else if (e.keyCode === 83) {
      // S key
      submitHandler();
    } else if (e.keyCode === 49) {
      // 1 key
      answerHandler(Number(RandomAnswers[0].key))
      // RandomAnswers[0].props.variant = "contained"
      console.log('for key 1', RandomAnswers[0])
    } else if (e.keyCode === 50) {
      // 2 key
      answerHandler(Number(RandomAnswers[1].key))
    } else if (e.keyCode === 51) {
      // 3 key
      answerHandler(Number(RandomAnswers[2].key))
    } else if (e.keyCode === 13) {
      // Enter key
      setStopTime(true);
    } else if (e.keyCode === 32 && answered) {
      // Space bar key
      setHotkeyFlip(state => !state);
    }
  };

  document.onkeydown = hotKeys;

  const startHandler = () => {
    if (start === false) {
      return (
        <div className="start-container">
          <h1>Testing for </h1>
          <h1 style={{ marginTop: "0px", color: "#3f51b5" }}>"{deckTitle}"</h1>
          <h2 className="start-message">Are you ready to ace this test?!</h2>
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
      const startTime = Date.now();

      return (
        <>
          <Stopwatch
            startTimer={startTime}
            answers={correct}
            cards={cards}
            game="test"
            title={deckTitle}
            stopTime={stopTime}
          />
          <div className="game-box">{TestCards[currentCard]}</div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              {RandomAnswers}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                margin: "10px"
              }}
            >
              <Button
                disabled={answered ? true : false}
                variant={answered ? "contained" : null}
                onClick={submitHandler}
              >
                Submit
              </Button>
              <Button onClick={handleNextCard}>Next Question</Button>
            </div>
          </div>
          <ProgressBar current={currentCard + 1} length={TestCards.length} />
          <h2
            style={{
              textAlign: "center",
              textDecoration: "underline",
              marginTop: "50px",
              marginBottom: "0px"
            }}
          >
            Hotkeys:
          </h2>
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
                Select Answer:
                <br />
                Submit Answer:
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
                <strong>"1", "2", "3" Key</strong>
                <br />
                <strong>"S" Key</strong>
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
      <div>{startHandler()}</div>
    </div>
  );
}
