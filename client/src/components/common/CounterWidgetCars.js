import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getCarCount } from "../../actions/carActions";

export class CounterWidgetCars extends Component {
  static propTypes = {
    car: PropTypes.object.isRequired,
    getCarCount: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getCarCount();
  }

  render() {
    const { countLoading, count } = this.props.car;

    let counterDisplay;
    if (countLoading) {
      counterDisplay = (
        <div className="col-lg-6 col-sm-6">
          <div className="col-sm-12 card dashboard-product">
            <span>Viaturas disponiveis</span>
            <h2 className="dashboard-total-products counter">
              <i className="fas fa-spinner fa-spin font-size-28" />
            </h2>
            <div className="side-box bg-warning">
              <i className="fas fa-car" />
            </div>
          </div>
        </div>
      );
    } else {
      counterDisplay = (
        <div className="col-lg-6 col-sm-6">
          <Link to="/CarList">
            <div className="col-sm-12 card dashboard-product">
              <span>Viaturas disponiveis</span>
              <h2 className="dashboard-total-products counter">
                {isNaN(count) ? (
                  <i className="fas fa-spinner fa-spin font-size-28" />
                ) : (
                  count
                )}
              </h2>
              <div className="side-box bg-warning">
                <i className="fas fa-car" />
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
  car: state.car
});

export default connect(
  mapStateToProps,
  { getCarCount }
)(CounterWidgetCars);
