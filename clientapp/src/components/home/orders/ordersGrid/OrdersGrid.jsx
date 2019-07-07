import React, { Component } from "react";

import OrdersService from "../../../../services/Orders";
import GridTypes from "../../../../enums/GridTypes";
import CustomGrid from "../../../shared/CustomGrid.jsx";

class OrdersGrid extends Component {
  constructor(props) {
    super(props);

    this.ordersService = new OrdersService();
    this.Heading = '<i className="fas fa-shopping-cart" /> Orders';
  }

  render() {
    return (
      <CustomGrid
        Heading={this.Heading}
        GridType={GridTypes.Order}
        GetData={this.ordersService.getOrders}
      />
    );
  }
}

export default OrdersGrid;
