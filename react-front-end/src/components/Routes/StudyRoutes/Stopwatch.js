import React, { useState, useEffect } from "react";

export default function Stopwatch(props) {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(null)


  const getMilliseconds = () => {
    return ("0" + time * 100).slice(-2);
  };

  const getSeconds = () => {
    return ("0" + parseInt(time % 60)).slice(-2);
  };

  const getMinutes = () => {
    return ("0" + Math.floor(time / 60)).slice(-2);
  };

  const stopTimer = () => {
    // setIsActive(false)
    // clearInterval(counter);
  };

  // console.log('is this run', stopTimer())

  useEffect(() => {
    // let interval = null;
    setIsActive(props.start)

    if (isActive) {
      setCounter(setInterval(() => {
        setTime(time => time + 0.001);
      }, 100));
    }

  }, [isActive, time, props.start]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>
        {getMinutes()}:{getSeconds()}:{getMilliseconds()}
      </h1>
      <button type="button" className="btn btn-danger" onClick={stopTimer()}>
        Complete Test
      </button>
    </div>
  );
}
