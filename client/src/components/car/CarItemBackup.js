import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import CarItemUser from "./CarItemUser";

import { addRideToCarByName } from "../../actions/carActions";

export class CarItem extends Component {
  static propTypes = {
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    car: PropTypes.object.isRequired,
    editable: PropTypes.bool.isRequired,
    addRideToCarByName: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      username: "teste"
    };

    // this.onDeleteCar = this.onDeleteCar.bind(this);
    // this.onMarkAsFull = this.onMarkAsFull.bind(this);
  }

  onChange(e) {
    console.log(e.target.name);
    console.log(e.target.value);
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    console.log(this.state.username);

    const userData = {
      name: this.state.username
    };

    this.props.addRideToCarByName(this.props.car._id, userData);
  }

  onDeleteCar() {
    console.log("Delete Car");
  }

  onMarkAsFull() {
    console.log("Mark as full");
  }

  render() {
    const { editable, car, auth } = this.props;
    const carOwner = editable && car.user._id === auth.user.id;

    //Bottom buttons
    let carButtons = "";
    if (!editable) {
      carButtons = (
        <Link
          type="link"
          to={`/CarDetails/${car._id}`}
          className="m-l-20 btn btn-primary waves-effect waves-light text-uppercase"
        >
          Detalhes
        </Link>
      );
    }
    if (carOwner) {
      carButtons = (
        <div>
          <button
            type="button"
            onClick={this.onMarkAsFull}
            className="btn btn-success waves-effect waves-light text-uppercase"
          >
            Marcar como {car.full ? "vazio" : "cheio"}
          </button>
          <button
            type="button"
            onClick={this.onDeleteCar}
            className="m-l-20 btn btn-danger waves-effect waves-light text-uppercase"
          >
            Eliminar viatura
          </button>
        </div>
      );
    }

    //UserList
    let rideList;
    if (!editable) {
      rideList = (
        <CarItemUser
          icon="fas fa-users"
          name={`${car.rides.length} pessoa${
            car.rides.length === 1 ? "" : "s"
          }`}
          showDelete={false}
        />
      );
    } else {
      rideList = car.rides.map(ride => (
        <CarItemUser
          key={ride._id}
          icon="fas fa-user"
          name={ride.name}
          showDelete={carOwner}
          carid={car._id}
          rideid={ride._id}
        />
      ));
    }

    return (
      <div
        className={classnames("col-lg-12", {
          "col-xl-6": editable,
          "col-xl-4": !editable
        })}
      >
        <div className="card">
          <div className="user-block-2">
            <img
              className="img-fluid"
              src={car.user.avatar}
              alt="user-header"
            />
            <h5>{car.user.name}</h5>
            <h5>
              <Moment format="DD/MM/YYYY">{car.date}</Moment>
            </h5>
            <div>
              <div className="inline-block">
                <h6>{car.from}</h6>
              </div>
              <div className="inline-block p-l-5 p-r-5">
                <i className="fas fa-arrow-right" />
              </div>
              <div className="inline-block">
                <h6>{car.to}</h6>
              </div>
            </div>
            <div className="padding-20">
              <p className="text-white">{car.description}</p>
            </div>
          </div>

          <div className="card-block">
            {rideList}
            {carOwner && (
              <div className="user-block-2-activities">
                <div className="form-group row">
                  <form onSubmit={this.onSubmit}>
                    <div className="col-sm-8 col-xs-6">
                      <input
                        className="form-control"
                        placeholder="Nuno Morgado"
                        type="text"
                        value={this.state.username}
                        onChange={this.onChange}
                        name="username"
                      />
                    </div>
                    <div className="col-sm-4">
                      <button
                        type="submit"
                        className="btn btn-primary waves-effect waves-light text-uppercase float-right margin-top--2"
                      >
                        Adicionar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            <div className="text-center">{carButtons}</div>
          </div>
        </div>
      </div>
    );
  }
}

CarItem.defaultProps = {
  editable: false
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addRideToCarByName }
)(CarItem);
