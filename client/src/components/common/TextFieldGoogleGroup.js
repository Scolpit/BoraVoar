import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const TextFieldGoogleGroup = ({
  name,
  value,
  error,
  type,
  label,
  onChange,
  disabled
}) => {
  return (
    <div>
      <div className="md-input-wrapper">
        <input
          type={type}
          className={classnames("md-form-control", {
            "md-valid": value
          })}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        <label>{label}</label>
      </div>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

TextFieldGoogleGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

TextFieldGoogleGroup.defaultProps = {
  type: "text"
};

export default TextFieldGoogleGroup;
