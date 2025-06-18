import React, { useEffect, useState } from 'react';
import axiosInstance from '../../BaseUrl';
import { useNavigate } from 'react-router-dom';
// import ReactStars from "react-rating-stars-component";

function ClubViewBooks({ url }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [allBooks, setAllBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate()

  useEffect(() => {
    const libraryid = localStorage.getItem("libraryid");
    console.log("Library ID from localStorage:", libraryid);
    if (!libraryid) {
      setErrorMsg("Library ID not found in localStorage");
      setLoading(false);
      return;
    }
    axiosInstance.get(`/viewBooks/${libraryid}`)
      .then((res) => {
        const books = res.data?.data || [];
        setAllBooks(books);
        setData(books);

        console.log(res.data)
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg("Error fetching books");
        setLoading(false);
      });

  }, []);
  const handleSearch = () => {
    const filteredBooks = allBooks.filter(book =>
      book.bookname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setData(filteredBooks);
  };

  const handleDelete = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      axiosInstance.post(`/library/delete/${bookId}`)
        .then(() => {
          // Remove deleted book from state
          const updatedBooks = data.filter(book => book._id !== bookId);
          setData(updatedBooks);
          setAllBooks(updatedBooks);
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete book");
        });
    }
  };
  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-view-book">
      <div className="container">
        <form className="d-flex mb-3">
          <input
            className="form-control me-2"
            type="text"
            placeholder="Search by book name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </form>
        <div className="row">
          {errorMsg ? (
            <div className="no_data">
              <h1>{errorMsg}</h1>
            </div>
          ) : data.length > 0 ? (
            data.map((a) => (
              <div className="card admin-books col-3" id="carddesign" key={a._id}>
                <div className="admin-book-top-section">
                  <img
                    src={`${url}/${a.image}`}
                    className="card-img-top"
                    id="adminclub"
                    alt={a.bookname}
                  />
                </div>
                <div className="admin-book-bottom-section container">
                  <h4 className="card-title mt-3 mb-2">{a.bookname}</h4>
                  <h6 className="card-text">Author: {a.authername}</h6>
                  <h6 className="card-text">Publisher: {a.publisher}</h6>
                  <h6 className="card-text">Publishing Year: {a.publisheryear}</h6>
                  {/* <ReactStars
                    count={5}
                    value={a.rating}
                    size={24}
                    activeColor="#ffd700"
                    edit={false}
                  /> */}
                  <button
                    className='btn btn-primary'
                    onClick={() => navigate(`/library_edit_book/${a._id}`)}
                  >
                    Edit
                  </button>
                  <button className='btn btn-danger' onClick={() => handleDelete(a._id)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no_data">
              <h1>No Books Found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClubViewBooks;








