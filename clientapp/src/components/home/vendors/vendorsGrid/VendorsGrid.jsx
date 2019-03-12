import React, { Component } from "react";

import VendorsService from "../../../../services/Vendors";
import GridTypes from "../../../../enums/GridTypes";
import CustomGrid from "../../../shared/CustomGrid.jsx";

class CustpmersGrid extends Component {
  constructor(props) {
    super(props);

    this.vendorsService = new VendorsService();
    this.Heading = '<i className="fas fa-user-tie" /> Vendors';
  }

  render() {
    return (
      <CustomGrid
        Heading={this.Heading}
        GridType={GridTypes.Vendors}
        GetData={this.vendorsService.getVendors}
      />
    );
  }
}

export default CustpmersGrid;
