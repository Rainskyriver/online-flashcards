import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@material-ui/core";
import axios from "axios";
import TestCard from "../StudyRoutes/TestGame/TestCard";

function shuffle(array) {
  const returnArray = array.slice(0);
  var currentIndex = returnArray.length,
    temporaryValue,
    randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = returnArray[currentIndex];
    returnArray[currentIndex] = returnArray[randomIndex];
    returnArray[randomIndex] = temporaryValue;
  }
  return returnArray;
}

const randomSelection = (id, arr) => {
  if ( arr.length < 1 ) {
    return [];
  }
  const returnArray = [];
  let firstIndex = Math.floor(Math.random() * arr.length)
  returnArray.push(arr[id])
  while(firstIndex === id) {
    firstIndex = Math.floor(Math.random() * arr.length)
  }
  returnArray.push(arr[firstIndex])
  let secondIndex = Math.floor(Math.random() * arr.length)
  while(secondIndex === firstIndex || secondIndex === id) {
    secondIndex = Math.floor(Math.random() * arr.length)
  }
  returnArray.push(arr[secondIndex])
  return returnArray
}

export default function Test() {
  const [cards, setCards] = useState([]);
  const [start, setStart] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [currentCard, setCurrentCard] = useState(-1);
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState({});

  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/study/${id}/test`).then(res => {
      setCards(shuffle(res.data.cards));
      setCurrentCard(0)
    });
  }, []);

  useEffect(() => {
    setAnswers(shuffle(randomSelection(currentCard, cards)))
  }, [currentCard])

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
      />
    );
  });

  const answerHandler = (id) => {
    if (id === cards[currentCard].id) {
      setCorrect({...correct, [cards[currentCard].id]: true})
    } else {
      setCorrect({...correct, [cards[currentCard].id]: false})
    }
  }
  const submitHandler = () => {
    setAnswered(true);
    console.log(correct[Object.keys(correct)[Object.keys(correct).length - 1]])
  }
  console.log(answers)
  const RandomAnswers = answers.map(result => {
    if (answered && correct[Object.keys(correct)[Object.keys(correct).length - 1]]) {
      return (
        <Button style={{color: 'green'}} disabled={true} onClick={() => answerHandler(result.id)} key={result.id}>{result.back}</Button>        
      )
    } else {
      return (
        <Button onClick={() => answerHandler(result.id)} key={result.id}>{result.back}</Button>
      )
    }
  })
  const handleNextCard = () => {
    if (currentCard === TestCards.length - 1) {
      return;
    }
    setCurrentCard(currentCard + 1);
  };

  const startHandler = () => {
    if (start) {
      return (
        <div>
          {TestCards[currentCard]}
          <div style={{ marginTop: "450px" }}>
            {RandomAnswers}
          </div>
          <Button onClick={submitHandler} >Submit</Button>
          <Button onClick={handleNextCard} >Next Answer</Button>
        </div>
      )
    } else {
      return (
        <div className="start-container">
        <Button onClick={() => setStart(true)}>
          Start Test
        </Button>
        <h1 className="start-message">Are you ready to ace this test?!</h1>
      </div>
      )
    }
  }

  return (
    <div className="game-landing-page">
      <h2>{`Test for deck with id: ${id}`}</h2>
      {startHandler()}
      <div>
      </div>

    </div>
  );
}
