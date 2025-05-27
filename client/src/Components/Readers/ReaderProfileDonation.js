import React from "react";
// import img from "../../Assets/bookdemo.png";
// import { BsFillHeartFill } from "react-icons/bs";
// import ReactStars from "react-rating-stars-component";
import "../Readers/ReaderProfileNotification.css";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../../BaseUrl";

function ReaderProfileDonation({url}) {
  const [data, setData] = useState([]);
  const id = localStorage.getItem("userid");
  useEffect(() => {
    axiosInstance
      .post(`/viewuserdonatebook/${id}`)
      .then((res) => {
        const responseData = res?.data?.data || [];
        setData(responseData);
      })
      .catch((err) => {
        console.log("Error fetching donations:", err);
        setData([]); // Safe fallback
      });
  }, [id]);
  

  // useEffect(() => {
  //   axiosInstance
  //     .post(`/viewuserbook/${id}`)
  //     .then((res) => {
  //       console.log(res);
  //       setData(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  console.log(data);

  return (
    <div className="reader_profile_notification">
      <div className="reader_profile_notification_main">
        <div className="reader_profile_notification_head">
          <p>my donation</p>
        </div>
        <div className="reader_profile_notification_count">
          <p>Items ({data.length})</p>
        </div>
        <hr />
        {data.length
          ? data.map((a) => {
              return (
                <div>
                  <div className="reader_profile_notification_items mt-4 justify-content-around">
                    <div className="reader_profile_notification_item_image">
                      <img src={`${url}/${a.image}`} alt="img" className="img-fluid" />
                    </div>
                    <div className="reader_profile_notification_item_content">
                      <h6>{a.bookname}</h6>
                      <p>
                        Author: {a.authername}
                        <br />
                        Publisher: {a.publisher}
                        <br />
                        Publishing Year: {a.publisheryear}
                        {/* <ReactStars
                          count={5}
                          value={3}
                          size={24}
                          activeColor="#ffd700"
                        /> */}
                      </p>
                    </div>
                    {/* <div className="reader_profile_notification_item_action">
                      <img src={img} />
                      <b>
                        <p className="mt-3 text-center">YMCA</p>
                      </b>
                    </div> */}
                  </div>
                  <hr />
                </div>
              );
            })
          : <div className="no_data" ><h1>No donations found</h1></div>}

        {/* <div>
          <div className="reader_profile_notification_items mt-4">
            <div className="reader_profile_notification_item_image">
              <img src={img} className="img-fluid" />
            </div>
            <div className="reader_profile_notification_item_content">
              <h6>Whispers Eternity</h6>
              <p>
                Author: Elara
                <br />
                Publisher: Celestial
                <br />
                Publishing Year: 2022
                <ReactStars
                  count={5}
                  value={3}
                  size={24}
                  activeColor="#ffd700"
                />
              </p>
            </div>
            <div className="reader_profile_notification_item_action">
              <img src={img} />
              <b>
                <p className="mt-3 text-center">YMCA</p>
              </b>
            </div>
          </div>
          <hr />
        </div> */}
      </div>
    </div>
  );
}

export default ReaderProfileDonation;
