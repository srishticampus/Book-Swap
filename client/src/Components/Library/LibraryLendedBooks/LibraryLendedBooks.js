import React, { useEffect, useState } from "react";
import axiosInstance from "../../../BaseUrl"; // ← goes 3 levels up to src

function LibraryLendedBooks() {
  const [data, setData] = useState([]);
  const libraryId = localStorage.getItem("libraryid");

  useEffect(() => {
    if (libraryId) {
      axiosInstance
        .get(`/lended-books/library/${libraryId}`)
        .then((res) => {
          setData(res.data.data);
        })
        .catch((err) => {
          console.error("Error fetching lended books by library:", err);
        });
    }
  }, [libraryId]);

  return (
    <div className="admin_exchange">
      <div className="container">
        <h3>Library Lended Books</h3>
        <div className="admin_exchange_head">
          <div className="row">
            <div className="col">Book Name</div>
            <div className="col">Author Name</div>
            <div className="col">Lended On</div>
            <div className="col">Lended To</div>
          </div>
        </div>
        {data.length ? (
          data.map((item) => (
            <div className="admin_exchange_body" key={item._id}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col">{item.bookid?.bookname}</div>
                  <div className="col">{item.bookid?.authername}</div>
                  <div className="col">{item.date?.slice(0, 10)}</div>
                  <div className="col">{item.userid?.username || "N/A"}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no_data">
            <h1>No Lended Books Found</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default LibraryLendedBooks;
