import React, { Component } from "react";
import { Route } from "react-router-dom";

import EditProducts from "./editProducts/EditProducts.jsx";
import ProductsGrid from "./productsGrid/ProductsGrid.jsx";

class Products extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Route exact path={this.props.match.path} component={ProductsGrid} />
        <Route
          path={`${this.props.match.path}/edit`}
          component={EditProducts}
        />
      </div>
    );
  }
}

export default Products;
