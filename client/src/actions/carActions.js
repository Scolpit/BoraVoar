import axios from "axios";
import { GET_ERRORS, GET_CARS, GET_CAR, SET_CAR_LOADING } from "./types";

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
  axios
    .post(`/api/cars/${carid}/ride`, username)
    .then(res => {
      dispatch({
        type: GET_CAR,
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

//Add ride to car by id
export const addRideToCarByUserId = (carid, userid) => dispatch => {
  axios
    .post(`/api/cars/${carid}/ride/${userid}`)
    .then(res => {
      dispatch({
        type: GET_CAR,
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

//Set Car as Full/Not Full
export const setFullCar = (carid, fullData, setLoadingOff) => dispatch => {
  axios
    .post(`/api/cars/${carid}/full`, fullData)
    .then(res => {
      dispatch({
        type: GET_CAR,
        payload: res.data
      });
      setLoadingOff();
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Get Car List
export const getCars = () => dispatch => {
  dispatch(setCarLoading());
  axios
    .get("/api/cars")
    .then(res => {
      dispatch({
        type: GET_CARS,
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

//Get Car By Id
export const getCarById = carid => dispatch => {
  dispatch(setCarLoading());
  axios
    .get(`/api/cars/${carid}`)
    .then(res => {
      dispatch({
        type: GET_CAR,
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

//Delete Ride from Car
export const deleteRideFromCar = (carid, rideid) => dispatch => {
  axios
    .delete(`/api/cars/${carid}/ride/${rideid}`)
    .then(res => {
      dispatch({
        type: GET_CAR,
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

//Delete car
export const deleteCar = (carid, history) => dispatch => {
  if (window.confirm("Tem a certeza que deseja eliminar esta viatura?")) {
    axios
      .delete(`/api/cars/${carid}`)
      .then(res => {
        history.push("/CarList");
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
  }
};

// Set Loading
export const setCarLoading = () => {
  return {
    type: SET_CAR_LOADING
  };
};
