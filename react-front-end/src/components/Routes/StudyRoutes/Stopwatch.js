import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";

const moment = require("moment");

export default function Stopwatch(props) {
  const [displayTime, setDisplayTime] = useState("");
  const [start, setStart] = useState(Date.now)
  const [whichTest, setWhichTest] = useState(false);

  const { answers, cards, game, title, stopTime } = props;

  const requestRef = useRef();
  const { id } = useParams();

  const stopTimer = () => {
    const startTime = moment(start).format("YYYY-MM-DD h:mm:ss");
    const endTime = moment().format("YYYY-MM-DD h:mm:ss");
    const data = JSON.stringify({ startTime, endTime, answers, cards, whichTest });
    axios
      .post(`/api/study/${id}/${game}`, {
        data
      })
      .then(res => {
        console.log(res);
      });
  };

  const returnKey = stop => {
    if (stop) {
      stopTimer();
      window.location = `/study/${id}`;
    }
  };

  useEffect(() => {
    if (game === "original") {
      setWhichTest(true)
    }
    returnKey(stopTime);
  }, [stopTime]);

  const animate = () => {
    let dur = moment.duration(moment().diff(start));
    let mins = dur
      .minutes()
      .toString()
      .padStart(2, "0");
    let secs = dur
      .seconds()
      .toString()
      .padStart(2, "0");
    let millis = Math.floor(dur.milliseconds() / 10)
      .toString()
      .padStart(2, "0");
    setDisplayTime(`${mins}:${secs}:${millis}`);

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ color: "#3f51b5" }}>{title}</h1>
      <h2>{displayTime}</h2>
      <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: "30px" }}
        size="large"
        onClick={() => stopTimer()}
        component={Link}
        to={`/study/${id}`}
      >
        Complete Test
      </Button>
    </div>
  );
}
