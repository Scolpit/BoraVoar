import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import TextFieldGoogleGroup from "../common/TextFieldGoogleGroup";
import { Link } from "react-router-dom";

export class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/CarList");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/CarList");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  static propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="login p-fixed d-flex text-center bg-primary common-img-bg">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="login-card card-block">
                <div className="md-float-material">
                  <div className="text-center login-title">
                    <b>B</b>ora
                    <b>V</b>oar
                  </div>
                  <h3 className="text-center txt-primary">Login</h3>
                  <form noValidate onSubmit={this.onSubmit}>
                    <TextFieldGoogleGroup
                      label="Email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.email}
                    />
                    <TextFieldGoogleGroup
                      label="Password"
                      name="password"
                      type="password"
                      value={this.state.password}
                      onChange={this.onChange}
                      error={errors.password}
                    />

                    <div className="row">
                      <div className="col-xs-10 offset-xs-1">
                        <button
                          type="submit"
                          className="btn btn-primary btn-md btn-block waves-effect text-center m-b-20"
                        >
                          LOGIN
                        </button>
                      </div>
                    </div>
                  </form>

                  <div className="row">
                    <div className="col-sm-12 col-xs-12 text-center m-b-20">
                      <span className="text-muted">Não tem conta?</span>
                      <Link to="/Register" className="f-w-600 p-l-5">
                        Registe-se
                      </Link>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-10 offset-xs-1">
                      <Link
                        to="/CarList"
                        type="button"
                        className="btn btn-success btn-md btn-block waves-effect text-center m-b-20"
                      >
                        Entrar como convidado
                      </Link>
                    </div>
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
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
