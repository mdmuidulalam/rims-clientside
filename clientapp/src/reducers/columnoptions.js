import {
  COLUMN_OPTIONS_CHANGE_COLUMNS,
  COLUMN_OPTIONS_ADD_COLUMNS,
  COLUMN_OPTIONS_DELETE_COLUMNS,
  COLUMN_OPTIONS_SET_ALL_COLUMNS,
  COLUMN_OPTIONS_SET_COLUMNS
} from "../actionTypes";

export default (
  state = {
    /* Model Elements */
    columns: [
      {
        Header: "Name",
        accessor: "ProductName"
      },
      {
        Header: "Quantity On Hand",
        accessor: "ProductQuantityOnHand"
      }
    ],
    allColumns: []
  },
  action
) => {
  switch (action.type) {
    case COLUMN_OPTIONS_CHANGE_COLUMNS:
      return {
        ...state,
        columns: state.columns.map((item, index) => {
          if (index !== action.payload.index) {
            return item;
          }
          return {
            ...state.allColumns.find(
              col => col.Header === action.payload.column
            )
          };
        })
      };
    case COLUMN_OPTIONS_ADD_COLUMNS:
      let newColumns = state.columns.slice();
      newColumns.push(state.allColumns[0]);
      return {
        ...state,
        columns: newColumns
      };
    case COLUMN_OPTIONS_DELETE_COLUMNS:
      return {
        ...state,
        columns: state.columns.filter((item, index) => index !== action.payload)
      };
    case COLUMN_OPTIONS_SET_ALL_COLUMNS:
      return {
        ...state,
        allColumns: action.payload
      };
    case COLUMN_OPTIONS_SET_COLUMNS:
      return {
        ...state,
        columns: action.payload
      };
    default:
      return state;
  }
};
