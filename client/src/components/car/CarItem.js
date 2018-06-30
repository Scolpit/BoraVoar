import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";

export class CarItem extends Component {
  static propTypes = {
    errors: PropTypes.object.isRequired,
    car: PropTypes.object.isRequired,
    editable: PropTypes.bool.isRequired
  };

  render() {
    const { editable, car } = this.props;

    return (
      <div
        className={classnames("col-lg-12", {
          "col-xl-6": editable,
          "col-xl-4": !editable
        })}
      >
        <div className="card">
          <div className="user-block-2">
            <img
              className="img-fluid"
              src="assets/images/widget/user-1.png"
              alt="user-header"
            />
            <h5>{car.user.name}</h5>
            <h5>{car.date}</h5>
            <div>
              <div className="inline-block">
                <h6>{car.from}</h6>
              </div>
              <div className="inline-block p-l-5 p-r-5">
                <i className="fas fa-arrow-right" />
              </div>
              <div className="inline-block">
                <h6>{car.to}</h6>
              </div>
            </div>
            <div className="padding-20">
              <p className="text-white">
                O objectio é sair do AKI do montijo por volta das 8 da manhã,
                não se atrasem se não ficam atrás. Depois as despesas são
                repartidas por X e Y para ser mais facil para todos e tal e
                coiso e já não tenho mais imaginação para criar um texto grande
              </p>
            </div>
          </div>

          <div className="card-block">
            <div className="user-block-2-activities">
              <div className="user-block-2-active">
                <i className="fas fa-user" /> Nuno Morgado
                <button
                  type="button"
                  className="btn btn-danger waves-effect waves-light text-uppercase float-right margin-top--9"
                >
                  Eliminar
                </button>
              </div>
            </div>
            <div className="user-block-2-activities">
              <div className="user-block-2-active">
                <i className="fas fa-user" /> José António
                <button
                  type="button"
                  className="btn btn-danger waves-effect waves-light text-uppercase float-right margin-top--9"
                >
                  Eliminar
                </button>
              </div>
            </div>

            <div className="user-block-2-activities">
              <div className="form-group row">
                <div className="col-sm-8 col-xs-6">
                  <input
                    className="form-control"
                    placeholder="Nuno Morgado"
                    type="text"
                    id="example-text-input"
                  />
                </div>
                <div className="col-sm-4">
                  <button
                    type="button"
                    className="btn btn-primary waves-effect waves-light text-uppercase float-right margin-top--2"
                  >
                    Adicionar
                  </button>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                type="button"
                className="btn btn-success waves-effect waves-light text-uppercase"
              >
                Marcar como cheio
              </button>
              <button
                type="button"
                className="m-l-20 btn btn-danger waves-effect waves-light text-uppercase"
              >
                Eliminar viatura
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CarItem.defaultProps = {
  editable: false
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(mapStateToProps)(CarItem);
