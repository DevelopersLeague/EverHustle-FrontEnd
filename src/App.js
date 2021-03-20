import React from "react";
import Navbar from './Components/Navbar';
import Notes from './Pages/Notes';
import Articles from './Pages/Articles'
import Goals from "./Pages/Goals";
import LandingPage from "./Pages/LandingPage";
import Reminders from "./Pages/Reminders";
import Timers from "./Pages/Timers"

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/notes">
          <Notes />
        </Route>
        <Route path="/articles">
          <Articles />
        </Route>
        <Route path="/goals">
          <Goals />
        </Route>
        <Route path="/reminders">
          <Reminders />
        </Route>
        <Route path="/timers">
          <Timers />
        </Route>
        <Route path="*">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
