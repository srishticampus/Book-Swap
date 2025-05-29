import React, { useState, useEffect } from "react";
import logo from "../../Assets/logo.png";
import { Link } from "react-router-dom";
import { AiFillBell } from "react-icons/ai";
import "./club.css";
import axiosInstance from '../../BaseUrl';

function ClubHomeNavbar() {
  const url = 'http://localhost:4059';
  const [data, setData] = useState({ image: { filename: '' } });
  const id = localStorage.getItem("libraryid"); 

  useEffect(() => {
    axiosInstance.get(`/viewalibrary/${id}`)  
      .then((result) => {
        setData(result.data.data);
        console.log(result.data.data);
      })
      .catch((err) => {
        console.log("Library fetch error:", err);
      });
  }, [id]);

  return (
    <div>
      <nav className="navbar text-white">
        <div className="container">
          <img src={logo} alt="logo" width="120" height="90" />
          <span className="navbar-text">
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link to="/library_home" className="nav-link active" id="navheaders">HOME</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/library_about" className="nav-link" id="navheaders">ABOUT</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/library_view_books" className="nav-link active" id="navheaders">BOOK</Link>
                    </li>
                     <li className="nav-item">
                      <Link to="/library-view-events" className="nav-link active" id="navheaders">EVENTS</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/library_view_members" className="nav-link" id="navheaders">MEMBERS</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/library_donatebook" className="nav-link" id="navheaders">ADD BOOK</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/librarynotificationpage" className="nav-link"><AiFillBell /></Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/library_profile" className="nav-link" id="adminhomelogout">
                        {/* <img
                          src={data.image?.filename ? `${url}/${data.image.filename}` : logo}
                          alt="Library"
                          width="30"
                          height="30"
                          style={{ borderRadius: "50%", objectFit: "cover" }}
                        /> */}
                        <img
  src={data?.image?.filename ? `${url}/${data.image.filename}` : logo}
  alt="Library"
  width="30"
  height="30"
  style={{ borderRadius: "50%", objectFit: "cover" }}
/>

                      </Link>
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

export default ClubHomeNavbar;


// DON'T DELETE

// import React, { useState, useEffect } from "react";
// import logo from "../../Assets/logo.png";
// import { Link } from "react-router-dom";
// import { AiFillBell } from "react-icons/ai";
// import clublog from "../../Assets/clubicon.jpg";
// import "./club.css";
// import axiosInstance from '../../BaseUrl';


// function ClubHomeNavbar() {

//   const url = 'http://localhost:4001'

//   const [data, setData] = useState({ image: { filename: '' } })
//   const id = localStorage.getItem("clubid")
//   console.log(id);


//   useEffect(() => {
//     axiosInstance.post(`/viewClubbyid/${id}`)
//       .then((result) => {
//         console.log(result);
//         setData(result.data.data)
//         console.log(result.data.data);
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//   }, [])

//   return (
//     <div>
//       <nav className="navbar text-white">
//         <div className="container">
//           <img src={logo} alt="img" width="120" height="90"></img>
//           <span class="navbar-text">
//             <nav class="navbar navbar-expand-lg">
//               <div class="container-fluid">
//                 <button
//                   class="navbar-toggler"
//                   type="button"
//                   data-bs-toggle="collapse"
//                   data-bs-target="#navbarSupportedContent"
//                   aria-controls="navbarSupportedContent"
//                   aria-expanded="false"
//                   aria-label="Toggle navigation"
//                 >
//                   <span class="navbar-toggler-icon"></span>
//                 </button>
//                 <div
//                   class="collapse navbar-collapse"
//                   id="navbarSupportedContent"
//                 >
//                   <ul class="navbar-nav  me-auto mb-2 mb-lg-0">
//                     <li class="nav-item">
//                       <Link

//                         to="/library_home"
//                         class="nav-link active"
//                         id="navheaders"
//                         aria-current="page"

//                       >
//                         HOME
//                       </Link>
//                     </li>
//                     <li class="nav-item">
//                       <Link to="/library_about" class="nav-link" href="#" id="navheaders">
//                         ABOUT
//                       </Link>
//                     </li>
//                     <li class="nav-item">
//                       <Link
//                         to="/library_view_books"
//                         class="nav-link active"
//                         aria-current="page"
//                         id="navheaders"
//                       >
//                         BOOK
//                       </Link>
//                     </li>
//                     <li class="nav-item">
//                       <Link to="/library_view_members" class="nav-link" href="#" id="navheaders">
//                         MEMBERS
//                       </Link>
//                     </li>
//                     <li class="nav-item">
//                       {/* <Link to="/library_donatebook" class="nav-link" href="#" id="navheaders">
//                         DONATE
//                       </Link> */}
//                       <Link to="#" class="nav-link" href="#" id="navheaders">
//                         DONATE
//                       </Link>
//                     </li>
//                     <li class="nav-item">
//                       {/* <Link to="/librarybnotificationpage" class="nav-link">
//                         <AiFillBell />
//                       </Link> */}
//                       <Link to="#" class="nav-link">
//                         <AiFillBell />
//                       </Link>
//                     </li>
//                     <li class="nav-item">
//                       <Link to="/library_profile" class="nav-link" id="adminhomelogout">

//                         {/* <img
//                           src={`${url}/upload/${data.image.filename}`}
//                           alt="img"
//                           width="20"
//                           height="18"
//                         ></img>  */}

//                         <img
//                           src={`${url}/${data.image?.filename}`}
//                           alt="Profile"
//                           width="20"
//                           height="18"
//                         />

//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </nav>
//           </span>
//         </div>
//       </nav>
//     </div>
//   );
// }

// export default ClubHomeNavbar;
