import axios from "axios";
import { GET_ERRORS, GET_CARS } from "./types";
import { setLoading } from "./commonActions";

//Create Car
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

//Get Car List
export const getCars = () => dispatch => {
  dispatch(setLoading(true));
  axios
    .get("/api/cars")
    .then(res => {
      dispatch({
        type: GET_CARS,
        payload: res.data
      });
      dispatch(setLoading(false));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      dispatch(setLoading(false));
    });
};
