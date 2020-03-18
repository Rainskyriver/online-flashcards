import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import "../styles/App.css";
import FlashCard from "./FlashCard";
import Header from "./Header";
import Search from "./SearchRoute";
import CardForm from './CardForm'
import Users from './UsersRoute'
import EditDeck from './EditDeckRoute';
import NewDeck from './NewDeckRoute'
import Study from './StudyRoute';
import DeckForm from "./DeckForm";
import Root from "./Root"

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path={'/users/:id'}>
            <Users/>
          </Route>
          <Route path={'/study/:id/'}>
            <Study/>
          </Route>
          <Route path={'/study/:id/original'}>

          </Route>
          <Route path={'/study/:id/test'}>

          </Route>
          <Route path={'/study/:id/match'}>

          </Route>
          <Route path={'/decks/:id/edit'}>
            <EditDeck/>
          </Route>
          <Route path={'/decks/:id/new'}>
            <NewDeck/>
          </Route>
          <Route path={'/search/:tag'}>
            <Search />
          </Route>
          <Route exact path="/">
            <Root/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
