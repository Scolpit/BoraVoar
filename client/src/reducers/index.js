import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import commonReducer from "./commonReducer";
import carReducer from "./carReducer";

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  common: commonReducer,
  car: carReducer
});
