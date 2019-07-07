import React, { Component } from "react";

import ProductsService from "../../../../services/Products";
import GridTypes from "../../../../enums/GridTypes";
import CustomGrid from "../../../shared/CustomGrid.jsx";

class ProductsGrid extends Component {
  constructor(props) {
    super(props);

    this.productsService = new ProductsService();
    this.Heading = '<i className="fas fa-database" /> Products';
  }

  render() {
    return (
      <CustomGrid
        Heading={this.Heading}
        GridType={GridTypes.Product}
        GetData={this.productsService.getProducts}
      />
    );
  }
}

export default ProductsGrid;
