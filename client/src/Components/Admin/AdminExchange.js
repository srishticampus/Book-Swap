import React, { useEffect, useState } from "react";
import "./adminexchange.css";
import AdminHomeNavbar from "./AdminHomeNavbar";
import axiosInstance from "../../BaseUrl";

function AdminExchange() {
  const [exchangerequest, setExchangeRequest] = useState([]);

  const displayExchangeRequest = () => {
    axiosInstance
      .post(`/displayexchangerequests`)
      .then((res) => {
        console.log(res.data);
        setExchangeRequest(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    displayExchangeRequest();
  }, []);
  return (
    <div className="admin_exchange">
      <div className="container">
        <div className="admin_exchange_head">
          <div class="row">
            <div class="col">Sl.No</div>
            <div class="col">Book Name</div>
            <div class="col">Requested User</div>
            <div class="col">Accepted User</div>
            <div class="col">Date</div>
          </div>
        </div>
        {exchangerequest.map((items, index) => (
          <div className="admin_exchange_body">
            <div className="container-fluid">
              <div class="row" key={index}>
                <div class="col">{index + 1}</div>
                <div class="col">{items.bookname}</div>
                <div class="col">{items.userid.firstname}</div>
                <div class="col">{items.statusChangedBy.firstname}</div>
                <div class="col">{formatDate(items.acceptedDate)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminExchange;
