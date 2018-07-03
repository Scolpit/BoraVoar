import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import CounterWidget from "../common/CounterWidget";
import NavBar from "../layout/Navbar";
import RideTable from "./RideTable";

import { getRides } from "../../actions/rideActions";

export class RideList extends Component {
  static propTypes = {
    ride: PropTypes.object.isRequired,
    getRides: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.getRides();
  }

  render() {
    const { rides } = this.props.ride;

    return (
      <div>
        <NavBar activeMenu="RideList" />
        <div className="content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="main-header">
                <h4>Viaturas</h4>
              </div>
            </div>
            <div className="row m-b-30 dashboard-header">
              <CounterWidget
                to="CarList"
                label="Viaturas disponiveis"
                counter="9"
                color="bg-warning"
                icon="fas fa-car"
              />
              <CounterWidget
                to="RideList"
                label="Pedidos de boleia"
                counter="12"
                color="bg-primary"
                icon="fas fa-parachute-box"
              />
            </div>

            <RideTable
              rides={rides}
              tableTitle="Pedidos de boleia"
              showButton={true}
            />

            <div className="row">
              <div className="col-xs-12">
                <div className="tab-pane" id="project" role="tabpanel">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-header-text">Pedidos de boleia</h5>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="project-table">
                          <div className="table-responsive">
                            <table className="table">
                              <thead>
                                <tr>
                                  <th className="text-center txt-primary pro-pic" />
                                  <th className="text-center txt-primary">
                                    Nome
                                  </th>
                                  <th className="text-center txt-primary">
                                    Data
                                  </th>
                                  <th className="text-center txt-primary">
                                    Destino
                                  </th>
                                  <th className="text-center txt-primary" />
                                </tr>
                              </thead>
                              <tbody className="text-center">
                                <tr>
                                  <td>
                                    <img
                                      src="/assets/images/widget/user-1.png"
                                      className="img-circle"
                                      alt="tbl"
                                    />
                                  </td>
                                  <td className="bv_verticalmiddle">
                                    Nuno Morgado
                                  </td>
                                  <td className="bv_verticalmiddle">
                                    2018-03-27
                                  </td>
                                  <td className="bv_verticalmiddle">
                                    Lisboa
                                    <i className="fas fa-arrow-right m-l-5 m-r-5" />
                                    Castelo de Vide
                                  </td>
                                  <td className="faq-table-btn bv_verticalmiddle">
                                    <button
                                      type="button"
                                      className="btn btn-primary waves-effect waves-light"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Adicionar à viatura"
                                    >
                                      Convidar
                                    </button>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
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
  ride: state.ride
});

export default connect(
  mapStateToProps,
  { getRides }
)(RideList);
