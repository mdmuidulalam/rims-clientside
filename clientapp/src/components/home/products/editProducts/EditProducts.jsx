import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import Promise from "bluebird";
import queryString from "query-string";
import { Modal, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BoxStyles from "../../../../utilities/css/Box.less";
import RandomStyles from "../../../../utilities/css/Random.less";
import EditProductsStyles from "./EditProducts.less";
import ViewsService from "../../../../services/Views";
import ProductsService from "../../../../services/Products";
import EntityTypes from "../../../../enums/EntityTypes";
import EntityFieldTypes from "../../../../enums/EntityFieldTypes";

import {
  MAJOR_ENTITY_UPDATE_AREAS,
  MAJOR_ENTITY_UPDATE_FIELDS,
  MAJOR_ENTITY_UPDATE_ENTITY_DATA,
  MAJOR_ENTITY_SHOW_SAVE_SPINNER
} from "../../../../actionTypes";

const mapStateToProps = state => ({
  majorentity: { ...state.majorentity }
});

const mapDispatchToProps = dispatch => ({
  updateAreas: payload =>
    dispatch({ type: MAJOR_ENTITY_UPDATE_AREAS, payload }),
  updateFields: payload =>
    dispatch({ type: MAJOR_ENTITY_UPDATE_FIELDS, payload }),
  entityFieldsOnChange: (key, payload) =>
    dispatch({ type: MAJOR_ENTITY_UPDATE_ENTITY_DATA, key, payload }),
  showSaveSpinner: payload =>
    dispatch({ type: MAJOR_ENTITY_SHOW_SAVE_SPINNER, payload })
});

class EditProducts extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    this.viewsService = new ViewsService();
    this.productsService = new ProductsService();
  }

  /// OverRide Functions

  componentDidMount() {
    this.getAreasAndFeilds();
    this.getEntityData();
  }

  /// End OverRide Functions

  getAreasAndFeilds() {
    const { cookies } = this.props;
    return new Promise((resolve, reject) => {
      let allAreasAndFields = cookies.get("allAreasAndFields");
      if (allAreasAndFields == undefined) {
        resolve(
          this.viewsService.getEntityAreas().then(response => {
            cookies.set("allAreasAndFields", response.data.entity, {
              path: "/home"
            });
            return response.data.entity;
          })
        );
      } else {
        resolve(allAreasAndFields);
      }
    }).then(allAreasAndFields => {
      let allAreas = allAreasAndFields.areas.filter(
        area => area.EntityTypes == EntityTypes.Product
      );
      this.props.updateAreas(allAreas);

      let areaIds = allAreas.map(area => area.Id);

      let allFields = allAreasAndFields.fields.filter(field =>
        areaIds.includes(field.EntityAreaId)
      );
      this.props.updateFields(allFields);
    });
  }

  getEntityData() {
    let query = queryString.parse(this.props.location.search);
    this.productsService.getProduct(query.id).then(response => {
      if (response.data.success) {
        for (let field in response.data.entity[0]) {
          this.props.entityFieldsOnChange(
            field,
            response.data.entity[0][field]
          );
        }
      } else {
      }
    });
  }

  saveEntityData() {
    ///Logic Steps
    this.props.showSaveSpinner(true);

    ///Save Data Api
    let query = queryString.parse(this.props.location.search);
    let entity = {
      Id: query.id
    };
    for (let x in this.props.majorentity.entityData) {
      if (!["updatedAt", "createdAt", "id"].includes(x)) {
        entity[x] = this.props.majorentity.entityData[x];
      }
    }
    this.productsService.editProduct(entity).then(response => {
      this.props.showSaveSpinner(false);
      if (response.data.success) {
        toast.success("Successfully saved product.");
      } else {
        toast.error("An unknown error happened.");
      }
    });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-12">
            <div className={BoxStyles.box}>
              <div className={BoxStyles["box-body"]}>
                <span style={{ fontSize: "25px" }}>
                  <b>
                    {this.props.majorentity.entityData.ProductName || ""}{" "}
                    {this.props.majorentity.entityData.ProductCode
                      ? `(${this.props.majorentity.entityData.ProductCode})`
                      : ""}
                  </b>
                </span>
              </div>
            </div>
          </div>
          {this.props.majorentity.areas.map(area => (
            <div key={area.Id} className="col-12">
              <div className={`${BoxStyles.box} ${BoxStyles["box-default"]}`}>
                <div className={BoxStyles["box-header"]}>
                  <span className={BoxStyles["box-title"]}>
                    {area.AreaName}
                  </span>
                </div>
                <div className={BoxStyles["box-body"]}>
                  <div className="row">
                    {this.props.majorentity.fields
                      .filter(field => field.EntityAreaId == area.Id)
                      .map(field => {
                        if (
                          field.EntityFieldType == EntityFieldTypes.Text ||
                          field.EntityFieldType == EntityFieldTypes.Number
                        ) {
                          return (
                            <div
                              key={field.Id}
                              className="col-lg-3 col-md-6 col-sm-12"
                            >
                              <div className="form-group">
                                <label htmlFor={field.FieldName}>
                                  {field.FieldName}
                                </label>
                                <input
                                  type={
                                    field.EntityFieldType ==
                                    EntityFieldTypes.Text
                                      ? "text"
                                      : "number"
                                  }
                                  className={`form-control ${
                                    RandomStyles.inputfield
                                  }`}
                                  id={field.FieldName}
                                  value={
                                    this.props.majorentity.entityData[
                                      field.Accessor
                                    ] != undefined
                                      ? this.props.majorentity.entityData[
                                          field.Accessor
                                        ]
                                      : ""
                                  }
                                  name={field.Accessor}
                                  onChange={event =>
                                    this.props.entityFieldsOnChange(
                                      event.target.name,
                                      event.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                          );
                        } else if (
                          field.EntityFieldType == EntityFieldTypes.TextArea
                        ) {
                          return (
                            <div key={field.Id} className="col-12">
                              <div className="form-group">
                                <label htmlFor={field.FieldName}>
                                  {field.FieldName}
                                </label>
                                <textarea
                                  className={`form-control ${
                                    RandomStyles.inputfield
                                  }`}
                                  rows="3"
                                  id={field.FieldName}
                                  value={
                                    this.props.majorentity.entityData[
                                      field.Accessor
                                    ] != undefined
                                      ? this.props.majorentity.entityData[
                                          field.Accessor
                                        ]
                                      : ""
                                  }
                                  name={field.Accessor}
                                  onChange={event =>
                                    this.props.entityFieldsOnChange(
                                      event.target.name,
                                      event.target.value
                                    )
                                  }
                                />
                              </div>
                            </div>
                          );
                        }
                      })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="col-12">
            <div className={BoxStyles.box}>
              <div className={BoxStyles["box-body"]}>
                <div className={`float-right ${EditProductsStyles["footer"]}`}>
                  <Button
                    className={`btn ${RandomStyles["primary-button"]}`}
                    onClick={() => this.saveEntityData()}
                  >
                    {this.props.majorentity.showSaveSpinner ? (
                      <i className="fa fa-spinner fa-spin" />
                    ) : (
                      ""
                    )}{" "}
                    Save
                  </Button>
                  <Button
                    className={`btn btn-light ${
                      RandomStyles["secondary-button"]
                    }`}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
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
)(EditProducts);
