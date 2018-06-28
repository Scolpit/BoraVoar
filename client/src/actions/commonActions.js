import { SET_ACTIVE_MENU } from "./types";

// Set Active Menu
export const setActiveMenu = activeMenu => dispatch => {
  dispatch({
    type: SET_ACTIVE_MENU,
    payload: activeMenu
  });
};
