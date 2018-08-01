import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCarById } from "../../actions/carActions";

import CarItem from "./CarItem";
import NavBar from "../layout/Navbar";
import CarItemSkeleton from "../skeleton/CarItemSkeleton";
import RideTable from "../ride/RideTable";
import ChatWidget from "../chat/ChatWidget";

export class CarDetails extends Component {
  static propTypes = {
    car: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    getCarById: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getCarById(this.props.match.params.id);
  }

  render() {
    const { car, loading } = this.props.car;
    const { user } = this.props.auth;

    let carDetails;
    if (car === null || loading || Object.keys(car).length === 0) {
      carDetails = <CarItemSkeleton editable={true} />;
    } else {
      carDetails = (
        <div>
          <CarItem car={car} editable={true} />
          <div className="col-xl-6 col-lg-12">
            <ChatWidget chats={car.chat} carid={car._id} />
          </div>
          <div className="margin-0-15">
            <RideTable
              rides={car.ridesByDate}
              tableTitle={`Pedidos de boleia para dia ${car.date.substring(
                0,
                10
              )}`}
              isDetailsPage={true}
              isAdmin={car.user._id === user.id}
            />
          </div>
        </div>
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
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  car: state.car,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCarById }
)(CarDetails);
