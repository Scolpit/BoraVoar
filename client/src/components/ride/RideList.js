import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CounterWidget from "../common/CounterWidget";
import CounterWidgetCars from "../common/CounterWidgetCars";
import NavBar from "../layout/Navbar";
import RideTable from "./RideTable";

import { getRides } from "../../actions/rideActions";

export class RideList extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    getRides: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getRides();
  }

  render() {
    const { rides } = this.props.ride;

    return (
      <div>
        <NavBar activeMenu="RideList" />
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="main-header">
                <h4>Viaturas</h4>
              </div>
            </div>
            <div className="row m-b-30 dashboard-header">
              <CounterWidgetCars />
              <CounterWidget
                to="RideList"
                label="Pedidos de boleia"
                counter="12"
                color="bg-primary"
                icon="fas fa-parachute-box"
              />
            </div>

            <RideTable
              rides={rides}
              tableTitle="Pedidos de boleia"
              isDetailsPage={false}
              isAdmin={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ride: state.ride
});

export default connect(
  mapStateToProps,
  { getRides }
)(RideList);
