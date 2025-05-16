import React, { useState, useEffect } from "react";
import "./adminclublist.css";
import axiosInstance from "../../BaseUrl";
import { toast } from "react-toastify";

function AdminClubList({url}) {
  const [adminClub, setAdminClub] = useState([]);

  const getClubList = () => {
    axiosInstance
      .get("/getlibraries")
      .then((response) => setAdminClub(response.data))
      .catch((err) => console.log(err));
  };

  const handleRemove = (id) => {
    console.log(id);
    axiosInstance.delete("/removelibrary/" + id).then((result) => {
      if (result.data.deletedCount === 1) {
        toast.success("A Library is Removed Successfully");
        getClubList();
      } else {
        toast.error("you have an error");
      }
    });
  };

  useEffect(() => {
    getClubList();
  }, []);

  return (
    <div>
      <div className="container">
        <div className="row mb-2">
          {adminClub.length?adminClub.map((club, index) => (
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
                        handleRemove(club._id);
                      }}
                      className="btn btn-primary text-center"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )):<div className="no_data" >
          <h1>No Library found</h1>
        </div>
        }
        </div>
      </div>
    </div>
  );
}

export default AdminClubList;
