import React, { Component } from 'react';
import LoginForm from "./loginFrom/LoginForm.jsx";
import { CookiesProvider } from 'react-cookie';

export class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <CookiesProvider>
        <div className="row justify-content-center">
            <div className="col-md-4 col-md-offset-4">
            <LoginForm />
            </div>
        </div>
      </CookiesProvider>
    );
  }
}
