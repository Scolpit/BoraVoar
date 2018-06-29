import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NavBar from "../layout/Navbar";

export class CarList extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };

  render() {
    return (
      <div>
        <NavBar activeMenu="CarList" />
        <div class="content-wrapper">
          <div class="container-fluid">
            <div class="row">
              <div class="main-header">
                <h4>Viaturas</h4>
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

export default connect(mapStateToProps)(CarList);
