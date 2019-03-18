import { createStore, combineReducers } from "redux";

import login from "./reducers/login";
import columnoptions from "./reducers/columnoptions";
import majorgrid from "./reducers/majorgrid";
import majorentity from "./reducers/majorentity";

export const store = createStore(
  combineReducers({
    login,
    columnoptions,
    majorgrid,
    majorentity
  })
);
