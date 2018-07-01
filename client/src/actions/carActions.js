import axios from "axios";
import { GET_ERRORS, GET_CARS, GET_CAR } from "./types";
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

//Add ride to car by name
export const addRideToCarByName = (carid, username) => dispatch => {
  //dispatch(setLoading(true));
  axios
    .post(`/api/cars/${carid}/ride`, username)
    .then(res => {
      dispatch({
        type: GET_CAR,
        payload: res.data
      });
      //dispatch(setLoading(false));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
      //dispatch(setLoading(false));
    });
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

//Get Car By Id
export const getCarById = carid => dispatch => {
  dispatch(setLoading(true));
  axios
    .get(`/api/cars/${carid}`)
    .then(res => {
      dispatch({
        type: GET_CAR,
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

//Delete Ride from Car
export const deleteRideFromCar = (carid, rideid) => dispatch => {
  dispatch(setLoading(true));
  axios
    .delete(`/api/cars/${carid}/ride/${rideid}`)
    .then(res => {
      dispatch({
        type: GET_CAR,
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
