import {
  GET_RIDES,
  SET_RIDE_LOADING,
  GET_RIDE_COUNT,
  SET_RIDE_COUNT_LOADING
} from "../actions/types";

const initialState = {
  rides: [],
  loading: false,
  countLoading: false,
  count: 0
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
    case GET_RIDE_COUNT:
      return {
        ...state,
        count: action.payload,
        countLoading: false
      };
    case SET_RIDE_COUNT_LOADING:
      return {
        ...state,
        countLoading: true
      };
    default:
      return state;
  }
}
