import { createStore, combineReducers } from "redux";

import login from "./reducers/login";

export const store = createStore(
  combineReducers({
    login
  })
);
