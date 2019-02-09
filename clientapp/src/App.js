import React, { Component } from 'react';
import { BrowserRouter,  Switch, Route } from 'react-router-dom';

import { Home } from './components/home/Home';
import { LandingPage } from './components/landingPage/LandingPage';
import {LoginPage} from './components/login/LoginPage';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/dashboard' component={Dashboard}/>
        <Route path='/login' component={LoginPage}/>
      </Switch>
    );
  }
}

export default App;
