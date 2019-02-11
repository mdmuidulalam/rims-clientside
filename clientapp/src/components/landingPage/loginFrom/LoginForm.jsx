import React, { Component } from "react";
import { instanceOf } from "prop-types";
import axios from "axios";
import { withCookies, Cookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import renderHTML from "react-render-html";

import Styles from "./LoginForm.less";

class LoginForm extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    //declare state
    this.state = {
      username: "",
      password: "",
      showError: false,
      errorMessage: ""
    };
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
    axios
      .post("/api/auth/login", {
        Email: this.state.email,
        Password: this.state.password
      })
      .then(response => {
        if (response.data.success) {
          //valid credentials
          //save token in cookie
          cookies.set("jwtToken", response.data.entity, { path: "/" });
          //ridirect to home
          this.props.history.push("/home");
        } else {
          throw "invalid credentials";
        }
      })
      .catch(error => {
        this.setState({ showError: true });
        if (error === "invalid credentials") {
          this.setState({
            errorMessage:
              "You have entered an <strong>invalid email or password</strong>"
          });
        }
      });
  }

  render() {
    return (
      <div className={Styles.logIn}>
        <form onSubmit={event => this.handleSubmit(event)}>
          <h1>
            <b>Hey, good to see you again!!!</b>
          </h1>
          <div>
            <div className={Styles.group}>
              <input
                value={this.state.email}
                onChange={event => this.handleChange(event)}
                type="text"
                name="email"
                id="name"
                required
              />
              <span className={Styles.highlight} />
              <span className={Styles.bar} />
              <label>Email</label>
            </div>
            <div className={Styles.group}>
              <input
                value={this.state.password}
                onChange={event => this.handleChange(event)}
                type="password"
                name="password"
                id="password"
                required
              />
              <span className={Styles.highlight} />
              <span className={Styles.bar} />
              <label>Password</label>
            </div>
          </div>
          {this.state.showError ? (
            <div class="alert alert-danger">
              {renderHTML(this.state.errorMessage)}
            </div>
          ) : null}
          <button
            type="submit"
            className={Styles.btn + " " + Styles["btn-submit"]}
          >
            Continue <i className="fas fa-arrow-circle-right" />
          </button>
        </form>
      </div>
    );
  }
}

export default compose(
  withRouter,
  withCookies
)(LoginForm);
