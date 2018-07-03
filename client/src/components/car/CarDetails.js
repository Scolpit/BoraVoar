import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCarById } from "../../actions/carActions";

import CarItem from "./CarItem";
import NavBar from "../layout/Navbar";
import CarItemSkeleton from "../skeleton/CarItemSkeleton";

export class CarDetails extends Component {
  static propTypes = {
    car: PropTypes.object.isRequired,
    getCarById: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getCarById(this.props.match.params.id);
  }

  render() {
    const { car, loading } = this.props.car;

    let carDetails;
    if (car === null || loading || Object.keys(car).length === 0) {
      carDetails = <CarItemSkeleton editable={true} />;
    } else {
      // carDetails = <CarItem car={car} editable={true} />;
      carDetails = <CarItemSkeleton editable={true} />;
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
  car: state.car
});

export default connect(
  mapStateToProps,
  { getCarById }
)(CarDetails);
