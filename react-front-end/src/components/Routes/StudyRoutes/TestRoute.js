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
  const [answers, setAnswers] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);

  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/study/${id}/test`).then(res => {
      setCards(shuffle(res.data.cards));
    });
  }, []);

  useEffect(() => {

    setAnswers([cards[0], cards[1], cards[2]])

  }, [cards])

  console.log(answers)


  const TestCards = cards.map(result => {
    return (
      <TestCard
        key={result.id}
        question={result.front}
        image={result.image_url}
        hint={result.hint}
        answer={result.back}
        resources={result.resource}
      />
    );
  });
  
  // const RandomAnswers = answers.map(result => {
  //   return (
  //     <Button key={result.id}>{result.back}</Button>
  //   )
  // })

  const handleNextCard = () => {
    if (currentCard === TestCards.length - 1) {
      return;
    }
    setCurrentCard(currentCard + 1);
  };



  return (
    <div className="game-landing-page">
      <h2>{`Test for deck with id: ${id}`}</h2>
      <Button>Start Study for Test</Button>
      <div>
        {TestCards[currentCard]}
      </div>
      <div style={{ marginTop: "450px" }}>
        {/* {RandomAnswers} */}
        <Button onClick={handleNextCard}>Next Answer</Button>
      </div>
    </div>
  );
}
