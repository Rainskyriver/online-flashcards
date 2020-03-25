import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import axios from "axios";

const moment = require("moment");

export default function Stopwatch(props) {
  const [displayTime, setDisplayTime] = useState("");

  const { startTimer, answers, cards, game } = props;

  const requestRef = useRef();
  const { id } = useParams();

  const stopTimer = () => {
    const startTime = moment(startTimer).format("YYYY-MM-DD h:mm:ss");
    const endTime = moment().format("YYYY-MM-DD h:mm:ss");
    const data = JSON.stringify({ startTime, endTime, answers, cards });
    axios
      .post(`/api/study/${id}/${game}`, {
        data
      })
      .then(res => {
        console.log(res);
      });
  };

  const animate = () => {
    let dur = moment.duration(moment().diff(startTimer));
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
      <h1>{displayTime}</h1>
      <Button
        variant="contained"
        color="primary"
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
