import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteRideFromCar } from "../../actions/carActions";
import isEmpty from "../../validation/is-empty";

export class CarItemUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showUser: true
    };
  }

  static propTypes = {
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    showDelete: PropTypes.bool.isRequired,
    carid: PropTypes.string,
    rideid: PropTypes.string,
    deleteRideFromCar: PropTypes.func.isRequired
  };

  deleteRider(carid, rideid) {
    if (
      window.confirm("Tem a certeza que deseja retirar da lista este piloto?")
    ) {
      this.setState({ showUser: false });
      this.props.deleteRideFromCar(carid, rideid);
    }
  }

  render() {
    const { icon, name, showDelete, carid, rideid } = this.props;

    return (
      <div>
        {this.state.showUser && (
          <div className="user-block-2-activities">
            <div className="user-block-2-active">
              <i className={icon} /> {name}
              {showDelete &&
                !isEmpty(rideid) && (
                  <button
                    type="button"
                    onClick={this.deleteRider.bind(this, carid, rideid)}
                    className="btn btn-danger waves-effect waves-light text-uppercase float-right margin-top--9"
                  >
                    Eliminar
                  </button>
                )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  { deleteRideFromCar }
)(CarItemUser);
