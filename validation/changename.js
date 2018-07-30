const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateChangeNameInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";

  // Name validation
  if (!Validator.isLength(data.name, { min: 4, max: 30 })) {
    errors.name = "Nome deve ter no mínimo 4 caracteres (max:30)";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Campo obrigatório";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
