import React from "react";
import Navbar from "./Components/Navbar";
import Notes from "./Pages/Notes2";
import Articles from "./Pages/Articles";
import Goals from "./Pages/Goals";
import LandingPage from "./Pages/LandingPage";
import Reminders from "./Pages/Reminders";
import Timers from "./Pages/Timers";
import Auth from "./Pages/Auth";
import Signup from "./Components/Signup";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Test } from "./Pages/Test";
import AuthGuard from "./Components/AuthGuard";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/notes">
          <AuthGuard to="/login">
            <Notes />
          </AuthGuard>
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
        <Route path="/login">
          <Auth />
        </Route>
        <Route path="/sign-up">
          <Signup />
        </Route>
        {/* <Route path="/test">
          <Test />
        </Route> */}
        <Route path="*">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
