import React, { Component } from "react";
import { Route } from "react-router-dom";

import EditOrders from "./editOrders/EditOrders.jsx";
import OrdersGrid from "./ordersGrid/OrdersGrid.jsx";

class Orders extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Route exact path={this.props.match.path} component={OrdersGrid} />
        <Route path={`${this.props.match.path}/edit`} component={EditOrders} />
      </div>
    );
  }
}

export default Orders;
