import React, { Component } from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import renderHTML from "react-render-html";

import Styles from "./LoginForm.less";
import AuthService from "../../../services/Auth";

class LoginForm extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    this.Auth = new AuthService();
    this.state = {
      email: "",
      password: "",
      showError: false,
      errorMessage: ""
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { cookies } = this.props;

    this.Auth.login(this.state.email, this.state.password)
      .then(response => {
        if (response.data.success) {
          cookies.set("jwtToken", response.data.entity, { path: "/" });
          this.props.history.push("/home/dashboard");
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
        } else {
          this.setState({
            errorMessage:
              "Service isn't availabe. <strong>Please, contact customer support</strong>"
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
            <div className="alert alert-danger">
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
