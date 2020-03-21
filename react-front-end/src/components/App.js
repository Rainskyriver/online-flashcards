import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import "../styles/App.css";
import Header from "./Header";
import Search from "./Routes/SearchRoute";
import Users from "./Routes/UsersRoute";
import EditDeck from "./Routes/EditDeckRoute";
import NewDeck from "./Routes/NewDeckRoute";
import Study from "./Routes/StudyRoute";
import Root from "./Routes/Root";
import Match from "./Routes/StudyRoutes/MatchRoute";
import Test from "./Routes/StudyRoutes/TestRoute";
import Original from "./Routes/StudyRoutes/OriginalRoute";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path={"/users/:id"}>
            <Users />
          </Route>
          <Route path={"/study/:id/original"}>
            <Original />
          </Route>
          <Route path={"/study/:id/test"}>
            <Test />
          </Route>
          <Route path={"/study/:id/match"}>
            <Match />
          </Route>
          <Route path={"/study/:id/"}>
            <Study />
          </Route>
          <Route path={"/decks/:id/edit"}>
            <EditDeck />
          </Route>
          <Route path={"/decks/new"}>
            <NewDeck />
          </Route>
          <Route path={"/search/:tag"}>
            <Search />
          </Route>
          <Route exact path="/">
            <Root />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
