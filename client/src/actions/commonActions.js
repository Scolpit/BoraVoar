import { SET_LOADING } from "./types";

// Set Loading
export const setLoading = isLoading => {
  return {
    type: SET_LOADING,
    payload: isLoading
  };
};
