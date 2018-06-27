const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateChangePasswordInput(data) {
  let errors = {};

  data.oldpassword = !isEmpty(data.oldpassword) ? data.oldpassword : "";
  data.newpassword = !isEmpty(data.newpassword) ? data.newpassword : "";
  data.newpassword2 = !isEmpty(data.newpassword2) ? data.newpassword2 : "";

  //Password validation
  if (Validator.isEmpty(data.oldpassword)) {
    errors.oldpassword = "Campo obrigatório";
  }

  if (Validator.isEmpty(data.newpassword)) {
    errors.newpassword = "Campo obrigatório";
  }

  if (!Validator.isLength(data.newpassword, { min: 6, max: 30 })) {
    errors.newpassword =
      "Nova password deve ter no mínimo 6 caracteres (max:30)";
  }

  if (Validator.isEmpty(data.newpassword2)) {
    errors.newpassword2 = "Campo obrigatório";
  }

  if (!Validator.equals(data.newpassword, data.newpassword2)) {
    errors.newpassword2 = "Nova password deve corresponder";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
