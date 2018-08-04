import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authActions";

import MenuItem from "./MenuItem";

export class Navbar extends Component {
  static propTypes = {
    logoutUser: PropTypes.func.isRequired,
    activeMenu: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
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

  logoutUser() {
    this.props.logoutUser();
  }

  render() {
    const { user, isAuthenticated } = this.props.auth;
    const { activeMenu } = this.props;

    const userName = isAuthenticated ? user.name : "Convidado";
    const avatar = isAuthenticated
      ? user.avatar
      : "/assets/images/widget/user-1.png";

    const subMenuItems = isAuthenticated ? (
      <div>
        <li>
          <Link to="/Profile">
            <i className="fas fa-user" /> Perfil
          </Link>
        </li>
        <li>
          <a onClick={this.logoutUser.bind(this)}>
            <i className="fas fa-power-off" /> Logout
          </a>
        </li>
      </div>
    ) : (
      <div>
        <li>
          <Link to="/">
            <i className="fas fa-user" /> Login
          </Link>
        </li>
        <li>
          <Link to="/Register">
            <i className="fas fa-sign-in-alt" /> Register
          </Link>
        </li>
      </div>
    );

    return (
      <div className="boravoar_navbar">
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
                          src={avatar}
                          style={{ width: "40px" }}
                          alt=""
                        />
                      </span>
                      <span>
                        <span className="p-l-10 p-r-10">{userName}</span>
                        <i className="fas fa-angle-down" />
                      </span>
                    </a>
                    <ul className="dropdown-menu settings-menu">
                      {subMenuItems}
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
                  <img src={avatar} className="img-circle" alt="" />
                </div>
                <div className="f-left info">
                  <p>{userName}</p>
                </div>
              </div>

              <ul className="sidebar-menu">
                <li className="nav-level">Menu</li>

                <MenuItem
                  to="CarList"
                  name="Viaturas"
                  icon="fas fa-car"
                  activeMenu={activeMenu}
                />
                <MenuItem
                  to="RideList"
                  name="Pedidos"
                  icon="fas fa-parachute-box"
                  activeMenu={activeMenu}
                />
                <MenuItem
                  to="Chat"
                  name="Chat"
                  icon="fas fa-comments"
                  activeMenu={activeMenu}
                />
                <li className="nav-level">Criar</li>
                <MenuItem
                  to="CarCreate"
                  name="Criar Viatura"
                  icon="fas fa-car"
                  activeMenu={activeMenu}
                />
                <MenuItem
                  to="RideCreate"
                  name="Pedir boleia"
                  icon="fas fa-parachute-box"
                  activeMenu={activeMenu}
                />
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

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
