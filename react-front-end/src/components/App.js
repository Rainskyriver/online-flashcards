import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "../styles/App.css";
import FlashCard from "./FlashCard";
import Header from "./Header";
import Search from "./Search";
import TestComponent from './TestComponent';
import CardForm from "./CardForm";
import DeckForm from "./DeckForm";
import Empty from "./Empty";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path={'/search/:tag'}>
            <Search />
          </Route>
          <Route exact path="/">
            {/* <CardForm/> */}
            {/* <DeckForm /> */}
            <Empty />
          </Route>
        </Switch>
        {/* <CardForm /> */}
      </div>
    </Router>
  );
}
