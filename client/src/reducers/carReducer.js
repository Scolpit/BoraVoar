import {
  GET_CARS,
  GET_CAR,
  SET_CAR_LOADING,
  DELETE_CAR
} from "../actions/types";

const initialState = {
  car: {},
  cars: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CAR_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CARS:
      return {
        ...state,
        cars: action.payload,
        loading: false
      };
    case GET_CAR:
      return {
        ...state,
        car: action.payload,
        loading: false
      };
    case DELETE_CAR:
      return {
        ...state,
        car: {}
      };
    default:
      return state;
  }
}
