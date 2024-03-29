import { LOG_IN_UPDATE_FIELD, LOG_IN_PAGE_UNLOADED } from "../actionTypes";

export default (
  state = {
    /* Model Elements */
    email: "",
    password: "",
    /* View Elements */
    showValidationError: false,
    validationErrorMessage: ""
  },
  action
) => {
  switch (action.type) {
    case LOG_IN_UPDATE_FIELD:
      return { ...state, [action.key]: action.payload };
    case LOG_IN_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
