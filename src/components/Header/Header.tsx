import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="header__link">
        Products List
      </Link>
    </div>
  );
};

export default Header;
