import axios from "axios";
import { GET_ERRORS } from "./types";

export const carCreate = (carData, history) => dispatch => {
  axios
    .post("/api/cars", carData)
    .then(res => history.push("/CarList"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
