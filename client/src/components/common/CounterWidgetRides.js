import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getRideCount } from "../../actions/rideActions";

export class CounterWidgetRides extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    getRideCount: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getRideCount();
  }

  render() {
    const { countLoading, count } = this.props.ride;

    let counterDisplay;
    if (countLoading) {
      counterDisplay = (
        <div className="col-lg-6 col-sm-6">
          <div className="col-sm-12 card dashboard-product">
            <span>Pedidos de boleia</span>
            <h2 className="dashboard-total-products counter">
              <i className="fas fa-spinner fa-spin font-size-28" />
            </h2>
            <div className="side-box bg-primary">
              <i className="fas fa-parachute-box" />
            </div>
          </div>
        </div>
      );
    } else {
      counterDisplay = (
        <div className="col-lg-6 col-sm-6">
          <Link to="/RideList">
            <div className="col-sm-12 card dashboard-product">
              <span>Pedidos de boleia</span>
              <h2 className="dashboard-total-products counter">
                {isNaN(count) ? (
                  <i className="fas fa-spinner fa-spin font-size-28" />
                ) : (
                  count
                )}
              </h2>
              <div className="side-box bg-primary">
                <i className="fas fa-parachute-box" />
              </div>
            </div>
          </Link>
        </div>
      );
    }

    return <div>{counterDisplay}</div>;
  }
}

const mapStateToProps = state => ({
  ride: state.ride
});

export default connect(
  mapStateToProps,
  { getRideCount }
)(CounterWidgetRides);
