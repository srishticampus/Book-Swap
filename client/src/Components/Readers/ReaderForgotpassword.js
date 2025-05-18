import React, { useState } from "react";
import "./ReaderForgotpassword.css";
import img from "../../Assets/readerfogotpass.png";
import '../Readers/ReaderForgotpassword.css'
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../BaseUrl';

function ReaderForgotpassword() {
  const[email,setEmail]=useState("")

  const navigate=useNavigate()
    const handlesubmit=(e)=>{
      e.preventDefault()

      if(!email){
        alert("Please enter your mailid")
        return;
      }
      const credentials={email}
      sendDataToServer(credentials,e);

      console.log(credentials);
    }
    const sendDataToServer = (credentials,e) => {
      e.preventDefault();
      axiosInstance.post(`/forgotPasswordreq`, credentials).then((res) => {
        console.log(credentials);

       console.log(res);
        if (res.data.status === 200) {
          // alert("Request send successful");
     navigate('/reader_forgotpswdsec')

        } else {
          alert("Sorry !! Some Internal Issues");
        }
      });
    
    };
  


  return (
    <div className="reader_forgot">
      <div class="container">
        <div class="row">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <img src={img} alt="img" className="img-fluid" />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 reader_forgot_col2">
            <div>
              <p className="reader_forgot_para1">Password Reset</p>
              <p className="reader_forgot_para2 mb-5">
                To reset your password, Enter teh email Address you use to sign
                in to login form
              </p>
            </div>
            <div className="reader_forgot_input">
              <input type="email" placeholder="E-Mail Address" onChange={(e) => setEmail(e.target.value)}/>
              <button className="btn btn-primary mt-4"  onClick={handlesubmit} >
                Send Restart Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReaderForgotpassword;
