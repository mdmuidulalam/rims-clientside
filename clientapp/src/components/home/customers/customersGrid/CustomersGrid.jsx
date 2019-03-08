import React, { Component } from "react";

import CustomersService from "../../../../services/Customers";
import GridTypes from "../../../../enums/GridTypes";
import CustomGrid from "../../../shared/CustomGrid.jsx";

class CustpmersGrid extends Component {
  constructor(props) {
    super(props);

    this.customersService = new CustomersService();
    this.Heading = '<i className="fas fa-snowman" /> Customers';
  }

  render() {
    return (
      <CustomGrid
        Heading={this.Heading}
        GridType={GridTypes.Customer}
        GetData={this.customersService.getCustomers}
      />
    );
  }
}

export default CustpmersGrid;
