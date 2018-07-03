import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import carReducer from "./carReducer";
import rideReducer from "./rideReducer";

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  car: carReducer,
  ride: rideReducer
});
