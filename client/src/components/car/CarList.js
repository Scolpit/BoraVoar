import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCars } from "../../actions/carActions";

import NavBar from "../layout/Navbar";
import CounterWidget from "../common/CounterWidget";
import CarItem from "./CarItem";
import CarItemSkeleton from "../skeleton/CarItemSkeleton";

export class CarList extends Component {
  static propTypes = {
    getCars: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    car: PropTypes.object.isRequired,
    common: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getCars();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { cars } = this.props.car;
    const { loading } = this.props.common;

    let carList;
    if (cars === null || loading) {
      carList = (
        <div>
          <CarItemSkeleton key="s1" editable={false} />
          <CarItemSkeleton key="s2" editable={false} />
          <CarItemSkeleton key="s3" editable={false} />
        </div>
      );
    } else {
      carList = cars.map(car => (
        <CarItem key={car._id} car={car} editable={false} />
      ));
    }

    return (
      <div>
        <NavBar activeMenu="CarList" />
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="main-header">
                <h4>Viaturas</h4>
              </div>
            </div>

            <div className="row m-b-30 dashboard-header">
              <CounterWidget
                to="CarList"
                label="Viaturas disponiveis"
                counter="9"
                color="bg-warning"
                icon="fas fa-car"
              />
              <CounterWidget
                to="RideList"
                label="Pedidos de boleia"
                counter="12"
                color="bg-primary"
                icon="fas fa-parachute-box"
              />
            </div>
            {carList}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  car: state.car,
  common: state.common
});

export default connect(
  mapStateToProps,
  { getCars }
)(CarList);
