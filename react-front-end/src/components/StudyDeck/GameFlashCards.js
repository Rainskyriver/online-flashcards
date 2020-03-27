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
        hours: res.data.originalAverageTime.hours || "0",
        minutes: res.data.originalAverageTime.minutes || "0",
        seconds: res.data.originalAverageTime.seconds || "0",
        milliseconds: res.data.originalAverageTime.milliseconds,
        attempts: res.data.originalAttempts,
        front: res.data.front,
        mostWrong: res.data.mostWrong,
        averageCorrect: res.data.originalAverageCorrect,
        bestAttempt: res.data.originalBestAttempt,
        bestAttemptTimeHours: res.data.originalBestAttemptTime.hours || "0",
        bestAttemptTimeMinutes: res.data.originalBestAttemptTime.minutes || "0",
        bestAttemptTimeSeconds: res.data.originalBestAttemptTime.seconds || "0",
        bestAttemptTimeMilliseconds: res.data.originalBestAttemptTime.milliseconds,
        numOfCards: res.data.numOfCards
      });
    });
  }, []);

  return (
    <div className="game-flash-cards">
      <div className="game-left-display">
        <h1>Flash Cards</h1>
        <h3>
          Study the whole deck going through each card one by one, until all the
          cards are done.
        </h3>
        <div>
          <h4 style={{ marginBottom: "0px", textDecoration: "underline" }}>
            Hotkeys:
          </h4>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={4}>
              Next Card:
            </Grid>
            <Grid item xs={12} sm={8}>
              <strong>"Right Arrow" Key</strong>
            </Grid>
            <Grid item xs={12} sm={4}>
              Previous Card:
            </Grid>
            <Grid item xs={12} sm={8}>
              <strong>"Left Arrow" Key</strong>
            </Grid>
            <Grid item xs={12} sm={4}>
              Mark Incorrect:
            </Grid>
            <Grid item xs={12} sm={8}>
              <strong>"X" Key</strong>
            </Grid>
            <Grid item xs={12} sm={4}>
              Mark Correct:
            </Grid>
            <Grid item xs={12} sm={8}>
              <strong>"C" Key</strong>
            </Grid>
            <Grid item xs={12} sm={4}>
              Flip Card:
            </Grid>
            <Grid item xs={12} sm={8}>
              <strong>"Space Bar" Key</strong>
            </Grid>
            <Grid item xs={12} sm={4}>
              Complete Test:
            </Grid>
            <Grid item xs={12} sm={8}>
              <strong>"Enter/Return" Key</strong>
            </Grid>
          </Grid>
        </div>
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
