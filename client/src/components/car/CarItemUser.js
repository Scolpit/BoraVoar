import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteRideFromCar } from "../../actions/carActions";
import isEmpty from "../../validation/is-empty";
import { toast } from "react-toastify";

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
      toast.warning("Piloto removido");
    }
  }

  render() {
    const { icon, name, showDelete, carid, rideid } = this.props;

    let deleteButton;
    if (showDelete) {
      if (!isEmpty(rideid)) {
        deleteButton = (
          <button
            type="button"
            onClick={this.deleteRider.bind(this, carid, rideid)}
            className="btn btn-danger waves-effect waves-light text-uppercase float-right margin-top--9"
          >
            Eliminar
          </button>
        );
      } else {
        deleteButton = (
          <button
            type="button"
            disabled
            className="btn btn-danger waves-effect waves-light text-uppercase float-right margin-top--9"
          >
            <i class="fas fa-spinner fa-spin" /> Eliminar
          </button>
        );
      }
    } else {
      deleteButton = <div />;
    }

    return (
      <div>
        {this.state.showUser && (
          <div className="user-block-2-activities">
            <div className="user-block-2-active">
              <i className={icon} /> {name}
              {deleteButton}
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
