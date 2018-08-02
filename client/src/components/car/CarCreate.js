import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { carCreate } from "../../actions/carActions";

import NavBar from "../layout/Navbar";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

export class CarCreate extends Component {
  static propTypes = {
    carCreate: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      from: "",
      to: "",
      date: "",
      description: "",
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

    const carData = {
      from: this.state.from,
      to: this.state.to,
      date: this.state.date,
      description: this.state.description
    };

    this.props.carCreate(carData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div>
        <NavBar activeMenu="CarCreate" />
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="main-header">
                <h4>Dar boleias</h4>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-header-text">
                      Viatura de {this.props.auth.user.name}
                    </h5>
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
                      <TextAreaFieldGroup
                        label="Descrição"
                        name="description"
                        placeholder="Ponto de encontro: 8 horas na FPVL"
                        value={this.state.description}
                        error={this.state.errors.description}
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
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { carCreate }
)(withRouter(CarCreate));
