import React from "react";
import { useState } from "react";
import axiosInstance from "../../BaseUrl";
import { useEffect } from "react";
import { toast } from "react-toastify";

function ReaderViewClubs({ url }) {
  const [adminClub, setAdminClub] = useState([]);
  
  // const [requestSent, setRequestSent] = useState(false);

  // const getClubList = () => {
  //   axiosInstance
		
  //     .get("/getlibraries")
  //     .then((response) => setAdminClub(response.data))

  //     .catch((err) => console.log(err));
  // };
  const getClubList = () => {
  axiosInstance
    .get("/getlibraries")
    .then((response) => {
      console.log("Response from /getlibraries:", response.data); // Log the full response
      console.log("Library data:", response.data); // Log just the data (usually the useful part)
      setAdminClub(response.data);
    })
    .catch((err) => {
      console.log("Error fetching libraries:", err);
    });
};

  const userId = localStorage.getItem("userid");
  // const libraryid = localStorage.getItem("libraryid");

  const sendRequest = (libraryId) => {
    axiosInstance.post("/sendrequest", { libraryId, userId })
      .then((response) => {
        if (response.data.message === "Request already sent once") {
          toast.warning("Request already sent once");
        } else if (response.data.message === "Request sent successfully!") {
          toast.success("Your request has been sent successfully");
      
        } else {
          toast.error("Error sending request");
        }
       
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
              <h1>No Library Found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReaderViewClubs;
