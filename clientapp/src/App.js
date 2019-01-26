import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import { Dashboard } from './components/dashboard/Dashboard';
import { LandingPage } from './components/landingPage/LandingPage';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/dashboard' component={Dashboard}/>
      </Switch>
    );
  }
}

export default App;
