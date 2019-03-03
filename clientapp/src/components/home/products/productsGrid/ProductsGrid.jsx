import React, { Component } from "react";
import ReactTable from "react-table";
import { Modal, Button } from "react-bootstrap";
import { compose } from "redux";
import { connect } from "react-redux";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import Promise from "bluebird";

import GridStyles from "../../../../utilities/css/Grid.css";
import BoxStyles from "../../../../utilities/css/Box.less";
import RandomStyles from "../../../../utilities/css/Random.less";
import ProductsGridStyles from "./ProductsGrid.less";
import ProductsService from "../../../../services/Products";
import ViewsService from "../../../../services/Views";
import GridTypes from "../../../../enums/GridTypes";

import {
  MAJOR_GRID_UPDATE_COLUMNS,
  MAJOR_GRID_UPDATE_DATA,
  MAJOR_GRID_UPDATE_SHOW_COLUMN_OPTIONS_MODAL,
  COLUMN_OPTIONS_CHANGE_COLUMNS,
  COLUMN_OPTIONS_ADD_COLUMNS,
  COLUMN_OPTIONS_DELETE_COLUMNS,
  COLUMN_OPTIONS_SET_ALL_COLUMNS,
  COLUMN_OPTIONS_SET_COLUMNS
} from "../../../../actionTypes";

const mapStateToProps = state => ({
  ...state.columnoptions,
  ...state.majorgrid
});

const mapDispatchToProps = dispatch => ({
  changeColumns: payload =>
    dispatch({ type: MAJOR_GRID_UPDATE_COLUMNS, payload }),
  changeGridData: payload =>
    dispatch({ type: MAJOR_GRID_UPDATE_DATA, payload }),
  changeShowColumnOptionsModal: payload =>
    dispatch({ type: MAJOR_GRID_UPDATE_SHOW_COLUMN_OPTIONS_MODAL, payload }),
  onChangeColumnOptionsItem: (index, column) =>
    dispatch({
      type: COLUMN_OPTIONS_CHANGE_COLUMNS,
      payload: { index: index, column: column }
    }),
  addColumn: () => dispatch({ type: COLUMN_OPTIONS_ADD_COLUMNS }),
  deleteColumn: payload =>
    dispatch({ type: COLUMN_OPTIONS_DELETE_COLUMNS, payload }),
  setAllColumns: payload =>
    dispatch({ type: COLUMN_OPTIONS_SET_ALL_COLUMNS, payload }),
  setColumns: payload => dispatch({ type: COLUMN_OPTIONS_SET_COLUMNS, payload })
});

class ProductsGrid extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    this.productsService = new ProductsService();
    this.viewsService = new ViewsService();
  }

  /// OverRide Functions

  componentDidMount() {
    this.getInitColumns();
    this.getGridData();
  }

  /// End OverRide Functions

  /// Column Options

  closeColumnOptionsModal() {
    this.props.changeShowColumnOptionsModal(false);
  }

  openColumnOptionsModal() {
    this.props.changeShowColumnOptionsModal(true);
  }

  okColumnOptionsModal() {
    const { cookies } = this.props;

    this.props.changeColumns(this.props.columns);
    let columns = cookies.get("columns");
    columns[GridTypes.Product.toString()] = this.props.columns;
    cookies.set("columns", columns, {
      path: "/home"
    });

    this.closeColumnOptionsModal();
  }

  /// End Column Options

  /// Get Grid Columns
  getInitColumns() {
    const { cookies } = this.props;

    new Promise((resolve, reject) => {
      let allColumns = cookies.get("allColumns");
      if (allColumns == undefined) {
        resolve(
          this.viewsService
            .getDataGridColumns()
            .then(response => response.data.entity)
        );
      } else {
        resolve(allColumns);
      }
    })
      .then(allColumns => {
        cookies.set("allColumns", allColumns, {
          path: "/home"
        });

        console.log(allColumns);

        let allGridColumns = allColumns.filter(col => {
          if (col.GridType == GridTypes.Product) return col;
        });
        allGridColumns.sort((a, b) =>
          a.SortOrder > b.SortOrder ? 1 : b.SortOrder > a.SortOrder ? -1 : 0
        );

        return allGridColumns;
      })
      .then(allGridColumns => {
        let columns = cookies.get("columns");
        let gridColumns;
        if (
          columns == undefined ||
          columns[GridTypes.Product.toString()] == undefined ||
          columns[GridTypes.Product.toString()] == null
        ) {
          gridColumns = allGridColumns.filter(col => col.SortOrder <= 2);
          if (columns == undefined) {
            columns = {};
          }
          columns[GridTypes.Product.toString()] = gridColumns;
          cookies.set("columns", columns, {
            path: "/home"
          });
        } else {
          gridColumns = columns[GridTypes.Product.toString()];
        }

        this.props.setAllColumns(allGridColumns);
        this.props.setColumns(gridColumns);
        this.props.changeColumns(gridColumns);
      })
      .catch(error => console.log(error));
  }

  /// Get Grid Data
  getGridData() {
    this.productsService
      .getProducts()
      .then(response => {
        if (response.data.success) {
          this.props.changeGridData(response.data.entity);
        } else {
          throw "something went wrong";
        }
      })
      .catch(error => {});
  }

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
                    onClick={() => this.openColumnOptionsModal()}
                  >
                    <i className="fas fa-wrench" /> Column options
                  </span>
                </div>
              </div>
              <div className={"row " + RandomStyles["top-buffer"]}>
                <div className="col-12">
                  <ReactTable
                    data={this.props.data}
                    columns={this.props.gridColumns}
                    defaultPageSize={10}
                    className="-striped -highlight"
                  />
                </div>
              </div>
              <div>
                <Modal show={this.props.showColumnOptionsModal}>
                  <Modal.Header>
                    <Modal.Title>
                      <i className="fas fa-wrench" /> Column options
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {this.props.columns.map((col, idx) => (
                      <div key={idx} className="row">
                        <div className="col-10">
                          <div className="form-group">
                            <select
                              className={
                                "form-control " + RandomStyles["inputfield"]
                              }
                              value={col.Header}
                              onChange={event =>
                                this.props.onChangeColumnOptionsItem(
                                  idx,
                                  event.target.value
                                )
                              }
                            >
                              {this.props.allColumns.map(col => (
                                <option key={col.Header} value={col.Header}>
                                  {col.Header}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-2">
                          <i
                            className={
                              "fas fa-times " +
                              ProductsGridStyles["delete-button-column-options"]
                            }
                            onClick={() => this.props.deleteColumn(idx)}
                          />
                        </div>
                      </div>
                    ))}
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <Button
                            className="btn btn-light"
                            onClick={() => this.props.addColumn()}
                          >
                            <i className="fas fa-plus" /> Add a column
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      className={
                        "btn " + ProductsGridStyles["ok-button-column-options"]
                      }
                      onClick={() => this.okColumnOptionsModal()}
                    >
                      OK
                    </Button>
                    <Button
                      className={
                        "btn btn-light " +
                        ProductsGridStyles["cancel-button-column-options"]
                      }
                      onClick={() => this.closeColumnOptionsModal()}
                    >
                      Cancel
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

export default compose(
  withRouter,
  withCookies,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProductsGrid);
