import React, { useState } from "react";
import "../../Readers/ReaderForgotpassword.css"
import img from "../../../Assets/readerfogotpass.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../BaseUrl";

function LibraryForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    const credentials = { email };
    sendDataToServer(credentials, e);
  };

  const sendDataToServer = (credentials, e) => {
    e.preventDefault();
    axiosInstance.post(`/libraryforgot`, credentials).then((res) => {
      if (res.data.status === 200) {
        navigate('/library_forgotpswdsec'); 
      } else {
        alert("Sorry !! Some Internal Issues");
      }
    }).catch((err) => {
      console.error(err);
      alert("Network or server error occurred.");
    });
  };

  return (
    <div className="reader_forgot">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <img src={img} alt="Library Forgot Password" className="img-fluid" />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 reader_forgot_col2">
            <div>
              <p className="reader_forgot_para1">Password Reset</p>
              <p className="reader_forgot_para2 mb-5">
                To reset your password, enter the email address you use to sign in
              </p>
            </div>
            <div className="reader_forgot_input">
              <input
                type="email"
                placeholder="E-Mail Address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="btn btn-primary mt-4" onClick={handleSubmit}>
                Send Reset Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibraryForgotPassword;
