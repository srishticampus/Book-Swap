import React, { useEffect, useState } from "react";
import axiosInstance from "../../BaseUrl";

function AdminDonation() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .post('/viewalluserdonatebook') // ✅ Correct endpoint here
      .then((res) => {
        const donationData = res?.data?.data || [];
        console.log("Received data:", donationData);
        setData(donationData);
      })
      .catch((err) => {
        console.error("API error:", err);
        setData([]);
      });
  }, []);

  return (
    <div className="admin_exchange">
      <div className="container">
        <div className="admin_exchange_head">
          <div className="row">

            <div className="col">Book Name</div>
                        
            <div className="col">Auther Name</div>
            <div className="col">Count</div>
            <div className="col">Donated By</div>
            <div className="col">Contact No</div>
            <div className="col">Mail Id</div>
            <div className="col">Published Year</div>
          </div>
        </div>
        {data.length ? (
          data.map((a, index) => (
            <div className="admin_exchange_body" key={index}>
              <div className="container-fluid">
                <div className="row">
            
                  <div className="col">{a.bookname}</div>
                  <div className="col">{a.authername}</div>
                  <div className="col">{a.count}</div>
                  <div className="col">
                    {a.userid ? a.userid.firstname : a.clubid?.clubname}
                  </div>
                  <div className="col">
                    {a.userid ? a.userid.mobile : a.clubid?.contact}
                  </div>
                  <div className="col">
                    {a.userid ? a.userid.email : a.clubid?.email}
                  </div>
                  <div className="col">{a.publisheryear}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>No donations found.</div>
        )}
      </div>
    </div>
  );
}

export default AdminDonation;
