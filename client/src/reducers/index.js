import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import commonReducer from "./commonReducer";

export default combineReducers({
  errors: errorReducer,
  common: commonReducer,
  auth: authReducer
});
