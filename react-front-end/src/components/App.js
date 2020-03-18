import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import "../styles/App.css";
import Header from "./Header";
import Search from "./Routes/SearchRoute";
import Users from './Routes/UsersRoute'
import EditDeck from './Routes/EditDeckRoute';
import NewDeck from './Routes/NewDeckRoute'
import Study from './Routes/StudyRoute';
import Root from "./Routes/Root"

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
          <Route path={'/decks/new'}>
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
