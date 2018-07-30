import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TextFieldGroup from "../common/TextFieldGroup";
import { changeProfileInfo } from "../../actions/profileActions";

export class ProfileInfo extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    changeProfileInfo: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      name: this.props.user.name,
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
    this.props.changeProfileInfo(this.state.name);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="card-header-text">Perfíl</h5>
        </div>
        <div className="card-block">
          <form noValidate onSubmit={this.onSubmit}>
            <TextFieldGroup
              label="Nome"
              name="name"
              value={this.state.name}
              error={this.state.errors.name}
              onChange={this.onChange}
            />
            <button
              type="submit"
              className="btn btn-success waves-effect waves-light m-r-30"
            >
              Guardar Alterações
            </button>
          </form>
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
  { changeProfileInfo }
)(ProfileInfo);
