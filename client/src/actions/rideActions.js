import axios from "axios";
import { GET_ERRORS, GET_RIDES, SET_RIDE_LOADING } from "./types";

//Get Rides List
export const getRides = () => dispatch => {
  dispatch(setRideLoading());
  axios
    .get("/api/rides")
    .then(res => {
      dispatch({
        type: GET_RIDES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Get Rides List
export const getRidesByDate = date => dispatch => {
  const parsedate =
    date.substring(0, 4) + date.substring(5, 7) + date.substring(8, 10);

  dispatch(setRideLoading());
  axios
    .get(`/api/rides/date/${parsedate}`)
    .then(res => {
      dispatch({
        type: GET_RIDES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Create Ride
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

// Set Loading
export const setRideLoading = () => {
  return {
    type: SET_RIDE_LOADING
  };
};
