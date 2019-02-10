import React, { Component } from 'react';
import { instanceOf } from 'prop-types';
import axios from'axios';
import { withCookies, Cookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';


class LoginForm extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    
    //declare state
    this.state = {
      username: "",
      password: ""
    };

    //bind 'this' to all methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //handle changes on all form inputs
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  //handle form submit
  handleSubmit(e) {
    e.preventDefault();
    const { cookies } = this.props;

    //login request to server
    axios.post('/api/auth/login', {
        Email: this.state.username,
        Password: this.state.password
      })
      .then(response => {
        if (response.data.success) {
          //valid credentials
          //save token in cookie
          cookies.set('jwtToken', response.data.entity, { path: '/' });
          //ridirect to home
          this.props.history.push('/dashboard');
        }
        else {
          //invalid credentials
          alert(response.data.errorDescriptions);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-container">
        <h1>Login</h1>
        <div className="form-group">
          <label className="control-label">Username</label>
          <input
            value={this.state.username}
            onChange={this.handleChange}
            type="text"
            name="username"
            className="form-control"
          />
          <label className="control-label">Password</label>
          <input
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
            name="password"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary btn-lg">Login</button>
      </form>
    );
  }
}

export default compose(withRouter, withCookies) (LoginForm);
