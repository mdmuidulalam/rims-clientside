import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Dashboard } from './components/dashboard/Dashboard';
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
