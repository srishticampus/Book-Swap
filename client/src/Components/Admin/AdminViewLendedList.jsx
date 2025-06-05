import React, { useEffect, useState } from 'react';
import axiosInstance from '../../BaseUrl';

function AdminViewLendedList() {
  const [data, setData] = useState([]);
  const id = localStorage.getItem("userid"); 

  useEffect(() => {
    axiosInstance
      .post(`/lendedBooksByUser/${id}`)
      .then((res) => {
        console.log("lended books by user:", res.data);
        setData(res.data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching lended books:", err);
      });
  }, [id]);

  return (
    <div className="admin_exchange">
      <div className="container">
        <h3>Lended Books List</h3>
        <div className="admin_exchange_head">
          <div className="row">
            <div className="col">Book Name</div>
            <div className="col">Author Name</div>
            <div className="col">Lended On</div>
          </div>
        </div>

        {data.filter(book => !book.isReturned).length ? (
          data
            .filter(book => !book.isReturned)
            .map((a) => (
              <div className="admin_exchange_body" key={a._id}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col">{a?.bookid?.bookname}</div>
                    <div className="col">{a?.bookid?.authername}</div>
                    <div className="col">{a?.date?.slice(0, 10)}</div>
                  </div>
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
  );
}

export default AdminViewLendedList;
