import React, { Component } from 'react';

import Styles  from './LandingPage.less';
import LoginForm  from './loginFrom/LoginForm.jsx';

export class LandingPage extends Component {
  render() {
    return (
      <div className={ Styles.removemargin + " row"}>
        <div className={ Styles.poster + " " + Styles.removepadding + " hidden-xs col-lg-8 col-md-6"}></div>
        <div className={ Styles.removepadding + " col-lg-4 col-md-6 col-sm-12"}>
          <LoginForm />
        </div>
      </div>
    );
  }
}
