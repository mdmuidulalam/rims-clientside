import React, { Component } from "react";

import PurchasesService from "../../../../services/Purchases";
import GridTypes from "../../../../enums/GridTypes";
import CustomGrid from "../../../shared/CustomGrid.jsx";

class CustpmersGrid extends Component {
  constructor(props) {
    super(props);

    this.purchasesService = new PurchasesService();
    this.Heading = '<i className="fas fa-file-invoice-dollar" /> Purchases';
  }

  render() {
    return (
      <CustomGrid
        Heading={this.Heading}
        GridType={GridTypes.Purchases}
        GetData={this.purchasesService.getPurchases}
      />
    );
  }
}

export default CustpmersGrid;
