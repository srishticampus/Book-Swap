import React, { useEffect, useState } from 'react';
import axiosInstance from '../../BaseUrl';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function ClubViewBooks({ url }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [allBooks, setAllBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const libraryid = localStorage.getItem("libraryid");
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

  const handleViewPdf = (book) => {
    if (book.bookpdf?.filename) {
      const cleanUrl = url.replace(/\/+$/, '');
      setPdfUrl(`${cleanUrl}/${book.bookpdf.filename}`);
      setShowModal(true);
    } else {
      toast.error("No PDF available for this book");
    }
  };

  const handleDelete = (bookId) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      axiosInstance.post(`/library/delete/${bookId}`)
        .then(() => {
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
                    src={`${url}/${a.image.filename}`}
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
                  <button className="btn btn-success" onClick={() => handleViewPdf(a)}>View pdf</button>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/library_edit_book/${a._id}`)}
                  >
                    Edit
                  </button>
                  <button className="btn btn-danger" onClick={() => handleDelete(a._id)}>Delete</button>
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

      {showModal && pdfUrl && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={(e) => {
            if (e.target.classList.contains("modal")) setShowModal(false);
          }}
        >
          <div className="modal-dialog modal-xl modal-dialog-scrollable">
            <div className="modal-content" style={{ height: '90vh' }}>
              <div className="modal-header">
                <h5 className="modal-title">Read Book</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)} />
              </div>
              <div className="modal-body p-0" style={{ height: '100%' }}>
                <iframe
                  src={pdfUrl}
                  title="PDF Preview"
                  width="100%"
                  height="100%"
                  style={{ border: "none" }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClubViewBooks;
