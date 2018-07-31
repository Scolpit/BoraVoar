import React from "react";
import PropTypes from "prop-types";

const ChatItem = (chat, user) => {
  let chatitem;
  if (chat.user._id === user.id) {
    chatitem = (
      <div>
        <div className="media-body chat-menu-reply">
          <div>
            <p className="chat-cont chat_user_name">{chat.user.name}</p>
            <p className="chat-cont">{chat.text}</p>
            <p className="chat-time">{chat.date}</p>
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
            <p className="chat-time">{chat.date}</p>
          </div>
        </div>
      </div>
    );
  }

  return <div className="media chat-messages padding-20">{chatitem}</div>;
};

ChatItem.propTypes = {
  chat: PropTypes.object.isRequired
};

export default ChatItem;
