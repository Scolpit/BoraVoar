import { GET_RIDES, SET_RIDE_LOADING } from "../actions/types";

const initialState = {
  rides: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_RIDE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_RIDES:
      return {
        ...state,
        rides: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
