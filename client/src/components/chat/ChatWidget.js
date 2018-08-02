import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";

import ChatItem from "./ChatItem";
import { addChatToCar } from "../../actions/chatActions";

export class ChatWidget extends Component {
  static propTypes = {
    chats: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired,
    addChatToCar: PropTypes.func.isRequired,
    carid: PropTypes.string.isRequired
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

  // componentDidUpdate() {
  //   this.el.scrollIntoView({ behavior: "smooth" });
  // }

  onSubmit(e) {
    e.preventDefault();
    this.props.addChatToCar(this.state.text, this.props.carid);
    this.setState({ text: "" });
    this.el.scrollIntoView({ behavior: "smooth" });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { carid } = this.props;

    const chatList = this.props.chats.map(chat => (
      <ChatItem key={chat._id} chat={chat} carid={carid} />
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
)(ChatWidget);
