import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import { Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import BoxStyles from "../../../../utilities/css/Box.less";
import RandomStyles from "../../../../utilities/css/Random.less";
import ViewsService from "../../../../services/Views";
import OrdersService from "../../../../services/Orders";
import EntityTypes from "../../../../enums/EntityTypes";
import CustomFields from "../../../shared/CustomFields.jsx";

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

class EditOrders extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);

    this.viewsService = new ViewsService();
    this.ordersService = new OrdersService();
  }

  /// OverRide Functions

  componentDidMount() {
    this.getAreasAndFeilds();
    this.getEntityData();
  }

  /// End OverRide Functions

  getAreasAndFeilds() {
    const { cookies } = this.props;
    return this.viewsService.getEntityAreas(cookies).then(allAreasAndFields => {
      let allAreas = allAreasAndFields.areas.filter(
        area => area.EntityTypes == EntityTypes.Order
      );
      this.props.updateAreas(allAreas);

      let areaIds = allAreas.map(area => area.Id);

      let allFields = allAreasAndFields.fields
        .filter(field => areaIds.includes(field.EntityAreaId))
        .sort((a, b) =>
          a.SortOrder > b.SortOrder ? 1 : b.SortOrder > a.SortOrder ? -1 : 0
        );

      this.props.updateFields(allFields);
    });
  }

  getEntityData() {
    let query = queryString.parse(this.props.location.search);
    this.ordersService.getOrder(query.id).then(response => {
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
    this.props.showSaveSpinner(true);

    let query = queryString.parse(this.props.location.search);
    let entity = {
      Id: query.id
    };
    for (let x in this.props.majorentity.entityData) {
      if (!["updatedAt", "createdAt", "id"].includes(x)) {
        entity[x] = this.props.majorentity.entityData[x];
      }
    }
    this.ordersService.editOrder(entity).then(response => {
      this.props.showSaveSpinner(false);
      if (response.data.success) {
        toast.success("Successfully saved order.");
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
                  Order No:
                  <b> {this.props.majorentity.entityData.OrderNumber || ""}</b>
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
                        return (
                          <CustomFields
                            key={field.id}
                            Field={field}
                            Majorentity={this.props.majorentity}
                            EntityFieldsOnChange={
                              this.props.entityFieldsOnChange
                            }
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="col-12">
            <div className={BoxStyles.box}>
              <div className={BoxStyles["box-body"]}>
                <div className={`float-right ${RandomStyles["footer"]}`}>
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
)(EditOrders);
