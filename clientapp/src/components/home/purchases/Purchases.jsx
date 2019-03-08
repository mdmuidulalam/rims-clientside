import React, { Component } from "react";
import { Route } from "react-router-dom";

import EditPurchases from "./editPurchases/EditPurchases.jsx";
import PurchasesGrid from "./purchasesGrid/PurchasesGrid.jsx";

class Purchases extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Route exact path={this.props.match.path} component={PurchasesGrid} />
        <Route
          path={`${this.props.match.path}/edit`}
          component={EditPurchases}
        />
      </div>
    );
  }
}

export default Purchases;
