import {
  MAJOR_ENTITY_UPDATE_AREAS,
  MAJOR_ENTITY_UPDATE_FIELDS,
  MAJOR_ENTITY_UPDATE_ENTITY_DATA,
  MAJOR_ENTITY_SHOW_SAVE_SPINNER
} from "../actionTypes";

export default (
  state = {
    areas: [],
    fields: [],
    entityData: {},
    showSaveSpinner: false
  },
  action
) => {
  switch (action.type) {
    case MAJOR_ENTITY_UPDATE_AREAS:
      return { ...state, areas: action.payload };
    case MAJOR_ENTITY_UPDATE_FIELDS:
      return { ...state, fields: action.payload };
    case MAJOR_ENTITY_UPDATE_ENTITY_DATA:
      return {
        ...state,
        entityData: { ...state.entityData, [action.key]: action.payload }
      };
    case MAJOR_ENTITY_SHOW_SAVE_SPINNER:
      return {
        ...state,
        showSaveSpinner: action.payload
      };
    default:
      return state;
  }
};
