import React from "react";
import logo from "../../Assets/logo.png";
import { Link,useNavigate } from "react-router-dom";
import "./admin.css";
import logoutlogo from "../../Assets/logout icon.png";
function AdminHomeNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin_login");
  };
  return (
    <div>
      <nav className="navbar text-white">
        <div className="container">
          <img src={logo} alt="img" width="120" height="90"></img>
          <span class="navbar-text">
            <nav class="navbar navbar-expand-lg">
              <div class="container-fluid">
                <button
                  class="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>
                <div
                  class="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul class="navbar-nav  me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                      <Link
                        to="/admin_home"
                        class="nav-link active"
                        id="navheaders"
                        aria-current="page"
                      >
                        HOME
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/admin_about" class="nav-link" href="#" id="navheaders">
                        ABOUT
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link
                        to="/admin_viewbook"
                        class="nav-link active"
                        aria-current="page"
                        id="navheaders"
                      >
                        BOOK
                      </Link>
{/* 
                      <Link
                        to="#"
                        class="nav-link active"
                        aria-current="page"
                        id="navheaders"
                      >
                        BOOK
                      </Link> */}
                    </li>
                    <li class="nav-item">
                      <Link to="/admin_viewusers" class="nav-link" href="#" id="navheaders">
                        USER
                      </Link>
                    </li>
                    <li class="nav-item">
                      {/* <Link to="/admin_club" class="nav-link" href="#" id="navheaders">
                        CLUB
                      </Link> */}
                      <Link to="/admin_club" class="nav-link" href="#" id="navheaders">
                        LIBRARY
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link
                        to="/admin_donation"
                        class="nav-link active"
                        aria-current="page"
                        id="navheaders"
                      >
                        DONATION
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/admin-view-events" class="nav-link" href="#" id="navheaders">
                        EVENTS
                      </Link>
                    </li>
                      <li class="nav-item">
                      <Link to="/admin_exchange" class="nav-link" href="#" id="navheaders">
                        EXCHANGES
                      </Link>
                    </li>
                    {/* <li class="nav-item">
                      <Link to="/admin_exchange_req" class="nav-link" href="#" id="navheaders">
                        EXCHANGE REQUEST
                      </Link>
                    </li> */}

                    {/* <Link
                      to="/"
                      className="nav-link"
                      onClick={() => {
                        localStorage.removeItem("isAdminLoggedIn");
                      }}
                    >
                      <img src={logoutlogo} alt="logout" />
                    </Link> */}
 <li className="nav-item">
                      <span className="nav-link" id="navheaders" style={{ cursor: 'pointer' }} onClick={handleLogout}>
                        <img src={logoutlogo} alt="logout" />
                      </span>
                    </li>
   
                  </ul>
                </div>
              </div>
            </nav>
          </span>
        </div>
      </nav>
    </div>
  );
}

export default AdminHomeNavbar;
