import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Login extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }

  render() {
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
                  <form>
                    <div className="md-input-wrapper">
                      <input
                        type="email"
                        className="md-form-control md-valid"
                      />
                      <label>Email</label>
                    </div>
                    <div className="md-input-wrapper">
                      <input type="password" className="md-form-control" />
                      <label>Password</label>
                    </div>
                    <div className="row">
                      <div className="col-xs-10 offset-xs-1">
                        <button
                          type="button"
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
                      <a href="Register.html" className="f-w-600 p-l-5">
                        Registe-se
                      </a>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-10 offset-xs-1">
                      <button
                        type="button"
                        className="btn btn-success btn-md btn-block waves-effect text-center m-b-20"
                      >
                        Entrar como convidado
                      </button>
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

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(Login);
