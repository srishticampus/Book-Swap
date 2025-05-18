import React, { useState } from "react";

function AdminExchangeDetails() {
  const[requestdata,setRequestData]=useState([])



  return (
    <div>
      <div className="admin_exchange">
        <div className="container">
          <div className="admin_exchange_head">
            <div class="row">
              <div class="col">Sl.No</div>
              <div class="col">Book Name</div>
              <div class="col">Requested User</div>
              <div class="col">Reciever User</div>
              <div class="col">Date</div>
            </div>
          </div>
          {
          <div className="admin_exchange_body">
            <div className="container-fluid">
              <div class="row">
                <div class="col">01</div>
                <div class="col">Book Name</div>
                <div class="col">Roja</div>
                <div class="col">Vijay</div>
                <div class="col">Date</div>
                
              </div>
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default AdminExchangeDetails;
