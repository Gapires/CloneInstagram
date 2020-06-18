import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/svgs/logo.svg";
import camera from "../../assets/svgs/camera.svg";

function Header() {
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/">
          <img src={logo} alt="InstaRocket"></img>
        </Link>
        <Link to="/new">
          <img src={camera} alt="Enviar Publicação"></img>
        </Link>
      </div>
    </header>
  );
}

export default Header;
