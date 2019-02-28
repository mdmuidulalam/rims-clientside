import React, { Component } from "react";
import ReactTable from "react-table";
import { Modal, Button, Dropdown } from "react-bootstrap";

import GridStyles from "../../../../utilities/css/Grid.css";
import BoxStyles from "../../../../utilities/css/Box.less";
import RandomStyles from "../../../../utilities/css/Random.less";
import ProductService from "../../../../services/Product";

class ProductsGrid extends Component {
  constructor(props) {
    super(props);

    this.productService = new ProductService();
    this.state = {
      products: [],
      showModal: false
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
      Header: "Quantity On Hand",
      accessor: "ProductQuantityOnHand",
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

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

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
              <div className="row">
                <div className="col-12 text-right">
                  <span
                    className={RandomStyles["columnoptions"]}
                    onClick={() => this.open()}
                  >
                    <i className="fas fa-wrench" /> Column options
                  </span>
                </div>
              </div>
              <div className={"row " + RandomStyles["top-buffer"]}>
                <div className="col-12">
                  <ReactTable
                    data={this.state.products}
                    columns={this.columns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                  />
                </div>
              </div>
              <div>
                <Modal show={this.state.showModal} onHide={() => this.close()}>
                  <Modal.Header>
                    <Modal.Title>
                      <i className="fas fa-wrench" /> Column options
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {this.columns.map((col, i) => (
                      <select
                        className={"form-control " + RandomStyles["inputfield"]}
                        key={i}
                        value={col.Header}
                      >
                        {this.columns.map(col => (
                          <option key={col.Header}>{col.Header}</option>
                        ))}
                      </select>
                    ))}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button className="btn btn-success">OK</Button>
                    <Button
                      className="btn btn-light"
                      onClick={() => this.close()}
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductsGrid;
