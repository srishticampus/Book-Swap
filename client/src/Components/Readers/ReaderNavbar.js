import React from "react";
import logo from "../../Assets/logo.png";
import { TiHome } from "react-icons/ti";
import { BsPersonCircle } from "react-icons/bs";
import "./reader.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function ReaderNavbar() {
  return (
    <div>
      <nav className="navbar" id="navbackground">
        <div className="container d-flex justify-content-between align-items-center">
          <img src={logo} alt="logo" width="120" height="90" />

          <div className="d-flex align-items-center gap-3">
            <Link to="/">
              <TiHome className="userhomeicon" />
            </Link>

            {/* Bootstrap Dropdown */}
            <div className="dropdown">
  <button
    className="btn btn-link dropdown-toggle p-0 border-0"
    id="userDropdown"
    data-bs-toggle="dropdown"
    aria-expanded="false"
  >
    <BsPersonCircle className="userprofileicon" size={28} />
  </button>
  <ul
    className="dropdown-menu dropdown-menu-end"
    aria-labelledby="userDropdown"
  >
    <li>
      <Link className="dropdown-item" to="/reader_loginpage">
        User Login
      </Link>
    </li>
    <li>
      <Link className="dropdown-item" to="/club_loginpage">
        Library Login
      </Link>
    </li>
  </ul>
</div>

          </div>
        </div>
      </nav>
    </div>
  );
}

export default ReaderNavbar;



// import React from "react";
// import logo from "../../Assets/logo.png";
// import { TiHome } from "react-icons/ti";
// import { BsPersonCircle } from "react-icons/bs";
// import "./reader.css";
// import { Link } from "react-router-dom";

// function ReaderNavbar() {
//   return (
//     <div>
//       <nav className="navbar" id="navbackground">
//         <div className="container">
//           <img src={logo} alt="img" width="120" height="90"></img>
//           <span class="navbar-text">
//             <Link to='/' ><TiHome className="userhomeicon" /></Link>
//             <Link to='/reader_loginpage' ><BsPersonCircle className="userprofileicon" /></Link>
//           </span>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default ReaderNavbar;

