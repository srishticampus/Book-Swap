import React from "react";
import { useState } from "react";
import axiosInstance from "../../BaseUrl";
import { useEffect } from "react";
import { toast } from "react-toastify";

function ReaderViewClubs({ url }) {
  const [adminClub, setAdminClub] = useState([]);
  
  // const [requestSent, setRequestSent] = useState(false);

  const getClubList = () => {
    axiosInstance
      .get("/admin_club")
      .then((response) => setAdminClub(response.data))
      .catch((err) => console.log(err));
  };

  const userId = localStorage.getItem("userid");

  const sendRequest = (clubId) => {
    axiosInstance.post("/sendrequest", { clubId, userId })
      .then((response) => {
        if (response.data.message === "Request already sent once") {
          toast.warning("Request already sent once");
        } else if (response.data.message === "Request sent successfully!") {
          toast.success("Your request has been sent successfully");
          // Optionally, you can perform additional actions after a successful request
        } else {
          toast.error("Error sending request");
        }
        // You might want to update the club list after sending the request
        getClubList();
      })
      .catch((error) => {
        console.log(error);
        toast.warning("Request already sent once");
      });
  };  useEffect(() => {
    getClubList();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row mb-2">
          {adminClub.length ? (
            adminClub.map((club, index) => (
              <div key={index} className="col-md-3">
                <div className="card" id="admincardlist">
                  <div className="top-section">
                    <img
                      src={`${url}/${club.image}`}
                      className="card-img-top"
                      id="adminclub"
                      alt="..."
                    />
                  </div>
                  <div className="bottom-section">
                    <h5 className="card-title text-center mt-2">
                      {club.clubname}
                    </h5>
                    <p className="card-text ms-4">
                      Street: {club.street} <br />
                      City: {club.city} <br />
                      District: {club.district} <br />
                      State: {club.state} <br />
                      Reg no: {club.regno} <br />
                      Mobile No: {club.contact} <br />
                      Email: {club.email}
                    </p>
                    <div className="col text-center">
                      <button
                        onClick={() => {
                          sendRequest(club._id);
                        }}
                        className="btn btn-primary text-center"
                      >
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no_data">
              <h1>No Clubs found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReaderViewClubs;
