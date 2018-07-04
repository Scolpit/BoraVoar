import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import RideItem from "./RideItem";

export class RideTable extends Component {
  static propTypes = {
    rides: PropTypes.array.isRequired,
    isDetailsPage: PropTypes.bool.isRequired,
    isAdmin: PropTypes.bool.isRequired,
    tableTitle: PropTypes.string.isRequired
  };

  render() {
    const { rides, tableTitle, isDetailsPage, isAdmin } = this.props;

    const rideItems = rides.map(ride => (
      <RideItem
        key={ride._id}
        isDetailsPage={isDetailsPage}
        isAdmin={isAdmin}
        ride={ride}
      />
    ));

    return (
      <div className="row">
        <div className="col-xs-12">
          <div className="tab-pane" id="project" role="tabpanel">
            <div className="card">
              <div className="card-header">
                <h5 className="card-header-text">{tableTitle}</h5>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <div className="project-table">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="text-center txt-primary pro-pic" />
                            <th className="text-center txt-primary">Nome</th>
                            <th className="text-center txt-primary">Data</th>
                            <th className="text-center txt-primary">Destino</th>
                            <th className="text-center txt-primary" />
                          </tr>
                        </thead>
                        <tbody className="text-center">{rideItems}</tbody>
                      </table>
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

export default connect(mapStateToProps)(RideTable);
