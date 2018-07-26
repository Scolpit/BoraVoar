import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCars } from "../../actions/carActions";

import NavBar from "../layout/Navbar";
import CounterWidgetCars from "../common/CounterWidgetCars";
import CounterWidgetRides from "../common/CounterWidgetRides";
import CarItem from "./CarItem";
import CarItemSkeleton from "../skeleton/CarItemSkeleton";

export class CarList extends Component {
  static propTypes = {
    getCars: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    car: PropTypes.object.isRequired
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
    const { cars, carLoading } = this.props.car;

    //Car List
    let carList;
    if (cars === null || carLoading) {
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
              <CounterWidgetCars />
              <CounterWidgetRides />
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
  car: state.car
});

export default connect(
  mapStateToProps,
  { getCars }
)(CarList);
