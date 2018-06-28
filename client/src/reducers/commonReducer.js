import { SET_ACTIVE_MENU } from "../actions/types";

const initialState = {
  activemenu: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_ACTIVE_MENU:
      return {
        ...state,
        activemenu: action.payload
      };
    default:
      return state;
  }
}
