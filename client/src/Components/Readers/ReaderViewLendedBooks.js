import React from "react";
import { useEffect } from "react";
import axiosInstance from "../../BaseUrl";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function ReaderViewLendedBooks() {
  const [data, setData] = useState([]);
  const [libraryBooks, setLibraryBooks] = useState([]);
  const id = localStorage.getItem("userid");
  const libraryId = localStorage.getItem("libraryid");

  const handleLibraryReturn = async (bookId) => {
    try {
      const res = await axiosInstance.post(`/library/return/${bookId}`);
      toast.success("Library book returned");
      console.log("Book returned successfully:", res.data);
      // Optionally refetch or remove book from UI after return
      // setLibraryBooks();
       setLibraryBooks(prev => prev.filter(book => book._id !== bookId));
    } catch (error) {
      console.error("Error returning book:", error);
      alert("Failed to return the book.");
    }
  };

  useEffect(() => {
    axiosInstance
      .post(`/lendedBooksByUser/${id}`)
      .then((res) => {
        console.log("lended book by user", res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/lended-books/user/${id}`)
        .then((res) => {
          setLibraryBooks(res.data.data);
          console.log(" returned", res.data.data)
        })
        .catch((err) => {
          console.log("Error fetching user lended books:", err);
        });
    }

  }, [id]);

  return (
    <div>
      <div className="admin_exchange">
        <div className="container">
  <h3>Lended Books</h3>
  <div className="admin_exchange_head">
    <div className="row">
      <div className="col">Book Name</div>
      <div className="col">Author Name</div>
      <div className="col">Lended on</div>
      <div className="col">Action</div>
    </div>
  </div>
  
  {data.filter(book => !book.isReturned).length ? (
    data
      .filter(book => !book.isReturned) // Only show not returned
      .map((a) => (
        <div className="admin_exchange_body" key={a._id}>
          <div className="container-fluid">
            <div className="row">
              <div className="col">{a?.bookid?.bookname}</div>
              <div className="col">{a?.bookid?.authername}</div>
              <div className="col">{a?.date?.slice(0, 10)}</div>
              <div className="col">
                <Link to={`/reader_return_book/${a?._id}/${a?.bookid?._id}`}>
                  <button className="btn btn-success">Return now</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))
  ) : (
    <div className="no_data">
      <h1>No Books found</h1>
    </div>
  )}
</div>

      </div>
      {/* Library's Lended Books */}

      <div className="admin_exchange">
        <div className="container">
          <h3>Library Returned Books</h3>
          <div className="admin_exchange_head">
            <div className="row">
              <div className="col">Book Name</div>
              <div className="col">Author Name</div>
              <div className="col">Lended on</div>
              <div className="col">Action</div>
            </div>
          </div>
          {libraryBooks.length ? (
            libraryBooks.map((a) => (
              <div className="admin_exchange_body" key={a._id}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col">{a?.bookname}</div>
                    <div className="col">{a?.authername}</div>
                    <div className="col">{a?.lentDate?.slice(0, 10)}</div>
                    <div className="col">
                  
                       <button className="btn btn-success" onClick={() => handleLibraryReturn(a._id)}>
                          Return now
                        </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no_data">
              <h1>No Books found</h1>
            </div>
          )}
        </div>
      </div>


    </div>
  );
}

export default ReaderViewLendedBooks;
