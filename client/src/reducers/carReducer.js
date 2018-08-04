import {
  GET_CARS,
  GET_CAR,
  SET_CAR_LOADING,
  DELETE_CAR,
  GET_CAR_COUNT,
  SET_CAR_COUNT_LOADING
} from "../actions/types";

const initialState = {
  car: {},
  cars: [],
  loading: false,
  count: 0,
  countLoading: false
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
        count: action.payload.length,
        loading: false
      };
    case GET_CAR:
      return {
        ...state,
        car: action.payload,
        loading: false
      };
    case GET_CAR_COUNT:
      return {
        ...state,
        count: action.payload,
        countLoading: false
      };
    case DELETE_CAR:
      return {
        ...state,
        car: {}
      };
    case SET_CAR_COUNT_LOADING:
      return {
        ...state,
        countLoading: true
      };
    default:
      return state;
  }
}
