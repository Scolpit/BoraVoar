import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextAreaFieldGroup = ({
  name,
  label,
  placeholder,
  value,
  error,
  info,
  rows,
  onChange
}) => {
  return (
    <div className="form-group">
      <label htmlFor={value} className="form-control-label">
        {label}
      </label>
      <textarea
        className={classnames("form-control", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        htmlFor={value}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback p-t-20">{error}</div>}
      {info && <small className="form-text text-muted">{info}</small>}
    </div>
  );
};

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  rows: PropTypes.number,
  error: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

TextAreaFieldGroup.defaultProps = {
  rows: 6
};

export default TextAreaFieldGroup;
