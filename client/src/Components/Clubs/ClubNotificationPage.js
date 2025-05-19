import React, { useState, useEffect } from "react";
import "./clubnotification.css";
import axiosInstance from "../../BaseUrl";
import { toast } from "react-toastify";

function ClubNotificationPage({url}) {
  const [useridget, setUseridget] = useState([]);
  // const [user, setuser] = useState([]);

  const getClubNotifications = async () => {
    const libraryid = localStorage.getItem("libraryid");
    try {

      const response = await axiosInstance.post(`/pendingRequests/${libraryid}`)
      setUseridget( response.data)
      console.log(response.data)
    } catch (error) {
      
      // console.log(error);
    }
  };

  

  const handleAccept =(requestId) => {
   
      axiosInstance.put(`/acceptRequest/${requestId}`).then((response)=>{
      if(response.data.message==="Request accepted successfully"){
        toast.success("You accepted the request")
        getClubNotifications();

      }
    
      
      }
      // console.log("Error accepting request:");
      )
  };

  const handleReject =  (requestId) => {
    axiosInstance.put(`/rejectRequest/${requestId}`).then((response)=>{
      if(response.data.message==="Request rejected successfully"){
        toast.warning("You rejected the request")
        getClubNotifications();

      }
    
      
      }
      )    
  };

  useEffect(() => {
    getClubNotifications();
  }, []);

  return (
    <div>
      <div class="container text-center">
        <div class="row">
        {useridget.length?useridget.map((data)=>{
          return(
            <div className="card col-3" id="carddesign">
            <div class="top-section">
              <img
              src={`${url}/${data.userId.image.originalname}`}
                class="card-img-top"
                id="clubnotifyimag"
                alt="..."
              ></img>
            </div>
            <div class="container bottom-section mt-3">
              <h5 class="card-title">name :{data.userId.firstname}</h5>
              <p class="card-text">
                Gender:{data.userId.gender} <br />
                Street:{data.userId.street} <br />
                City: {data.userId.city}<br />
                State:{data.userId.state}
                <br />
                Pin code:{data.userId.pincode}
                <br />
                Email:{data.userId.email}
                <br />
                Nationality:{data.userId.nationality}
              </p>
              <div className="row">
                <div className="col-6">
                  <button className="btn btn-primary" onClick={() => handleAccept(data._id)}>Accept</button>
                </div>
                <div className="col-6">
                  <button className="btn btn-primary" onClick={() => handleReject(data._id)}>Reject</button>
                </div>
              </div>
            </div>
          </div>

          )
        }):<div className="no_data" >
        <h1>No Request found</h1>
      </div>}
        </div>
      </div>
    </div>
  );
}

export default ClubNotificationPage;
