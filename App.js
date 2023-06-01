import React from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import SignUpPage from "./components/auth/SignUpPage/SignUpPage";
import SignInPage from "./components/auth/SignInPage/SignInPage";
import HomePage from "./components/home/HomePage";

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/signup-page" />
        </Route>

        <Route path="/signup-page" exact>
          <SignUpPage />
        </Route>

        <Route path="/signin-page" exact>
          <SignInPage />
        </Route>

        <Route path="/homePage">
          <HomePage />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default App;
