import React from "react";
import { ReactDOM } from "react-dom";
const Stopwatch = React.createClass({
  getInitialState: function() {
     return { secondsElapsed: 0 }
  },
  getMilliseconds: function() {
    return ('0' +this.state.secondsElapsed * 100).slice(-2);
  },
  getSeconds: function() {
     return ('0' + parseInt(this.state.secondsElapsed % 60)).slice(-2);
  },
  getMinutes: function() {
    return ('0' + Math.floor(this.state.secondsElapsed / 60)).slice(-2);
  },
  startTimer: function() {
    var runningTime = this;
    this.incrementer = setInterval(function() {
      runningTime.setState({
        secondsElapsed: (runningTime.state.secondsElapsed + 0.01)
      });
    }, 10)
  },
  resetTimer: function() {
     this.setState({
       secondsElapsed: 0
     })
  },
  stopTimer: function() {
    clearInterval(this.incrementer);
  },
  render: function() {
    return (
      <div className="display">
        <h1>{this.getMinutes()}:{this.getSeconds()}:{this.getMilliseconds()}</h1>
        <button type="button"
                className="btn btn-danger"
                onClick={this.stopTimer}>Stop</button>
        <button type="button"
                className="btn btn-success"
                onClick={this.startTimer}>Start</button>
        <button type="button"
                className="btn btn-warning"
                onClick={this.resetTimer}>Reset</button>
      </div>
    );
  }
});

export default <Stopwatch />
ReactDOM.render(<Stopwatch />, document.getElementById("container"));
