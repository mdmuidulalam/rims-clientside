import {
  MAJOR_GRID_UPDATE_DATA,
  MAJOR_GRID_UPDATE_SHOW_COLUMN_OPTIONS_MODAL,
  MAJOR_GRID_UPDATE_COLUMNS
} from "../actionTypes";

export default (
  state = {
    /* Model Elements */
    data: [],
    showColumnOptionsModal: false,
    gridColumns: []
  },
  action
) => {
  switch (action.type) {
    case MAJOR_GRID_UPDATE_DATA:
      return { ...state, data: action.payload };
    case MAJOR_GRID_UPDATE_SHOW_COLUMN_OPTIONS_MODAL:
      return { ...state, showColumnOptionsModal: action.payload };
    case MAJOR_GRID_UPDATE_COLUMNS:
      return { ...state, gridColumns: action.payload };
    default:
      return state;
  }
};
