import React from "react";
import { Button } from "@material-ui/core";
import FlashCard from "../FlashCard";
import "../../styles/Root.css";

export default function Root() {
  return (
    <div className="landing-page">
      <div className="landing-left">
        <div>
          <h1 style={{ color: "white" }}>Of Course!</h1>
          <h2 style={{ color: "white" }}>A better way to study online!</h2>
        </div>
        <div>
          <p style={{ color: "white" }}>
            Mustache health goth quinoa hot chicken messenger bag, gluten-free
            woke normcore blue bottle pabst iPhone cray bicycle rights retro.
            Cred keffiyeh letterpress hammock flexitarian four loko, vegan 90's
            ethical chicharrones mlkshk taiyaki master cleanse. Wayfarers tilde
            microdosing, activated charcoal unicorn lo-fi schlitz ramps polaroid
            beard man bun health goth banh mi readymade. Echo park try-hard af,
            la croix pinterest coloring book cred williamsburg tbh whatever
            helvetica gluten-free 8-bit shabby chic. Church-key kinfolk truffaut
            drinking vinegar asymmetrical, wayfarers twee pour-over jean shorts
            single-origin coffee plaid.
          </p>
        </div>
        <div id="landing-card">
          <Button style={{color: "blue"}}>Click Here To Get Started!</Button>
          <FlashCard
            question="What's 2 + 2?"
            hint="Bill Wurtz"
            answer="One billion!"
            resources="https://www.youtube.com/watch?v=u8RANXbnxPk"
          />
        </div>
      </div>
      <div className="landing-right">
        <img
          className="landing-image"
          src="https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
          alt="Landing Page"
        ></img>
      </div>
    </div>
  );
}