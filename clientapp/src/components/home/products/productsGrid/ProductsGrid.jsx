import React, { Component } from "react";
import axios from "axios";
import ReactTable from "react-table";
import "react-table/react-table.css";
import GridStyles from "../../../../utilities/css/Grid.less";

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

  //should be moved to utilities/reactTable.js
  filterMethod = (filter, row, column) => {
    const id = filter.pivotId || filter.id;
    return row[id] !== undefined
      ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
      : true;
  };

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const columns = [
      {
        Header: "ID",
        accessor: "id"
      },
      {
        Header: "Product Name",
        accessor: "ProductName"
      },
      {
        Header: "Product Price",
        accessor: "ProductPrice"
      },
      {
        Header: "Quantity",
        accessor: "QuantityOnHand"
      }
    ];

    return (
      <div>
        <div className={GridStyles.gridTitle}>
          <h1>Products</h1>
        </div>
        <div className={GridStyles.gridBody}>
          <ReactTable
            data={this.state.products}
            columns={columns}
            filterable
            defaultFilterMethod={this.filterMethod}
          />
        </div>
      </div>
    );
  }
}

export default ProductsGrid;
