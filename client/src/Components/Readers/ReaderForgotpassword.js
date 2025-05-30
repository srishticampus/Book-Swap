import React, { useState } from "react";
import "./ReaderForgotpassword.css";
import img from "../../Assets/readerfogotpass.png";
import "../Readers/ReaderForgotpassword.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../BaseUrl";

function ReaderForgotpassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !newPassword) {
      alert("Please enter both email and new password.");
      return;
    }

    const credentials = { email, password: newPassword };

    axiosInstance
      .post(`/userforgotpassword`, credentials)
      .then((res) => {
        if (res.data.status === 200) {
          alert("Password reset successful.");
          navigate("/reader_loginpage"); // Or wherever you want to redirect
        } else {
          alert("Password reset failed. Please try again.");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Server error. Try again later.");
      });
  };

  return (
    <div className="reader_forgot">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <img src={img} alt="Password Reset" className="img-fluid" />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 reader_forgot_col2">
            <div>
              <p className="reader_forgot_para1">Reset Your Password</p>
              <p className="reader_forgot_para2 mb-4">
                Enter your email and new password to reset your account password.
              </p>
            </div>
            <form className="reader_forgot_input" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button type="submit" className="btn btn-primary mt-4">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReaderForgotpassword;
