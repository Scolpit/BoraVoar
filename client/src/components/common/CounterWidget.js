import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CounterWidget = ({ to, label, counter, color, icon }) => {
  return (
    <div className="col-lg-6 col-sm-6">
      <Link to={to}>
        <div className="col-sm-12 card dashboard-product">
          <span>{label}</span>
          <h2 className="dashboard-total-products counter">{counter}</h2>
          <div className={`side-box ${color}`}>
            <i className={icon} />
          </div>
        </div>
      </Link>
    </div>
  );
};

CounterWidget.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  counter: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default CounterWidget;
