import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MenuItem = ({ activeMenu, to, icon, name }) => {
  return (
    <li
      className={classnames("treeview", {
        active: activeMenu === to
      })}
    >
      <Link className="waves-effect waves-dark" to={`/${to}`}>
        <i className={icon} />
        <span> {name}</span>
      </Link>
    </li>
  );
};

MenuItem.propTypes = {
  activeMenu: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};

export default MenuItem;
