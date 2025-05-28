import React, { useState, useEffect } from "react";
import "../Readers/ReaderProfileNotification.css";

// import img from "../../Assets/bookdemo.png";

// import ReactStars from "react-rating-stars-component";
import "../Readers/ReaderProfileNotification.css";
import axiosInstance from "../../BaseUrl";
import { toast } from "react-toastify";

function ReaderProfileNotification() {

  let userId = localStorage.getItem('userid')
  const [requests, setRequests] = useState([]);

  // useEffect(() => {

  //   axiosInstance
  //     .get(`/exchangerequests/${userId}`)
  //     .then((res) => {
  //       if (res.data.status === 500) {
  //         console.log(res);
  //         setRequests([]);
  //       } else {
  //         console.log(res);
  //         setRequests(res.data.data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // },[]);

  useEffect(() => {
    axiosInstance
      .get('/exchangerequests/' + userId)
      .then((res) => {
        if (res.data.status === 500) {
          console.log(res.data);
          setRequests([]);
        } else {
          console.log(res);
          setRequests(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);


  const accept = (id) => {
    axiosInstance.put(`/acceptExchangeRequest/${id}`, { userId: userId })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success('Approved')
          setRequests(prevArray => prevArray.filter(item => item._id !== id));

          // window.location.reload()
        } else if (res.data.status === 500) {
          toast.warning(res.data.msg)

        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const reject = (id) => {
    axiosInstance.put(`/rejectExchangeRequest/${id}`, { userId: userId })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.success('Rejected')
          setRequests(prevArray => prevArray.filter(item => item._id !== id));
        } else if (res.data.status === 500) {
          toast.warning(res.data.msg)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="reader_profile_notification">
      <div className="reader_profile_notification_main">
        <div className="reader_profile_notification_head">
          <p>Exchange request</p>
        </div>
        <hr />
        {
          requests.length ? requests.map((a) => {
            return (
              <div>
                <div className="reader_profile_notification_items mt-4">
                  <div className="reader_profile_notification_item_content">
                    <h6>Book Name : {a.bookname}</h6>
                    <p>
                      Author Name : {a.authername}
                      <br />
                      Discription : {a.discription}
                      <br />
                      {/* <ReactStars
                  count={5}
                  value={3}
                  size={24}
                  activeColor="#ffd700"
                /> */}
                    </p>
                  </div>
                  <div className="reader_profile_notification_item_action">
                    <b>
                      <p>Requested by</p>
                    </b>
                    <p>{a.userid.firstname} {a.userid.lastname}</p>
                    <button className="btn btn-primary" onClick={() => { accept(a._id) }} >Approve</button>
                    <button className="btn btn-primary" onClick={() => { reject(a._id) }}>Reject</button>
                  </div>
                </div>
                <hr />
              </div>
            )
          }) : <div className="no_data" >
            <h1>No New Request</h1>
          </div>
        }


      </div>
    </div>
  );
}

export default ReaderProfileNotification;
