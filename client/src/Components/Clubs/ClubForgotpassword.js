import React,{useState} from "react";
import image from "../../Assets/Rectangle 141 (1) (1).png";
import "./clubforgotpassword.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from '../../BaseUrl';

function ClubForgotpassword() {
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

      console.log("h",credentials);
    }
    const sendDataToServer = (credentials,e) => {
      e.preventDefault();
      axiosInstance.post(`/clubforgotPasswordreq`, credentials).then((res) => {
        console.log(credentials,"n");

       console.log("response",res);
        if (res.data.status === 200) {
          // alert("Request send successful");
     navigate('/club_forgotpswdsec')

        } else {
          alert("Sorry !! Some Internal Issues");
        }
      });
    
    };

  return (
    <div>
      <div className="club_forgot">
        <div class="container">
          <div class="row">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <img src={image} alt="img" className="img-fluid" />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 reader_forgot_col2">
              <div>
                <p className="club_forgot_para1">Password Reset</p>
                <p className="club_forgot_para2 mb-5">
                  To reset your password, Enter the email Address you use to
                  sign in to login form
                </p>
              </div>
              <div className="club_forgot_input">
                <input type="email" placeholder="E-Mail Address" onChange={(e) => setEmail(e.target.value)} />
                <button className="btn btn-primary mt-4" onClick={handlesubmit}>
                  Send Restart Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubForgotpassword;
