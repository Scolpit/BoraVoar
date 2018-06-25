const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCarInviteRideInput(data) {
  let errors = {};

  data.name = isEmpty(data.name) ? "" : data.name;

  if (!validator.isLength(data.name, { max: 30 })) {
    errors.name = "Limite de 30 caracteres";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Campo obrigatório";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
