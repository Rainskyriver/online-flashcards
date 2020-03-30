import React from "react";
import { Button } from "@material-ui/core";
import FlashCard from "../FlashCard";
import "../../styles/Root.css";

export default function Root() {
  return (
    <div className="landing-page">
      <div>
        <div className="landing-top">
          <div className="landing-left">
            <h1
              style={{
                color: "#3F51B5",
                fontSize: "5em",
                paddingLeft: "45%"
              }}
            >
              Of Course!
            </h1>
            <h2 style={{ color: "#3F51B5", paddingLeft: "55%" }}>Online Flashcards!</h2>
          </div>
          <div className="landing-right">
            <p
              style={{
                color: "#3F51B5",
                paddingRight: "40%",
                fontSize: "1.5em"
              }}
            >
              A simple and easy way to study! We let you create a deck of flashcards to ace the test, help a friend, or prepare for that meeting. Search and study now, Of Course!
            </p>
          </div>
        </div>
        <div id="landing-card">
          <h4 style={{ color: "blue", textAlign: "center" }}>
            Click Below To Get Started!
          </h4>
          <div style={{ width: "450px", height: "350px", alignSelf: "center" }}>
            <FlashCard
              question="What's 2 + 2?"
              hint="Bill Wurtz"
              answer="One billion!"
              resources="https://www.youtube.com/watch?v=u8RANXbnxPk"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
