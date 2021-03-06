import axios from "axios";
import {
  GET_ERRORS,
  GET_RIDES,
  SET_RIDE_LOADING,
  GET_RIDE_COUNT,
  SET_RIDE_COUNT_LOADING
} from "./types";
import { toast } from "react-toastify";

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

//Get Ride Count
export const getRideCount = () => dispatch => {
  dispatch(setRideCountLoading());
  axios
    .get("/api/rides/count/count")
    .then(res => {
      dispatch({
        type: GET_RIDE_COUNT,
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
    .then(res => {
      toast.success("Pedido de boleia criado");
      history.push("/RideList");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Delete ride by id
export const deleteRide = id => dispatch => {
  if (window.confirm("Tem a certeza que deseja eliminar este pedido?")) {
    axios
      .delete(`/api/rides/${id}`)
      .then(res => {
        toast.warning("Pedido de boleia eliminado");
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
    return true;
  } else {
    return false;
  }
};

// Set Loading
export const setRideLoading = () => {
  return {
    type: SET_RIDE_LOADING
  };
};

// Set Count Loading
export const setRideCountLoading = () => {
  return {
    type: SET_RIDE_COUNT_LOADING
  };
};
