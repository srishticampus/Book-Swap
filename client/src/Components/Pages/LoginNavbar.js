import React from "react";
import logo from "../../Assets/logo.png";
import { Link } from 'react-router-dom'
import { TiHome } from "react-icons/ti";

function LoginNavbar() {
  return (
    <div className="d-flex justify-content-between">
    <div>
        <nav className="navbar text-white">
        <div className="container">
          <img src={logo} alt="img" width="120" height="90"></img>
        </div>
      </nav>
    </div>

     <div>
       <Link to="/">
        <TiHome className="userhomeicon" />
      </Link>
     </div>
    </div>
  );
}

export default LoginNavbar;
