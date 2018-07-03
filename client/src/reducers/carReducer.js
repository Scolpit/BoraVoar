import { GET_CARS, GET_CAR } from "../actions/types";

const initialState = {
  car: {},
  cars: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}
