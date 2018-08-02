import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { rideCreate } from "../../actions/rideActions";

import NavBar from "../layout/Navbar";
import TextFieldGroup from "../common/TextFieldGroup";

export class RideCreate extends Component {
  static propTypes = {
    rideCreate: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      from: "",
      to: "",
      date: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const rideData = {
      from: this.state.from,
      to: this.state.to,
      date: this.state.date
    };

    this.props.rideCreate(rideData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <NavBar activeMenu="RideCreate" />
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="main-header">
                <h4>Pedir boleia</h4>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-header-text">Informações</h5>
                  </div>
                  <div className="card-block">
                    <form autoComplete="off" onSubmit={this.onSubmit}>
                      <TextFieldGroup
                        label="Origem"
                        name="from"
                        placeholder="Lisboa"
                        value={this.state.from}
                        error={this.state.errors.from}
                        onChange={this.onChange}
                      />
                      <TextFieldGroup
                        label="Destino"
                        name="to"
                        placeholder="Castelo de Vide"
                        value={this.state.to}
                        error={this.state.errors.to}
                        onChange={this.onChange}
                      />
                      <TextFieldGroup
                        label="Data"
                        name="date"
                        type="date"
                        value={this.state.date}
                        error={this.state.errors.date}
                        onChange={this.onChange}
                      />
                      <button
                        type="submit"
                        className="btn btn-success waves-effect waves-light m-r-30"
                      >
                        Submeter
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { rideCreate }
)(withRouter(RideCreate));
