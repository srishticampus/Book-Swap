import React, { useState } from "react";
import "../../Readers/ReaderForgotpassword.css";
import img from "../../../Assets/readerfogotpass.png";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../BaseUrl";

function LibraryForgotPassword() {
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
      .post("/library_forgotpswd", credentials)
      .then((res) => {
        if (res.data.status === 200) {
          alert("Password reset successful.");
          navigate("/library-login"); // Redirect to library login or appropriate page
        } else {
          alert("Password reset failed. Please try again.");
        }
      })
      .catch((err) => {
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
              <p className="reader_forgot_para1">Reset Your Password</p>
              <p className="reader_forgot_para2 mb-4">
                Enter your email and new password to reset your account.
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

export default LibraryForgotPassword;



// import React, { useState } from "react";
// import "../../Readers/ReaderForgotpassword.css"
// import img from "../../../Assets/readerfogotpass.png";
// import { useNavigate } from "react-router-dom";
// import axiosInstance from "../../../BaseUrl";

// function LibraryForgotPassword() {
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!email) {
//       alert("Please enter your email");
//       return;
//     }

//     const credentials = { email };
//     sendDataToServer(credentials, e);
//   };

//   const sendDataToServer = (credentials, e) => {
//     e.preventDefault();
//     axiosInstance.post(`/libraryforgot`, credentials).then((res) => {
//       if (res.data.status === 200) {
//         navigate('/library_forgotpswdsec'); 
//       } else {
//         alert("Sorry !! Some Internal Issues");
//       }
//     }).catch((err) => {
//       console.error(err);
//       alert("Network or server error occurred.");
//     });
//   };

//   return (
//     <div className="reader_forgot">
//       <div className="container">
//         <div className="row">
//           <div className="col-sm-12 col-md-6 col-lg-6">
//             <img src={img} alt="Library Forgot Password" className="img-fluid" />
//           </div>
//           <div className="col-sm-12 col-md-6 col-lg-6 reader_forgot_col2">
//             <div>
//               <p className="reader_forgot_para1">Password Reset</p>
//               <p className="reader_forgot_para2 mb-5">
//                 To reset your password, enter the email address you use to sign in
//               </p>
//             </div>
//             <div className="reader_forgot_input">
//               <input
//                 type="email"
//                 placeholder="E-Mail Address"
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <button className="btn btn-primary mt-4" onClick={handleSubmit}>
//                 Send Reset Link
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LibraryForgotPassword;
