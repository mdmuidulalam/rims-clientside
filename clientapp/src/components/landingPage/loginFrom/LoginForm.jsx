import React, { Component } from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import renderHTML from "react-render-html";
import { connect } from "react-redux";

import Styles from "./LoginForm.less";
import AuthService from "../../../services/Auth";

import {
  LOG_IN_UPDATE_FIELD,
  LOG_IN_PAGE_UNLOADED
} from "../../../actionTypes";

const mapStateToProps = state => ({ ...state.login });

const mapDispatchToProps = dispatch => ({
  onChange: payload =>
    dispatch({ type: LOG_IN_UPDATE_FIELD, key: key, payload: payload }),
  onChangeShowValidationError: payload =>
    dispatch({
      type: LOG_IN_UPDATE_FIELD,
      key: "showValidationError",
      payload
    }),
  onChangeValidationErrorMessage: payload =>
    dispatch({
      type: LOG_IN_UPDATE_FIELD,
      key: "validationErrorMessage",
      payload
    }),
  onUnload: () => dispatch({ type: LOG_IN_PAGE_UNLOADED })
});

class LoginForm extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    this.authService = new AuthService();
  }

  /* Override Functions */

  componentWillUnmount() {
    this.props.onUnload();
  }

  /* End Override Functions */

  handleSubmit(e) {
    e.preventDefault();
    const { cookies } = this.props;

    this.authService
      .login(this.props.email, this.props.password)
      .then(response => {
        if (response.data.success) {
          cookies.set("jwtToken", response.data.entity, { path: "/" });
          this.props.history.push("/home/dashboard");
        } else {
          throw "invalid credentials";
        }
      })
      .catch(error => {
        this.props.onChangeShowValidationError(true);
        if (error === "invalid credentials") {
          this.props.onChangeValidationErrorMessage(
            "You have entered an <strong>invalid email or password</strong>"
          );
        } else {
          this.props.onChangeValidationErrorMessage(
            "Service isn't availabe. <strong>Please, contact customer support</strong>"
          );
        }
      });
  }

  render() {
    return (
      <div className={Styles.logIn}>
        <form
          className={Styles.loginform}
          onSubmit={event => this.handleSubmit(event)}
        >
          <h1 className={Styles.loginformh1}>
            <b>Hey, good to see you again!!!</b>
          </h1>
          <div>
            <div className={Styles.group}>
              <input
                className={Styles.logininput}
                value={this.props.email}
                onChange={event =>
                  this.props.onChange(event.target.name, event.target.value)
                }
                type="text"
                name="email"
                id="name"
                required
              />
              <span className={Styles.highlight} />
              <span className={Styles.bar} />
              <label className={Styles.loginlabel}>Email</label>
            </div>
            <div className={Styles.group}>
              <input
                className={Styles.logininput}
                value={this.props.password}
                onChange={event =>
                  this.props.onChange(event.target.name, event.target.value)
                }
                type="password"
                name="password"
                id="password"
                required
              />
              <span className={Styles.highlight} />
              <span className={Styles.bar} />
              <label className={Styles.loginlabel}>Password</label>
            </div>
          </div>
          {this.props.showValidationError ? (
            <div className="alert alert-danger">
              {renderHTML(this.props.validationErrorMessage)}
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
  withCookies,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LoginForm);
