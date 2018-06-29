import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export class Navbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    common: PropTypes.object.isRequired
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div className="boravoar_navbar">
        <div className="loader-bg">
          <div className="loader-bar" />
        </div>
        <div className="wrapper">
          <div className="main-header-top hidden-print">
            <Link to="/" className="logo">
              <b>B</b>ora
              <b>V</b>oar
            </Link>
            <div className="navbar navbar-static-top">
              <a data-toggle="offcanvas" className="sidebar-toggle">
                <i className="fas fa-bars three-bars" />
              </a>

              <div className="navbar-custom-menu f-right">
                <ul className="top-nav">
                  <li className="pc-rheader-submenu">
                    <a
                      className="drop icon-circle"
                      onClick="javascript:toggleFullScreen()"
                    >
                      <i className="fas fa-expand-arrows-alt" />
                    </a>
                  </li>

                  <li className="dropdown">
                    <a
                      href="#!"
                      data-toggle="dropdown"
                      role="button"
                      aria-haspopup="true"
                      aria-expanded="false"
                      className="dropdown-toggle drop icon-circle drop-image"
                    >
                      <span>
                        <img
                          className="img-circle "
                          src="assets/images/avatar-1.png"
                          style={{ width: "40px" }}
                          alt="User Image"
                        />
                      </span>
                      <span>
                        John
                        <b>Doei</b>
                        <i className="fas fa-angle-down" />
                      </span>
                    </a>
                    <ul className="dropdown-menu settings-menu">
                      <li>
                        <a href="profile.html">
                          <i className="fas fa-user" /> Profile
                        </a>
                      </li>
                      <li>
                        <a href="#!">
                          <i className="fas fa-power-off" /> Logout
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="main-sidebar hidden-print ">
            <div className="sidebar" id="sidebar-scroll">
              <div className="user-panel">
                <div className="f-left image">
                  <img
                    src="assets/images/avatar-1.png"
                    alt="User Image"
                    className="img-circle"
                  />
                </div>
                <div className="f-left info">
                  <p>John Doe</p>
                </div>
              </div>

              <ul className="sidebar-menu">
                <li className="nav-level">Menu</li>
                <li className="active treeview">
                  <a className="waves-effect waves-dark" href="CarList.html">
                    <i className="fas fa-car" />
                    <span> Viaturas</span>
                  </a>
                </li>
                <li className="treeview">
                  <a className="waves-effect waves-dark" href="RideList.html">
                    <i className="fas fa-parachute-box" />
                    <span> Pedidos</span>
                  </a>
                </li>
                <li className="nav-level">Criar</li>
                <li className="active treeview">
                  <a className="waves-effect waves-dark" href="CarCreate.html">
                    <i className="fas fa-car" />
                    <span> Criar Viatura</span>
                  </a>
                </li>
                <li className="treeview">
                  <a className="waves-effect waves-dark" href="RideCreate.html">
                    <i className="fas fa-parachute-box" />
                    <span> Pedir boleia</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  common: state.common
});

export default connect(mapStateToProps)(Navbar);
