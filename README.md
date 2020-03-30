# Of Course! Online Flashcards

An online study assistant, with the use of flashcards.  Of Course is meant to be an easy to use tool to build out your knowledge and test yourself.  You can search for different kinds of decks and create them with any amount of cards.  

Finals Project for Lighthouse Labs Bootcamp.

## Take a Look
!["Gif demo for OFC"](https://github.com/Rainskyriver/online-flashcards/blob/master/gif/OFC.gif)

## Getting Started

The main important bit is that the React project has `proxy` set to `localhost:9001` in the `package.json` file, and that the Express app listens to port 9001 in `server.js`.  

Have two terminals open.  In one terminal, `cd` into `react-front-end`. Run `npm install` or `yarn` to install the dependencies. Then run `npm start` or `yarn start`, and go to `localhost:9000` in your browser.

In the other terminal, `cd` into `express-back-end`. Run `npm install` or `yarn` to install the dependencies, then `npm start` or `yarn start` to launch the server.