import React, { useState } from "react";
import cimg from "../../Assets/clubreg.png"
import "../Clubs/clubregister.css"

function ClubRegister() {
    const [register,setRegister]=useState({
        clubname: "",
        regno: "",
        email: "",
        password: "",
        confpass: "",
        street: "",
        city: "",
        state: "",
        district: "",
        pin: "",
        file: "",
    })
    const ClubRegister=(e)=>{
        setRegister({...register,[e.target.name]:e.target.value})
      }
      const onSubmitData=(e)=>{
        e.preventdefault()
        console.log(register)
        console.log("Submitted")
      } 
  return (
    <div>
      <div className="clubreg_main">
        <div className="clubreg_image">
          <img src={cimg} />
        </div>

        <div className="clubreg_form">
          <form onSubmit={onSubmitData}>
            <h4>Create a new account</h4>
            <div className="clubname">
              <input
                type="text"
                placeholder="Club Name"
                className="form-control"
                name="clubname"
                onChange={ClubRegister}
              />
            </div>
            <div className="club_regno">
              <input
                type="number"
                placeholder="Reg No"
                className="form-control"
                name="regno"
                onChange={ClubRegister}
              />
            </div>
            <br />
            <div className="clubreg_email">
              <input
                type="email"
                placeholder="Enter your email"
                className="form-control"
                name="email"
                onChange={ClubRegister}
                required
              />
            </div>
            <br />
            <div className="clubreg_password">
              <input
                type="password"
                placeholder="Enter a New Password"
                className="form-control"
                name="password"
                onChange={ClubRegister}
                required
              />
            </div>
            <br />
            <div className="clubreg_cpass">
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-control"
                name="confpass"
                onChange={ClubRegister}
              />
            </div>
            <br />
            <div className="clubreg_address">
              ADDRESS:
              <br />
              <input
                type="text"
                placeholder="Enter the Street Name"
                className="form-control"
                name="street"
                onChange={ClubRegister}
                required
              />
            </div>
            <br />
            <div className="clubreg_address2">
              <input
                type="text"
                placeholder="Enter the City"
                className="form-control"
                name="city"
                onChange={ClubRegister}
              />
            </div>
            <br />
            <div className="clubreg_state">
              <select
                id="country-state"
                name="state"
                className="form-control"
                onChange={ClubRegister}
              >
                <option value="">Select state</option>
                <option value="AN">Andaman and Nicobar Islands</option>
                <option value="AP">Andhra Pradesh</option>
                <option value="AR">Arunachal Pradesh</option>
                <option value="AS">Assam</option>
                <option value="BR">Bihar</option>
                <option value="CH">Chandigarh</option>
                <option value="CT">Chhattisgarh</option>
                <option value="DN">Dadra and Nagar Haveli</option>
                <option value="DD">Daman and Diu</option>
                <option value="DL">Delhi</option>
                <option value="GA">Goa</option>
                <option value="GJ">Gujarat</option>
                <option value="HR">Haryana</option>
                <option value="HP">Himachal Pradesh</option>
                <option value="JK">Jammu and Kashmir</option>
                <option value="JH">Jharkhand</option>
                <option value="KA">Karnataka</option>
                <option value="KL">Kerala</option>
                <option value="LA">Ladakh</option>
                <option value="LD">Lakshadweep</option>
                <option value="MP">Madhya Pradesh</option>
                <option value="MH">Maharashtra</option>
                <option value="MN">Manipur</option>
                <option value="ML">Meghalaya</option>
                <option value="MZ">Mizoram</option>
                <option value="NL">Nagaland</option>
                <option value="OR">Odisha</option>
                <option value="PY">Puducherry</option>
                <option value="PB">Punjab</option>
                <option value="RJ">Rajasthan</option>
                <option value="SK">Sikkim</option>
                <option value="TN">Tamil Nadu</option>
                <option value="TG">Telangana</option>
                <option value="TR">Tripura</option>
                <option value="UP">Uttar Pradesh</option>
                <option value="UT">Uttarakhand</option>
                <option value="WB">West Bengal</option>
              </select>
            </div>
            <br />
            <div className="clubreg_district">
              <select
                id="country-district"
                name="district"
                className="form-control"
                onChange={ClubRegister}
              >
                <option value="select">Select District</option>
              </select>
            </div>
            <div className="clubreg_pincode">
              <input
                type="number"
                placeholder="PINCODE"
                className="form-control"
                name="pin"
                onChange={ClubRegister}
                required
              />
            </div>
            <br />
            <div className="image">
              Select an Image:
              <br />
              <input
                type="file"
                placeholder="Choose file"
                className="form-control"
                name="file"
                onChange={ClubRegister}
                required
              />
            </div>
            <br />
            <div className="register">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <br />
            <div className="reg_login">
              <p id="para">Already Have an Account</p>
              <span className="login_container">
                <a href="login.com">Login</a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClubRegister;
