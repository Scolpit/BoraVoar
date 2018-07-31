import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";

import ChatItem from "./ChatItem";

export class ChatWidget extends Component {
  static propTypes = {
    chats: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      text: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    //this.props.changeProfileInfo(this.state.name);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const chatList = this.props.chats.map(chat => (
      <ChatItem key={chat._id} chat={chat} user={this.props.auth.user} />
    ));

    return (
      <div className="card">
        <div className="media chat-inner-header">Chat</div>
        {chatList}
        <div className="media chat-messages padding-20">
          <div className="md-input-wrapper">
            <form>
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
                type="button"
                className="chat-send waves-effect waves-light"
              >
                <i className="fas fa-paper-plane" />
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ChatWidget);
