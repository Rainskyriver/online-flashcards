import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Link, useParams } from "react-router-dom";

export default function Stopwatch(props) {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(null);

  const { id } = useParams();

  const getMilliseconds = () => {
    return ("0" + time * 100).slice(-2);
  };

  const getSeconds = () => {
    return ("0" + parseInt(time % 60)).slice(-2);
  };

  const getMinutes = () => {
    return ("0" + Math.floor(time / 60)).slice(-2);
  };

  const completeTest = () => {
    return `/study/${id}`
  };


  useEffect(() => {
    // let interval = null;
    setIsActive(props.start);

    if (isActive) {
      setCounter(
        setInterval(() => {
          setTime(time => time + 0.001);
        }, 100)
      );
    }
  }, [isActive, time, props.start]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        {getMinutes()}:{getSeconds()}:{getMilliseconds()}
      </h1>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={() => completeTest()}
        component={Link}
        to={completeTest()}
      >
        Complete Test
      </Button>
    </div>
  );
}
