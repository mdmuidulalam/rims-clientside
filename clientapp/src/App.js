import React, { Component } from 'react';
import { BrowserRouter,  Switch, Route } from 'react-router-dom';

import { Home } from './components/home/Home';
import { LandingPage } from './components/landingPage/LandingPage';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/home' component={Home}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
