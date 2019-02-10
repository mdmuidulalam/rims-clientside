import React, { Component } from 'react';
import { BrowserRouter,  Switch, Route } from 'react-router-dom';

import { Home } from './components/home/Home.jsx';
import { LandingPage } from './components/landingPage/LandingPage.jsx';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
      </Switch>
    );
  }
}

export default App;
