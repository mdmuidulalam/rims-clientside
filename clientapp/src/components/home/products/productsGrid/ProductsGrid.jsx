import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

import GridStyles from "../../../../utilities/css/Grid.css";
import BoxStyles from "../../../../utilities/css/Box.less";
import ProductService from "../../../../services/Product";

class ProductsGrid extends Component {
  constructor(props) {
    super(props);

    this.productService = new ProductService();
    this.state = {
      products: []
    };
  }

  /// OverRide Functions

  componentDidMount = () => {
    this.getProducts();
  };

  /// End OverRide Functions

  /// Class Variables

  /// Product Grid Columns
  columns = [
    {
      Header: "Name",
      accessor: "ProductName",
      style: {
        textAlign: "center"
      }
    },
    {
      Header: "QuntityOnHand",
      accessor: "ProductQuntityOnHand",
      style: {
        textAlign: "center"
      }
    },
    {
      Header: "Price",
      accessor: "ProductPrice",
      style: {
        textAlign: "center"
      }
    }
  ];

  /// End Class Variables

  getProducts = () => {
    this.productService
      .getProducts()
      .then(response => {
        if (response.data.success) {
          this.setState({ products: response.data.entity });
        } else {
          throw "something went wrong";
        }
      })
      .catch(error => {});
  };

  render() {
    return (
      <div className="row">
        <div className="col-12">
          <div className={BoxStyles.box}>
            <div className={BoxStyles["box-header"]}>
              <span className={BoxStyles["box-title"]}>
                <i className="fas fa-database" /> Products
              </span>
            </div>
            <div className={BoxStyles["box-body"]}>
              <ReactTable
                data={this.state.products}
                columns={this.columns}
                defaultPageSize={10}
                className="-striped -highlight"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductsGrid;
