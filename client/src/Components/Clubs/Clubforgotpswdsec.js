import React from 'react'
import './clubforgotpswdsec.css'
import img from "../../Assets/readerfogotpass.png";
import './clubforgotpassword.css'
import { BsCheckCircle } from "react-icons/bs";

function ClubForgotpassword() {
  return (
    <div className="club_forgot">
    <div class="container">
      <div class="row">
        <div className="col-sm-12 col-md-6 col-lg-6">
          <img src={img} alt="img" className="img-fluid" />
        </div>
        <div className="col-sm-12 col-md-6 col-lg-6 club_forgot_col2">
          <div>
          <BsCheckCircle className='clubForgotPwdAftrreq-check'></BsCheckCircle>
            <p className="" id="clubforgot_2">
              Password Link Send
            </p>
            <p className="clubforgot_3" >
              Please Check Your Inbox Inform@informtemplate.lo
            </p>

          </div>
          {/* <div className="reader_forgot_input">
            <input type="email" placeholder="E-Mail Address" />
            <button className="btn btn-primary mt-4">
              Send Restart Link
            </button>
          </div> */}
        </div>
      </div>
    </div>
  </div>

  )
}

export default ClubForgotpassword;
