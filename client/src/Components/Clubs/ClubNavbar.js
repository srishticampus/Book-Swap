import React from "react";
import logo from "../../Assets/logo.png";
import { Link } from "react-router-dom";

function ClubNavbar() {
  return (
    <div>
      <nav className="navbar text-white">
        <div className="container">
          <img src={logo} alt="img" width="120" height="90"></img>
          <span class="navbar-text">
            <Link to='/club_login'><button className="btn btn-primary">Login</button></Link>
          </span>
        </div>
      </nav>
    </div>
  );
}

export default ClubNavbar;
