import React from "react";
import logo from "../../Assets/logo.png";

function LoginNavbar() {
  return (
    <div>
      <nav className="navbar text-white">
        <div className="container">
          <img src={logo} alt="img" width="120" height="90"></img>
        </div>
      </nav>
    </div>
  );
}

export default LoginNavbar;
