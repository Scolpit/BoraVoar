const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = isEmpty(data.email) ? "" : data.email;
  data.password = isEmpty(data.password) ? "" : data.password;

  // Email validations
  if (!validator.isEmail(data.email)) {
    errors.email = "Email inválido";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Campo obrigatório";
  }

  // Password validation
  if (validator.isEmpty(data.password)) {
    errors.password = "Campo obrigatório";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
