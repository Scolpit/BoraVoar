import { GET_CARS, GET_CAR } from "../actions/types";

const initialState = {
  car: {},
  cars: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CARS:
      return {
        ...state,
        cars: action.payload
      };
    case GET_CAR:
      return {
        ...state,
        car: action.payload
      };
    default:
      return state;
  }
}
