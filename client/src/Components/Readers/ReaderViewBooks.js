import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../../BaseUrl";
import ReactStars from "react-rating-stars-component";
import { BsFillHeartFill } from "react-icons/bs";
import "./ReaderViewBooks.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ReaderViewBooks({ url }) {

  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const uid = localStorage.getItem('userid')

  useEffect(() => {
    fetchBooks(); // Initial fetch
  }, [uid]);

  const fetchBooks = () => {
    axiosInstance.post(`/viewAllBooks/${uid}`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearch = () => {
    axiosInstance.post(`/viewAllBooks/${uid}`)
      .then((res) => {
        const allBooks = res.data.data;
        const filteredBooks = allBooks.filter(book =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setData(filteredBooks);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {

    axiosInstance.post(`/viewAllBooks/${uid}`)
      .then((res) => {
        console.log(res);
        setData(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      })

  }, [uid])
  const addToWishlist = (bid) => {
    axiosInstance.post('/userwishlist', { userid: uid, bookid: bid })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success('Added to wishlist')
          setData((prevData) =>
            prevData.map((book) =>
              book._id === bid ? { ...book, wishlisted: !book.wishlisted } : book
            )
          );
        } else if (res.data.status === 500) {
          toast.warning(res.data.msg)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const lend = (bid) => {
    axiosInstance.post('/lendbyuser', { userid: uid, bookid: bid })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          toast.success('Lended Successfully')
          // window.location.reload()
        } else if (res.data.status === 500) {
          toast.warning(res.data.msg)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div>
      <div className="admin-view-book">
        {/* <Link to='/admin_addbook'>
        <div className="admin-view-book-add text-center" >
        <i class="ri-add-fill"></i>
        <p>Add Book</p>
        </div>
        </Link> */}

        <div class="container ">


          <form className="d-flex mb-3">
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search by book name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-primary" type="button" onClick={handleSearch}>
              Search
            </button>
          </form>


          <div class="row">

            {
              data.length ? data.map((a) => {
                return (
                  <Link
                    to={`/book-details/${a._id}`}
                    state={{ book: a }}
                    className="col-3 text-decoration-none text-dark"
                  >
                    <div className="card admin-books" id="carddesign">
                      <div className="reader-book-top-section">
                        <img
                          src={a.img}
                          className="card-img-top"
                          id="adminclub"
                          alt="..."
                        />
                        <button
                          className="btn reader-book-top-section-heart"
                          onClick={(e) => {
                            e.preventDefault();
                            addToWishlist(a._id);
                          }}
                        >
                          <BsFillHeartFill
                            color={a.wishlisted ? "red" : "grey"}
                            size="20px"
                          />
                        </button>
                      </div>
                      <div className="admin-book-bottom-section container">
                        <h4 className="card-title mt-2">{a.title}</h4>
                        <h6 className="card-text">Author: {a.author}</h6>
                        <div className="col text-center">
                          <button
                            className="btn btn-primary text-center"
                            onClick={(e) => {
                              e.preventDefault();
                              lend(a._id);
                            }}
                          >
                            Lend
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>

                )
              }) : <div className="no_data" >
                <h1>No books found</h1>
              </div>
            }


          </div>
        </div>
      </div>
    </div>
  );
}

export default ReaderViewBooks;
