import React from "react";
import logo from "../../Assets/logo.png";
import { TiHome } from "react-icons/ti";
import { BsPersonCircle } from "react-icons/bs";
import "./reader.css";
import { Link } from "react-router-dom";

function ReaderNavbar() {
  return (
    <div>
      <nav className="navbar" id="navbackground">
        <div className="container">
          <img src={logo} alt="img" width="120" height="90"></img>
          <span class="navbar-text">
            <Link to='/' ><TiHome className="userhomeicon" /></Link>
            <Link to='/reader_loginpage' ><BsPersonCircle className="userprofileicon" /></Link>
          </span>
        </div>
      </nav>
    </div>
  );
}

export default ReaderNavbar;
