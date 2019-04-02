import React, { Component } from "react";

import EntityFieldTypes from "../../enums/EntityFieldTypes";
import RandomStyles from "../../utilities/css/Random.less";

class CustomFields extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.Field.ValueScript == null) {
      if (
        this.props.Field.EntityFieldType == EntityFieldTypes.Text ||
        this.props.Field.EntityFieldType == EntityFieldTypes.Number
      ) {
        return (
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="form-group">
              <label htmlFor={this.props.Field.FieldName}>
                {this.props.Field.FieldName}
              </label>
              <input
                type={
                  this.props.Field.EntityFieldType == EntityFieldTypes.Text
                    ? "text"
                    : "number"
                }
                className={`form-control ${RandomStyles.inputfield}`}
                id={this.props.Field.FieldName}
                value={
                  this.props.Majorentity.entityData[
                    this.props.Field.Accessor
                  ] != undefined
                    ? this.props.Majorentity.entityData[
                        this.props.Field.Accessor
                      ]
                    : ""
                }
                name={this.props.Field.Accessor}
                onChange={event =>
                  this.props.EntityFieldsOnChange(
                    event.target.name,
                    event.target.value
                  )
                }
              />
            </div>
          </div>
        );
      } else if (
        this.props.Field.EntityFieldType == EntityFieldTypes.TextArea
      ) {
        return (
          <div className="col-12">
            <div className="form-group">
              <label htmlFor={this.props.Field.FieldName}>
                {this.props.Field.FieldName}
              </label>
              <textarea
                className={`form-control ${RandomStyles.inputfield}`}
                rows="3"
                id={this.props.Field.FieldName}
                value={
                  this.props.Majorentity.entityData[
                    this.props.Field.Accessor
                  ] != undefined
                    ? this.props.Majorentity.entityData[
                        this.props.Field.Accessor
                      ]
                    : ""
                }
                name={this.props.Field.Accessor}
                onChange={event =>
                  this.props.EntityFieldsOnChange(
                    event.target.name,
                    event.target.value
                  )
                }
              />
            </div>
          </div>
        );
      }
    } else {
      if (
        this.props.Field.EntityFieldType == EntityFieldTypes.Text ||
        this.props.Field.EntityFieldType == EntityFieldTypes.Number
      ) {
        return (
          <div className="col-lg-3 col-md-6 col-sm-12">
            <div className="form-group">
              <label htmlFor={this.props.Field.FieldName}>
                {this.props.Field.FieldName}
              </label>
              <input
                type={
                  this.props.Field.EntityFieldType == EntityFieldTypes.Text
                    ? "text"
                    : "number"
                }
                className={`form-control ${RandomStyles.inputfield}`}
                id={this.props.Field.FieldName}
                value={eval(
                  this.props.Field.ValueScript.replace(
                    /\$/g,
                    "this.props.Majorentity.entityData"
                  )
                )}
                name={this.props.Field.Accessor}
                disabled
              />
            </div>
          </div>
        );
      }
    }
  }
}

export default CustomFields;
