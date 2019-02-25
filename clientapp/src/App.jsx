import React, { Component } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

import Home from "./components/home/Home.jsx";
import LandingPage from "./components/landingPage/LandingPage.jsx";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
