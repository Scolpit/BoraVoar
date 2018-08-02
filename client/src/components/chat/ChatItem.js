import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ago } from "time-ago";

import { deleteChatFromCar } from "../../actions/chatActions";

export class ChatItem extends Component {
  static propTypes = {
    chat: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    carid: PropTypes.string.isRequired,
    deleteChatFromCar: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isDeleted: false
    };

    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    this.setState({ isDeleted: true });
    this.props.deleteChatFromCar(this.props.chat._id, this.props.carid);
  }

  render() {
    const { user, isAuthenticated } = this.props.auth;
    const { chat } = this.props;

    let chatitem;
    if (isAuthenticated && chat.user._id === user.id) {
      chatitem = (
        <div className="media chat-messages padding-20">
          <div>
            <div className="media-body chat-menu-reply">
              <div>
                <i
                  onClick={this.onDelete}
                  className="fas fa-times times-delete-chat"
                />
                <p className="chat-cont chat_user_name">{chat.user.name}</p>
                <p className="chat-cont">{chat.text}</p>
              </div>
            </div>

            <div className="media-right photo-table">
              <img
                className="media-object img-circle m-t-5"
                src={chat.user.avatar}
                alt="avatar"
              />
            </div>
            <p className="chat-time">{ago(chat.date)}</p>
          </div>
        </div>
      );
    } else {
      chatitem = (
        <div className="media chat-messages padding-20">
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
              </div>
            </div>
            <p align="right" className="chat-time">
              {ago(chat.date)}
            </p>
          </div>
        </div>
      );
    }

    if (this.state.isDeleted) {
      chatitem = "";
    }

    return <div>{chatitem}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteChatFromCar }
)(ChatItem);
