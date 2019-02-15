import React, { Component } from "react";

import Styles from "./LandingPage.less";
import LoginForm from "./loginFrom/LoginForm.jsx";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={Styles.removemargin + " row"}>
        <div
          className={
            Styles.poster +
            " " +
            Styles.removepadding +
            " hidden-xs col-lg-8 col-md-6"
          }
        >
          <div className={Styles.qoutes}>
            <p className={Styles.writting}>
              The road to success and the road to failure are almost exactly the
              same.
            </p>
            <p className={Styles.autor}>-Colin Davis</p>
          </div>
          <div className={Styles.sayings}>
            Optimus, A better way to bussiness
          </div>
        </div>
        <div className={Styles.removepadding + " col-lg-4 col-md-6 col-sm-12"}>
          <LoginForm />
        </div>
      </div>
    );
  }
}
