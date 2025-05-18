import React, { useEffect, useState } from "react";
import axiosInstance from "../../BaseUrl";

function AdminDonation() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axiosInstance
      // .post(`/viewDonationsForAdmin`)
       .get(`/viewlibrarydonateBooks`)
      .then((res) => {
        const donationData = res?.data?.data || [];
        console.log("Received data:", donationData);
        setData(donationData);
      })
      .catch((err) => {
        console.log("API error:", err);
        setData([]); // fallback to avoid null
      });
  }, []);
  

  // useEffect(() => {
  //   axiosInstance
  //     .post(`/viewDonationsForAdmin`)
  //     .then((res) => {
  //       console.log(res);
  //       setData(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  return (
    <div className="admin_exchange">
      <div className="container">
        <div className="admin_exchange_head">
          <div class="row">
            <div class="col">Book Name</div>
            <div class="col">Donated by</div>
            <div class="col">Contact No</div>
            <div class="col">Mail Id</div>
            <div class="col">Date</div>
          </div>
        </div>
        {data.length ? (
          data.map((a) => {
            return (
              <div className="admin_exchange_body">
                <div className="container-fluid">
                  <div class="row">
                     <div className="col">{a.bookname}</div>
                     <div className="col">{a.count}</div>
                    {/* <div class="col">{a.bookname}</div>
                    <div class="col">{a.userid?a.userid.firstname:a.clubid.clubname}</div>
                    <div class="col">{a.userid?a.userid.mobile:a.clubid.contact}</div>
                    <div class="col">{a.userid?a.userid.email:a.clubid.email}</div>
                    <div class="col">{a.date.slice(0,10)}</div> */}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default AdminDonation;
