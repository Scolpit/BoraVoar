import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCarById } from "../../actions/carActions";
import { getRidesByDate } from "../../actions/rideActions";

import CarItem from "./CarItem";
import NavBar from "../layout/Navbar";
import CarItemSkeleton from "../skeleton/CarItemSkeleton";
import RideTable from "../ride/RideTable";

export class CarDetails extends Component {
  static propTypes = {
    car: PropTypes.object.isRequired,
    ride: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getCarById: PropTypes.func.isRequired,
    getRidesByDate: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getCarById(
      this.props.match.params.id,
      this.afterCarLoad.bind(this)
    );
  }

  afterCarLoad(date) {
    this.props.getRidesByDate(date);
  }

  render() {
    const { car, carloading } = this.props.car;
    const { rides, rideloading } = this.props.ride;
    const { user } = this.props.auth;

    let carDetails;
    if (car === null || carloading || Object.keys(car).length === 0) {
      carDetails = <CarItemSkeleton editable={true} />;
    } else {
      carDetails = <CarItem car={car} editable={true} />;
    }

    let rideList;
    if (rides === null || rideloading || Object.keys(rides).length === 0) {
      rideList = <div />;
    } else {
      rideList = (
        <RideTable
          rides={rides}
          tableTitle={`Pedidos de boleia para dia ${car.date.substring(0, 10)}`}
          isDetailsPage={true}
          isAdmin={car.user._id === user.id}
        />
      );
    }

    return (
      <div>
        <NavBar activeMenu="CarDetails" />
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="main-header">
                <h4>Viaturas</h4>
              </div>
            </div>
            {carDetails}
            {rideList}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  car: state.car,
  ride: state.ride,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCarById, getRidesByDate }
)(CarDetails);
