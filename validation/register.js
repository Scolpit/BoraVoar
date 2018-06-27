const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Name validation
  if (!Validator.isLength(data.name, { min: 4, max: 30 })) {
    errors.name = "Nome deve ter no mínimo 4 caracteres (max:30)";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Campo obrigatório";
  }

  // Email validation
  if (Validator.isEmpty(data.email)) {
    errors.email = "Campo obrigatório";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Email inválido";
  }

  //Password validation
  if (Validator.isEmpty(data.password)) {
    errors.password = "Campo obrigatório";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password deve ter no mínimo 6 caracteres (max:30)";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Campo obrigatório";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Password não corresponde";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
