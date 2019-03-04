import React, { Component } from "react";
import { Route } from "react-router-dom";

import EditCustomers from "./editCustomers/EditCustomers.jsx";
import CustomersGrid from "./customersGrid/CustomersGrid.jsx";

class Customers extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Route exact path={this.props.match.path} component={CustomersGrid} />
        <Route
          path={`${this.props.match.path}/edit`}
          component={EditCustomers}
        />
      </div>
    );
  }
}

export default Customers;
