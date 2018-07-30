import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import NavBar from "../layout/Navbar";
import ProfileAvatar from "./ProfileAvatar";
import ProfileInfo from "./ProfileInfo";
import ProfilePassword from "./ProfilePassword";

export class Profile extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    const { user } = this.props.auth;

    return (
      <div>
        <NavBar activeMenu="Profile" />
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="main-header">
                <h4>Perfíl</h4>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-3 col-lg-4">
                <ProfileAvatar user={user} />
              </div>

              <div className="col-xl-9 col-lg-8">
                {/* Perfil */}
                <ProfileInfo user={user} />
                {/* Alterar Password */}
                <ProfilePassword />
              </div>
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

export default connect(mapStateToProps)(Profile);
