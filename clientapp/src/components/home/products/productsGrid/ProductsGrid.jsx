import React, { Component } from "react";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import GridStyles from "../../../../utilities/css/Grid.css";
import BoxStyles from "../../../../utilities/css/Box.less";

class ProductsGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  getProducts = () => {
    axios
      .get("/api/products/get")
      .then(response => {
        if (response.data.success) {
          this.setState({ products: response.data.entity });
        } else {
          throw "something went wrong";
        }
      })
      .catch(error => {});
  };

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const columns = [
      {
        Header: "Name",
        accessor: "ProductName",
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
                columns={columns}
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
