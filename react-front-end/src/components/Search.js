import React from 'react';
import { BrowserRouter as Router, Route, Switch, useParams } from "react-router-dom";

export default function Search() {
  let { tag } = useParams()
  return (
    <Router>
    <div>
      <Switch>
        <Route path="/search/:tag">
          <h2>{`Search results for: ${tag}`}</h2> 
        </Route>
      </Switch>
    </div>
    </Router>
  )
}
