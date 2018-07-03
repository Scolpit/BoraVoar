import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import carReducer from "./carReducer";

export default combineReducers({
  errors: errorReducer,
  auth: authReducer,
  car: carReducer
});
