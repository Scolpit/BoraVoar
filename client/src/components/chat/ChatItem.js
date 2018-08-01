import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ago } from "time-ago";

export class ChatItem extends Component {
  static propTypes = {
    chat: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };

  render() {
    const { user, isAuthenticated } = this.props.auth;
    const { chat } = this.props;
    //var ta = require("./time-ago.js");

    let chatitem;
    if (isAuthenticated && chat.user._id === user.id) {
      chatitem = (
        <div>
          <div className="media-body chat-menu-reply">
            <div>
              <p className="chat-cont chat_user_name">{chat.user.name}</p>
              <p className="chat-cont">{chat.text}</p>
              <p className="chat-time">{ago(chat.date)}</p>
            </div>
          </div>
          <div className="media-right photo-table">
            <img
              className="media-object img-circle m-t-5"
              src={chat.user.avatar}
              alt="avatar"
            />
          </div>
        </div>
      );
    } else {
      chatitem = (
        <div>
          <div className="media-left photo-table">
            <img
              className="media-object img-circle m-t-5"
              src={chat.user.avatar}
              alt="avatar"
            />
          </div>
          <div className="media-body chat-menu-content">
            <div>
              <p className="chat-cont chat_user_name">{chat.user.name}</p>
              <p className="chat-cont">{chat.text}</p>
              <p className="chat-time">{ago(chat.date)}</p>
            </div>
          </div>
        </div>
      );
    }

    return <div className="media chat-messages padding-20">{chatitem}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ChatItem);
