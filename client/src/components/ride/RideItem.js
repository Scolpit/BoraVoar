import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { toast } from "react-toastify";

import { addRideToCarByUserId } from "../../actions/carActions";

export class RideItem extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    car: PropTypes.object.isRequired,
    isDetailsPage: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    addRideToCarByUserId: PropTypes.func.isRequired
  };

  inviteToCar() {
    const { car, ride } = this.props;

    this.props.addRideToCarByUserId(car.car._id, ride.user._id);
    toast.success("Piloto adicionado com sucesso");
  }

  render() {
    const { ride, isDetailsPage, isAdmin, auth } = this.props;

    let buttons = <div />;
    if (isDetailsPage && isAdmin) {
      buttons = (
        <button
          type="button"
          className="btn btn-primary waves-effect waves-light"
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
          title="Adicionar à viatura"
        >
          Delete
        </button>
      );
    }

    return (
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
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  car: state.car
});

export default connect(
  mapStateToProps,
  { addRideToCarByUserId }
)(RideItem);
