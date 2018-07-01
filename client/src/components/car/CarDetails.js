import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCarById } from "../../actions/carActions";

import CarItem from "./CarItem";
import NavBar from "../layout/Navbar";

export class CarDetails extends Component {
  static propTypes = {
    car: PropTypes.object.isRequired,
    common: PropTypes.object.isRequired,
    getCarById: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getCarById(this.props.match.params.id);
  }

  render() {
    const { car } = this.props.car;
    const { loading } = this.props.common;

    let carDetails;
    if (car === null || loading || Object.keys(car).length === 0) {
      carDetails = <div />;
    } else {
      carDetails = <CarItem car={car} editable={true} />;
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
  common: state.common
});

export default connect(
  mapStateToProps,
  { getCarById }
)(CarDetails);
