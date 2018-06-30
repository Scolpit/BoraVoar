import axios from "axios";
import { GET_ERRORS } from "./types";

export const rideCreate = (rideData, history) => dispatch => {
  axios
    .post("/api/rides", rideData)
    .then(res => history.push("/RideList"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
