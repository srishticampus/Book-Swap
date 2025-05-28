import React, { useEffect, useState } from "react";
import logo from "../../Assets/logo.png";
import { Link } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import "./reader.css";
// import girl from "../../Assets/girl.png";
import ReaderViewWishlist from "./ReaderViewWishlist";
import axiosInstance from "../../BaseUrl";

function ReaderHomeNavbar() {

  //local
  const url = 'http://localhost:4059'

  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [data, setData] = useState({ dob: '', image: { filename: '' } })
  const id = localStorage.getItem('userid')

  useEffect(() => {
    axiosInstance.post(`/viewUserById/${id}`)
      .then((res) => {
        // console.log(res);
        setData(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [id])

  const openWishlistModal = () => {
    setShowWishlistModal(true);
  };

  const closeWishlistModal = () => {
    setShowWishlistModal(false);
  };

  // console.log(data);

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
                  <ul class="navbar-nav  me-auto mb-2 mb-lg-0" id="homenavlist">
                    <li class="nav-item">
                      <Link
                        to="/reader_home"
                        class="nav-link active"
                        id="navheaders"
                        aria-current="page"
                      >
                        HOME
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link
                        to="/reader_about"
                        class="nav-link"
                        href="#"
                        id="navheaders"
                      >
                        ABOUT
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link
                        to="/reader_view_books"
                        class="nav-link active"
                        aria-current="page"
                        id="navheaders"
                      >
                        BOOK
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/reader_view_clubs" class="nav-link" href="#" id="navheaders">
                        LIBRARY
                      </Link>
                      {/* <Link to="#" class="nav-link" href="#" id="navheaders">
                        LIBRARY
                      </Link> */}
                    </li>
                    <li class="nav-item">
                      <Link
                        to="/reader_donatebook"
                        class="nav-link active"
                        aria-current="page"
                        id="navheaders"
                      >
                        DONATE
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link
                        to="/reader-view-events"
                        class="nav-link active"
                        aria-current="page"
                        id="navheaders"
                      >
                        EVENTS
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/reader_exchange" class="nav-link" href="#" id="navheaders">
                        EXCHANGES
                      </Link>
                      {/* <Link to="#" class="nav-link" href="#" id="navheaders">
                        EXCHANGES
                      </Link> */}
                    </li>
                    <li class="nav-item">
                      <Link
                        to="/reader-view-all-other-user-book"
                        class="nav-link active"
                        aria-current="page"
                        id="navheaders"
                      >
                        ALL BOOKS
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link to="/reader_view_lended_books" class="nav-link" href="#" id="navheaders">
                        MY BOOKS
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link onClick={openWishlistModal} className="nav-link">
                        <BsFillHeartFill />
                      </Link>
                    </li>
                    <li class="nav-item">
                      <Link
                        to="/reader_profile_account_info"
                        class="nav-link"
                        href="#"
                      >
                        <img src={`${url}/${data.image.filename}`} alt="img" className="readerimg"></img>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            {showWishlistModal && (
              <ReaderViewWishlist
                show={showWishlistModal}
                setShow={closeWishlistModal}
                url={url}
              />
            )}
          </span>
        </div>
      </nav>
    </div>
  );
}
// deletelater

export default ReaderHomeNavbar;
