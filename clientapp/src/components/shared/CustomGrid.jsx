import React, { Component } from "react";
import ReactTable from "react-table";
import { Modal, Button } from "react-bootstrap";
import { compose } from "redux";
import { connect } from "react-redux";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import renderHTML from "react-render-html";

import GridStyles from "../../utilities/css/Grid.css";
import BoxStyles from "../../utilities/css/Box.less";
import RandomStyles from "../../utilities/css/Random.less";
import CustomGridStyles from "./CustomGrid.less";
import ViewsService from "../../services/Views";

import {
  MAJOR_GRID_UPDATE_COLUMNS,
  MAJOR_GRID_UPDATE_DATA,
  MAJOR_GRID_UPDATE_SHOW_COLUMN_OPTIONS_MODAL,
  COLUMN_OPTIONS_CHANGE_COLUMNS,
  COLUMN_OPTIONS_ADD_COLUMNS,
  COLUMN_OPTIONS_DELETE_COLUMNS,
  COLUMN_OPTIONS_SET_ALL_COLUMNS,
  COLUMN_OPTIONS_SET_COLUMNS
} from "../../actionTypes";

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

class CustomGrid extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    this.viewsService = new ViewsService();
  }

  /// OverRide Functions

  componentDidMount() {
    this.getInitColumns();
    this.getGridData();
  }

  /// End OverRide Functions

  /// Column Options

  updateColumnOptionsModal() {
    this.props.changeColumns(this.props.columns);
    let columns = JSON.parse(localStorage.getItem('columns'));
    columns[this.props.GridType.toString()] = this.props.columns;
    localStorage.setItem('columns', JSON.stringify(columns));

    this.props.changeShowColumnOptionsModal(false);
  }

  /// End Column Options

  /// Get Grid Columns
  getInitColumns() {
    this.viewsService
      .getDataGridColumns()
      .then(allColumns => {
        let allGridColumns = allColumns.filter(col => {
          if (col.GridType == this.props.GridType) return col;
        });
        allGridColumns.sort((a, b) =>
          a.SortOrder > b.SortOrder ? 1 : b.SortOrder > a.SortOrder ? -1 : 0
        );

        return allGridColumns;
      })
      .then(allGridColumns => {
        let columns = JSON.parse(localStorage.getItem('columns'));
        
        let gridColumns;
        if (
          columns == undefined ||
          columns[this.props.GridType.toString()] == undefined ||
          columns[this.props.GridType.toString()] == null
        ) {
          gridColumns = allGridColumns.filter(col => col.SortOrder <= 2);
          if (columns == undefined) {
            columns = {};
          }
          columns[this.props.GridType.toString()] = gridColumns;
          localStorage.setItem('columns', JSON.stringify(columns));
        } else {
          gridColumns = columns[this.props.GridType.toString()];
        }

        this.props.setAllColumns(allGridColumns);
        this.props.setColumns(gridColumns);
        this.props.changeColumns(gridColumns);
      })
      .catch(error => console.log(error));
  }

  /// Get Grid Data
  getGridData() {
    this.props
      .GetData()
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
                {renderHTML(this.props.Heading)}
              </span>
            </div>
            <div className={BoxStyles["box-body"]}>
              <div className="row">
                <div className="col-12 text-right">
                  <span
                    className={RandomStyles["columnoptions"]}
                    onClick={() =>
                      this.props.changeShowColumnOptionsModal(true)
                    }
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
                    getTdProps={(state, rowInfo, column, instance) => {
                      return {
                        onClick: () => {
                          this.props.history.push(
                            `${this.props.match.path}/edit?id=${
                              rowInfo.original.id
                            }`
                          );
                        }
                      };
                    }}
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
                              CustomGridStyles["delete-button-column-options"]
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
                        "btn " + CustomGridStyles["ok-button-column-options"]
                      }
                      onClick={() => this.updateColumnOptionsModal()}
                    >
                      OK
                    </Button>
                    <Button
                      className={
                        "btn btn-light " +
                        CustomGridStyles["cancel-button-column-options"]
                      }
                      onClick={() =>
                        this.props.changeShowColumnOptionsModal(false)
                      }
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
)(CustomGrid);
