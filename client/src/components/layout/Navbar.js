import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";

export class Navbar extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
    //activeMenu: PropTypes.string.isRequired
  };

  toggleMenu() {
    document.body.classList.toggle("sidebar-collapse");
    document.body.classList.toggle("header-fixed");
    document.body.classList.toggle("sidebar-open");
  }

  toggleFullScreen() {
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement
      ? document.cancelFullScreen
        ? document.cancelFullScreen()
        : document.mozCancelFullScreen
          ? document.mozCancelFullScreen()
          : document.webkitCancelFullScreen && document.webkitCancelFullScreen()
      : document.documentElement.requestFullscreen
        ? document.documentElement.requestFullscreen()
        : document.documentElement.mozRequestFullScreen
          ? document.documentElement.mozRequestFullScreen()
          : document.documentElement.webkitRequestFullscreen &&
            document.documentElement.webkitRequestFullscreen(
              Element.ALLOW_KEYBOARD_INPUT
            );
  }

  render() {
    const { user } = this.props.auth;
    const { activeMenu } = this.props;

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
              <a
                onClick={this.toggleMenu.bind(this)}
                data-toggle="offcanvas"
                className="sidebar-toggle"
              >
                <i className="fas fa-bars three-bars" />
              </a>

              <div className="navbar-custom-menu f-right">
                <ul className="top-nav">
                  <li className="pc-rheader-submenu">
                    <a
                      className="drop icon-circle bv_fullscreen"
                      onClick={this.toggleFullScreen.bind(this)}
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
                          alt=""
                        />
                      </span>
                      <span>
                        <span class="p-l-10 p-r-10">John Doei</span>
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
                    className="img-circle"
                    alt=""
                  />
                </div>
                <div className="f-left info">
                  <p>John Doe</p>
                </div>
              </div>

              <ul className="sidebar-menu">
                <li className="nav-level">Menu</li>
                <li
                  className={classnames("treeview", {
                    active: activeMenu == "CarList"
                  })}
                >
                  <Link className="waves-effect waves-dark" to="CarList">
                    <i className="fas fa-car" />
                    <span> Viaturas</span>
                  </Link>
                </li>
                <li
                  className={classnames("treeview", {
                    active: activeMenu == "RideList"
                  })}
                >
                  <Link className="waves-effect waves-dark" to="RideList">
                    <i className="fas fa-parachute-box" />
                    <span> Pedidos</span>
                  </Link>
                </li>
                <li className="nav-level">Criar</li>
                <li
                  className={classnames("treeview", {
                    active: activeMenu == "CarCreate"
                  })}
                >
                  <Link className="waves-effect waves-dark" to="CarCreate">
                    <i className="fas fa-car" />
                    <span> Criar Viatura</span>
                  </Link>
                </li>
                <li
                  className={classnames("treeview", {
                    active: activeMenu == "RideCreate"
                  })}
                >
                  <Link className="waves-effect waves-dark" to="RideCreate">
                    <i className="fas fa-parachute-box" />
                    <span> Pedir boleia</span>
                  </Link>
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
  auth: state.auth
});

export default connect(mapStateToProps)(Navbar);
