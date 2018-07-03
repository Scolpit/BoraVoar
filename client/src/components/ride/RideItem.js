import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";

export class RideItem extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    showButton: PropTypes.bool.isRequired
  };

  render() {
    const { ride, showButton } = this.props;

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
        {showButton && (
          <td className="faq-table-btn bv_verticalmiddle">
            <button
              type="button"
              className="btn btn-primary waves-effect waves-light"
              data-toggle="tooltip"
              data-placement="top"
              title="Adicionar à viatura"
            >
              Convidar
            </button>
          </td>
        )}
      </tr>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(RideItem);
