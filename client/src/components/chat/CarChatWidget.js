import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";

import CarChatItem from "./CarChatItem";
import { addChatToCar } from "../../actions/chatActions";

export class CarChatWidget extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    addChatToCar: PropTypes.func.isRequired,
    car: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.el.scrollIntoView({ behavior: "smooth", block: "end" });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.addChatToCar(this.state.text, this.props.car._id);
    this.setState({ text: "" });
    this.el.scrollIntoView({ behavior: "smooth" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { car } = this.props;
    const { user } = this.props.auth;

    const chatList = car.chat.map(chat => (
      <CarChatItem
        key={chat._id}
        chat={chat}
        carid={car._id}
        isAdmin={car.user._id === user.id}
      />
    ));

    return (
      <div className="card">
        <div className="media chat-inner-header">Chat</div>
        <div className="chat-items-group scrollbar">
          {chatList}
          <div
            ref={el => {
              this.el = el;
            }}
          />
        </div>
        <div className="media chat-messages padding-20 m-t-20">
          <form autoComplete="off" noValidate onSubmit={this.onSubmit}>
            <div className="md-input-wrapper">
              <input
                type="text"
                className={classnames("md-form-control", {
                  "md-valid": this.state.text
                })}
                id="text"
                name="text"
                value={this.state.text}
                onChange={this.onChange}
              />
              <label>Insira um comentário</label>
              <span className="highlight" />
              <span className="bar" />

              <button
                type="submit"
                className="chat-send waves-effect waves-light"
              >
                <i className="fas fa-paper-plane" />
              </button>
            </div>
          </form>
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
  { addChatToCar }
)(CarChatWidget);
