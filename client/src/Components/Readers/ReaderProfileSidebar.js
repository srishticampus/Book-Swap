import React, { useEffect, useState } from "react";
import "../Readers/ReaderProfileSidebar.css";
import { Link } from "react-router-dom";
// import img from "../../Assets/Signin.png";
import axiosInstance from "../../BaseUrl";

function ReaderProfileSidebar() {

  const [data,setData]=useState({dob:'',image:{filename:''}})
  const id=localStorage.getItem('userid')

  useEffect(()=>{

    axiosInstance.post(`/viewUserById/${id}`)
    .then((res)=>{
      // console.log(res);
      setData(res.data.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  
    },[id])

    const url = "http://localhost:4059/"

  return (
    <div className="reader_profile_sidebar">
      <div className="reader_profile_sidebar_img mt-5">
        <Link to='/reader_edit_profile'><img src={`${url}/${data.image.filename}`} alt="profile_picture" /></Link>
        <div className="reader_profile_sidebar_camerabg">
        <Link to='/reader_edit_profile'><i class="ri-camera-line"></i></Link>
        </div>
      </div>
      <div className="reader_profile_sidebar_title">
        <p>{data.firstname} {data.lastname}</p>
      </div>
      <div className="reader_profile_sidebar_settings reader_profile_sidebar_padding ">
        <i class="ri-settings-3-fill reader_profile_sidebar_icons"></i>
        <p>Settings</p>
      </div>
      <hr />
      <div className="reader_profile_sidebar_padding ">
        <Link to='/reader_profile_account_info' >
          <div className="reader_profile_sidebar_account_info">
            <div className="d-flex mt-2">
              <i class="ri-user-2-fill reader_profile_sidebar_icons"></i>
              <p> Account Info</p>
            </div>

            <div className="mt-2">
              <i class="ri-arrow-right-s-line reader_profile_sidebar_icons"></i>
            </div>
          </div>
        </Link>
      </div>

      <div className="reader_profile_sidebar_padding ">
        <Link to='/reader_profile_notification' >
        <div className="reader_profile_sidebar_account_info">
          <div className="d-flex mt-2 ">
            <i class="ri-notification-3-fill reader_profile_sidebar_icons"></i>{" "}
            <p> Notifications</p>
          </div>

          <div className="mt-2">
            <i class="ri-arrow-right-s-line reader_profile_sidebar_icons"></i>
          </div>
        </div>
        </Link>
        
      </div>
      <div className="reader_profile_sidebar_padding ">
        <Link to='/reader_profile_club' >
        <div className="reader_profile_sidebar_account_info">
          <div className="d-flex mt-2">
            <i class="ri-book-open-fill reader_profile_sidebar_icons"></i>
            <p> Library</p>
          </div>

          <div className="mt-2">
            <i class="ri-arrow-right-s-line reader_profile_sidebar_icons"></i>
          </div>
        </div>
        </Link>
        
      </div>
      <div className="reader_profile_sidebar_padding ">
        <Link to='/reader_profile_donation' >
        <div className="reader_profile_sidebar_account_info">
          <div className="d-flex mt-2">
            <i class="ri-hand-heart-fill reader_profile_sidebar_icons"></i>
            <p> Donation</p>
          </div>

          <div className="mt-2">
            <i class="ri-arrow-right-s-line reader_profile_sidebar_icons"></i>
          </div>
        </div>
        </Link>
        
      </div>
      <div className="reader_profile_sidebar_padding ">
        <Link to='/reader_profile_help' >
        <div className="reader_profile_sidebar_account_info">
          <div className="d-flex mt-2">
            <i class="ri-question-fill reader_profile_sidebar_icons"></i>
            <p> Help</p>
          </div>

          <div className="mt-2">
            <i class="ri-arrow-right-s-line reader_profile_sidebar_icons"></i>
          </div>
        </div>
        </Link>
        
      </div>
      <div className="reader_profile_sidebar_padding ">
        <Link to='/reader_profile_privacy' >
        <div className="reader_profile_sidebar_account_info">
          <div className="d-flex mt-2">
            <i class="ri-error-warning-fill reader_profile_sidebar_icons"></i>
            <p> Privacy & Security</p>
          </div>

          <div className="mt-2">
            <i class="ri-arrow-right-s-line reader_profile_sidebar_icons"></i>
          </div>
        </div>
        </Link>
        
      </div>
      {/* <Link to='/' ><div className="reader_profile_sidebar_logoybtn mt-4 mb-4">
        <button className="btn btn-secondary">
          <i class="ri-logout-box-r-line"></i> logout
        </button>
      </div></Link> */}
      <div className="reader_profile_sidebar_logoybtn mt-4 mb-4">
  <button
    className="btn btn-secondary"
    onClick={() => {
      localStorage.setItem("userlogin", false); // or localStorage.removeItem("userlogin");
      localStorage.removeItem("userid"); // optional: clear other user-specific data
      window.location.href = "/book_swap"; // redirect to homepage
    }}
  >
    <i className="ri-logout-box-r-line"></i> Logout
  </button>
</div>

    </div>
  );
}

export default ReaderProfileSidebar;
