import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { changePassword } from "../../actions/profileActions";
import TextFieldGroup from "../common/TextFieldGroup";

export class ProfilePassword extends Component {
  static propTypes = {
    changePassword: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      oldpassword: "",
      newpassword: "",
      newpassword2: "",
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

    const { oldpassword, newpassword, newpassword2 } = this.state;
    this.props.changePassword(oldpassword, newpassword, newpassword2);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <h5 className="card-header-text">Alterar Password</h5>
        </div>
        <div className="card-block">
          <form noValidate onSubmit={this.onSubmit}>
            <TextFieldGroup
              label="Password atual"
              type="password"
              name="oldpassword"
              value={this.state.oldpassword}
              error={this.state.errors.oldpassword}
              onChange={this.onChange}
            />
            <TextFieldGroup
              label="Nova Password"
              type="password"
              name="newpassword"
              value={this.state.newpassword}
              error={this.state.errors.newpassword}
              onChange={this.onChange}
            />
            <TextFieldGroup
              label="Confirmação da nova Password"
              type="password"
              name="newpassword2"
              value={this.state.newpassword2}
              error={this.state.errors.newpassword2}
              onChange={this.onChange}
            />

            <button
              type="submit"
              className="btn btn-success waves-effect waves-light m-r-30"
            >
              Alterar Password
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
  { changePassword }
)(ProfilePassword);
