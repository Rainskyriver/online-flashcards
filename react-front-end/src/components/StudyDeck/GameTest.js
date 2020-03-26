import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

export default function GameFlashCards() {
  const [input, setInput] = useState({
    hours: "0",
    minutes: "0",
    seconds: "0",
    milliseconds: "0",
    attempts: "0",
    front: "No Attempts Made Yet",
    mostWrong: "",
    numOfCards: "0",
    averageCorrect: "0",
    bestAttempt: "0",
    bestAttemptTimeHours: "0",
    bestAttemptTimeMinutes: "0",
    bestAttemptTimeSeconds: "0",
    bestAttemptTimeMilliseconds: "0"
  });

  const { id } = useParams();

  useEffect(() => {
    axios.get(`/api/study/${id}`).then(res => {
      setInput({
        hours: res.data.averageTime.hours || "0",
        minutes: res.data.averageTime.minutes || "0",
        seconds: res.data.averageTime.seconds || "0",
        milliseconds: res.data.averageTime.milliseconds,
        attempts: res.data.attempts,
        front: res.data.front,
        mostWrong: res.data.mostWrong,
        averageCorrect: res.data.averageCorrect,
        bestAttempt: res.data.bestAttempt,
        bestAttemptTimeHours: res.data.bestAttemptTime.hours || "0",
        bestAttemptTimeMinutes: res.data.bestAttemptTime.minutes || "0",
        bestAttemptTimeSeconds: res.data.bestAttemptTime.seconds || "0",
        bestAttemptTimeMilliseconds: res.data.bestAttemptTime.milliseconds,
        numOfCards: res.data.numOfCards
      });
    });
  }, []);

  return (
    <div className="game-flash-cards">
      <div className="game-left-display">
        <h1>Test</h1>
        <h3>
          A multiple choice style test for studying. You go through the whole
          deck, and a card with a question will prompt you to select an answer
          out of three choices.
        </h3>
      </div>
      <div className="game-right-display">
        <h1>History</h1>
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              Most Difficult Question:
            </Grid>
            <Grid item xs={12} sm={9}>
              "<strong>{input.front}</strong>" <br /> wrong{" "}
              <strong>{input.mostWrong}</strong> times
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              Average Test Score:
            </Grid>
            <Grid item xs={12} sm={9}>
              <strong>{input.averageCorrect}%</strong>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              Average Time Completion:
            </Grid>
            <Grid item xs={12} sm={9}>
              hh:mm:ss <br />
              <strong>
                {input.hours > 9 ? input.hours : "0" + input.hours}:
                {input.minutes > 9 ? input.minutes : "0" + input.minutes}:
                {input.seconds > 9 ? input.seconds : "0" + input.seconds}
              </strong>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              Attempts:
            </Grid>
            <Grid item xs={12} sm={9}>
              <strong>{input.attempts}</strong>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              Best Attempt:
            </Grid>
            <Grid item xs={12} sm={9}>
              <strong>
                {input.bestAttempt}/{input.numOfCards} <br />
                {input.bestAttemptTimeHours > 9
                  ? input.bestAttemptTimeHours
                  : "0" + input.bestAttemptTimeHours}
                :
                {input.bestAttemptTimeMinutes > 9
                  ? input.bestAttemptTimeMinutes
                  : "0" + input.bestAttemptTimeMinutes}
                :
                {input.bestAttemptTimeSeconds > 9
                  ? input.bestAttemptTimeSeconds
                  : "0" + input.bestAttemptTimeSeconds}
              </strong>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
}
