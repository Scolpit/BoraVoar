import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import classnames from "classnames";

import { addRideToCarByRideId } from "../../actions/carActions";
import { deleteRide } from "../../actions/rideActions";

export class RideItem extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    car: PropTypes.object.isRequired,
    isDetailsPage: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    addRideToCarByRideId: PropTypes.func.isRequired,
    deleteRide: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      showRide: true
    };
  }

  inviteToCar() {
    const { car, ride } = this.props;
    if (ride.used) {
      if (
        window.confirm(
          "Este piloto já foi adicionado anteriormente para uma viatura. Quer adicionar na mesma?"
        )
      ) {
        this.props.addRideToCarByRideId(car.car._id, ride._id);
      }
    } else {
      this.props.addRideToCarByRideId(car.car._id, ride._id);
    }
  }

  btnDeleteRide() {
    const { ride } = this.props;
    if (this.props.deleteRide(ride._id)) {
      this.setState({ showRide: false });
    }
  }

  render() {
    const { ride, isDetailsPage, isAdmin, auth } = this.props;

    let buttons = <div />;
    if (isDetailsPage && isAdmin) {
      buttons = (
        <button
          type="button"
          className={classnames("btn waves-effect waves-light", {
            "btn-warning": ride.used,
            "btn-primary": !ride.used
          })}
          data-toggle="tooltip"
          data-placement="top"
          title="Convidar"
          onClick={this.inviteToCar.bind(this)}
        >
          Convidar
        </button>
      );
    }
    if (!isDetailsPage && ride.user._id === auth.user.id) {
      buttons = (
        <button
          type="button"
          className="btn btn-danger waves-effect waves-light"
          data-toggle="tooltip"
          data-placement="top"
          title="Eliminar"
          onClick={this.btnDeleteRide.bind(this)}
        >
          Eliminar
        </button>
      );
    }

    return (
      this.state.showRide && (
        <tr>
          <td>
            <img src={ride.user.avatar} className="img-circle" alt="tbl" />
          </td>
          <td className="bv_verticalmiddle">{ride.user.name}</td>
          <td className="bv_verticalmiddle">
            <Moment format="DD/MM/YYYY">{ride.date}</Moment>
          </td>

          <td className="bv_verticalmiddle">
            {ride.from}
            <i className="fas fa-arrow-right m-l-5 m-r-5" />
            {ride.to}
          </td>

          <td className="faq-table-btn bv_verticalmiddle">{buttons}</td>
        </tr>
      )
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  car: state.car
});

export default connect(
  mapStateToProps,
  { addRideToCarByRideId, deleteRide }
)(RideItem);
