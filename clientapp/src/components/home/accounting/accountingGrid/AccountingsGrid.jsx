import React, { Component } from "react";

import AccountingService from "../../../../services/Accounting";
import GridTypes from "../../../../enums/GridTypes";
import CustomGrid from "../../../shared/CustomGrid.jsx";

class AccountingsGrid extends Component {
  constructor(props) {
    super(props);

    this.accountingService = new AccountingService();
    this.Heading = '<i className="fas fa-balance-scale" /> Accounting';
  }

  render() {
    return (
      <CustomGrid
        Heading={this.Heading}
        GridType={GridTypes.Accounting}
        GetData={this.accountingService.getAccountingData}
      />
    );
  }
}

export default AccountingsGrid;
