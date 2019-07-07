import React, { Component } from "react";
import { Route } from "react-router-dom";

import EditAccounting from "./editAccounting/EditAccounting.jsx";
import AccountingsGrid from "./accountingGrid/AccountingsGrid.jsx";

class Accountings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Route exact path={this.props.match.path} component={AccountingsGrid} />
        <Route
          path={`${this.props.match.path}/edit`}
          component={EditAccounting}
        />
      </div>
    );
  }
}

export default Accountings;
