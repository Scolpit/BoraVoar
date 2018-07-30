import axios from "axios";
import { toast } from "react-toastify";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//Change profile info
export const changeProfileInfo = name => dispatch => {
  const userData = {
    name: name
  };

  axios
    .post("api/users/changename", userData)
    .then(res => {
      toast.success("Perfíl atualizado");
      dispatch({
        type: SET_CURRENT_USER,
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

//Change password
export const changePassword = (
  oldpassword,
  newpassword,
  newpassword2
) => dispatch => {
  const userData = {
    oldpassword: oldpassword,
    newpassword: newpassword,
    newpassword2: newpassword2
  };

  axios
    .post("api/users/changepassword", userData)
    .then(res => {
      toast.success("Password alterada com sucesso");
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};
