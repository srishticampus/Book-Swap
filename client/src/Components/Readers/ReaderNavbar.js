import React, { useState } from "react";
import logo from "../../Assets/logo.png";
import { TiHome } from "react-icons/ti";
import { BsPersonCircle } from "react-icons/bs";
import "./reader.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function ReaderNavbar() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar" id="navbackground">
      <div className="container d-flex justify-content-between align-items-center">
        <img src={logo} alt="logo" width="120" height="90" />

        <div className="d-flex align-items-center gap-3 position-relative">

          <Link to="/">
            <TiHome className="userhomeicon" />
          </Link>

        
          <button className="btn p-0 border-0" onClick={toggleMenu}>
            <BsPersonCircle className="userprofileicon" size={28} />
          </button>

        
          {showMenu && (
            <div className="custom-menu position-absolute end-0 mt-2">
              <Link className="dropdown-item" to="/reader_loginpage" onClick={() => setShowMenu(false)}>
                User Login
              </Link>
              <Link className="dropdown-item" to="/library-login" onClick={() => setShowMenu(false)}>
                Library Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
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

