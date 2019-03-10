import React, { Component } from "react";
import { Route } from "react-router-dom";

import EditVendors from "./editVendors/EditVendors.jsx";
import VendorsGrid from "./vendorsGrid/VendorsGrid.jsx";

class Purchases extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Route exact path={this.props.match.path} component={VendorsGrid} />
        <Route path={`${this.props.match.path}/edit`} component={EditVendors} />
      </div>
    );
  }
}

export default Purchases;
