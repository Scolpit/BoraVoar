import React from "react";
import PropTypes from "prop-types";

const ProfileAvatar = ({ user }) => {
  return (
    <div className="card faq-left">
      <div className="social-profile">
        <img className="img-fluid" src={user.avatar} alt="" />
      </div>
      <div className="card-block" align="center">
        <h4 className="f-18 f-normal m-b-10 txt-primary">{user.name}</h4>
        <a
          href="http://gravatar.com"
          target="_blank"
          rel="noopener noreferrer"
          className="width-100p m-t-6 btn btn-success waves-effect waves-light m-r-30"
        >
          Alterar imagem*
        </a>
        <p className="m-t-10 font-size-11">
          *A alteração da foto é feita pelo site gravatar.com
        </p>
      </div>
    </div>
  );
};

ProfileAvatar.propTypes = {
  user: PropTypes.object.isRequired
};

export default ProfileAvatar;
