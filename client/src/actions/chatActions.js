import axios from "axios";
import { GET_ERRORS, GET_CAR } from "./types";

//Create Chat to Car
export const addChatToCar = (text, carid) => dispatch => {
  const chatData = {
    text: text
  };
  axios
    .post(`/api/cars/${carid}/chat`, chatData)
    .then(res => {
      dispatch({
        type: GET_CAR,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
