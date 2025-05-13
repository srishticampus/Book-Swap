import React from "react";
import { useEffect } from "react";
import axiosInstance from "../../BaseUrl";
import { useState } from "react";
import { Link } from "react-router-dom";

function ReaderViewLendedBooks() {
  const [data, setData] = useState([]);
  const id = localStorage.getItem("userid");

  useEffect(() => {
    axiosInstance
      .post(`/lendedBooksByUser/${id}`)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className="admin_exchange">
        <div className="container">
          <div className="admin_exchange_head">
            <div class="row">
              <div class="col">Book Name</div>
              <div class="col">Author Name</div>
              <div class="col">Lended on</div>
              <div class="col">Action</div>
            </div>
          </div>
          {data.length ? (
            data.map((a) => {
              return (
                <div className="admin_exchange_body">
                    
                  <div className="container-fluid">
                    <div class="row">
                      <div class="col">{a.bookid.bookname}</div>
                      <div class="col">{a.bookid.authername}</div>
                      <div class="col">{a.date.slice(0,10)}</div>
                      <div class="col"><Link to={`/reader_return_book/${a._id}/${a.bookid._id}`}> <button className="btn btn-success" >Return now</button></Link> </div>
                    </div>
                  </div>
                </div>
              );
            })
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
