import axios from "axios";
import { toast } from "react-toastify";
import {
  GET_ERRORS,
  GET_CARS,
  GET_CAR,
  SET_CAR_LOADING,
  SET_CAR_COUNT_LOADING,
  GET_CAR_COUNT
} from "./types";

//Create Car
export const carCreate = (carData, history) => dispatch => {
  axios
    .post("/api/cars", carData)
    .then(res => {
      toast.success("Viatura criada");
      history.push("/CarList");
    })
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
      toast.error(err.response.data.error);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

//Add ride to car by Rideid
export const addRideToCarByRideId = (carid, rideid) => dispatch => {
  axios
    .post(`/api/cars/${carid}/ride/${rideid}`)
    .then(res => {
      toast.success("Piloto adicionado com sucesso");
      dispatch({
        type: GET_CAR,
        payload: res.data
      });
    })
    .catch(err => {
      toast.error(err.response.data.error);
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

//Get Car Count
export const getCarCount = () => dispatch => {
  dispatch(setCarCountLoading());
  axios
    .get("/api/cars/count/count")
    .then(res => {
      dispatch({
        type: GET_CAR_COUNT,
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
  if (window.confirm("Tem a certeza que deseja retirar o piloto da lista?")) {
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
    return true;
  } else {
    return false;
  }
};

//Delete car
export const deleteCar = (carid, history) => dispatch => {
  if (window.confirm("Tem a certeza que deseja eliminar esta viatura?")) {
    axios
      .delete(`/api/cars/${carid}`)
      .then(res => {
        toast.warning("Viatura eliminada");
        history.push("/CarList");
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      );
    return true;
  } else {
    return false;
  }
};

// Set Loading
export const setCarLoading = () => {
  return {
    type: SET_CAR_LOADING
  };
};

// Set Count Loading
export const setCarCountLoading = () => {
  return {
    type: SET_CAR_COUNT_LOADING
  };
};
