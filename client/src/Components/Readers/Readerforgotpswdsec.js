import React from "react";
import "./Readerforgotpswdse.css";
import img from "../../Assets/readerfogotpass.png";
import imgs from '../../Assets/forgetpswd.png'
import '../Readers/ReaderForgotpassword.css'
import { BsCheckCircle } from "react-icons/bs";

function ReaderForgotpassword() {
  return (
    <div className="reader_forgot">
      <div class="container">
        <div class="row">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <img src={img} alt="img" className="img-fluid" />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 reader_forgot_col2">
            <div>
            <BsCheckCircle className='userForgotPwdAftrreq-check'></BsCheckCircle>
              <p className="" id="readerforgot_2">
                Password Link Send
              </p>
              <p className="readerforgot_3" >
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
  );
}

export default ReaderForgotpassword;
