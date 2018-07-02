import React from "react";
import PropTypes from "prop-types";

const CounterWidgetSkeleton = ({ label, color, icon }) => {
  return (
    <div className="col-lg-6 col-sm-6">
      <div className="col-sm-12 card dashboard-product">
        <span>{label}</span>
        <h2 className="dashboard-total-products counter">&#9646</h2>
        <div className={`side-box ${color}`}>
          <i className={icon} />
        </div>
      </div>
    </div>
  );
};

CounterWidgetSkeleton.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default CounterWidgetSkeleton;
