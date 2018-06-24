const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCarInput(data) {
  let errors = {};

  data.from = isEmpty(data.from) ? "" : data.from;
  data.to = isEmpty(data.to) ? "" : data.to;
  data.date = isEmpty(data.date) ? "" : data.date;
  data.description = isEmpty(data.description) ? "" : data.description;

  if (!validator.isLength(data.from, { max: 30 })) {
    errors.from = "Limite de 30 caracteres";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "Campo obrigatório";
  }

  if (!validator.isLength(data.to, { max: 30 })) {
    errors.to = "Limite de 30 caracteres";
  }

  if (validator.isEmpty(data.to)) {
    errors.to = "Campo obrigatório";
  }

  if (validator.isEmpty(data.date)) {
    errors.date = "Campo obrigatório";
  }

  if (!validator.isLength(data.description, { min: 10, max: 2000 })) {
    errors.description = "Descrição entre 10 e 2000 caracteres";
  }

  if (validator.isEmpty(data.description)) {
    errors.description = "Campo obrigatório";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
