import React, { useEffect, useState } from "react";
import "./ReaderEditProfile.css";
import axiosInstance from "../../BaseUrl";
import { useNavigate } from "react-router-dom";

function ReaderEditProfile({url}) {
    const [data,setData]=useState({image:{filename:''}})
    const id=localStorage.getItem('userid')
  const navigate=useNavigate();

  useEffect(()=>{

    axiosInstance.post(`/viewUserById/${id}`)
    .then((res)=>{
      console.log(res);
      setData(res.data.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  
    },[])

  const handleChange = (a) => {
    if (a.target.name == "image") {
      setData({ ...data, image: a.target.files[0] });
    } else {
      setData({ ...data, [a.target.name]: a.target.value });
    }
    console.log(data);
  };

  const handleSubmit = (b) => {
    b.preventDefault();

    // Check if the pincode has 6 digits
    if (!/^\d{6}$/.test(data.pincode)) {
      alert("Pincode must have 6 digits");
      return;
    }

    axiosInstance
      .post(`/editUserById/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(data);
        console.log("data entered", res);
        if (res.data.status === 200) {
          alert("Updated");
            navigate("/reader_profile_account_info")
          window.location.reload();
        } else {
          alert("Something went wrong");
        }
      })
      .catch((error) => {
        console.log("error", error);
        alert("Something went wrong");
      });
    console.log(data);
  };

  return (
    <div className="reader_editprofile">
      <div className="container col-sm-12 col-md-12 col-lg-12">
        <div className="reader_editprofile_img" >
            <img src={`${url}/${data.image.filename}`} />
        </div>
        <div className="reader_editprofile_content" >
        <p className="reader_signin_title mt-3 mb-4">{data.firstname} {data.lastname}</p>
        <form onSubmit={handleSubmit}>
          <div className="row ">
            <div className="col-6 pb-3 reader_signin_inputs">
              <input
                type="text"
                className="form-label"
                placeholder="First Name"
                name="firstname"
                onChange={handleChange}
                required
                value={data.firstname}
                title="Please fill the field"
              />
            </div>
            <div className="col-6 pb-3 reader_signin_inputs">
              <input
                type="text"
                placeholder="Last Name"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
                required
              />
            </div>
            <div className="col-12 pb-3 reader_signin_inputs">
              <input
                type="email"
                placeholder="Enter Email address"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
              />
            </div>
            {/* <div className="col-12 pb-3 reader_signin_inputs">
                  <input type="password" placeholder="New Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" name="password" onChange={handleChange} required />
                </div>
                <div className="col-12 pb-3 reader_signin_inputs">
                  <input type="password" placeholder="Confirm Password" pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" name="confirmpassword" onChange={handleChange} required />
                </div> */}
            {/* <div className="col-12 pb-3 reader_signin_inputs w-50">
              <label className="pb-3">Date of Birth</label>
              <input
                type="date"
                placeholder="Confirm Password"
                name="dob"
                onChange={handleChange}
                value={data.dob}
                required
              />
            </div> */}

            {/* <div className="col-12 pb-3 ">
                  <label className="pb-3">Gender :</label>
                  <label for="male">&nbsp; Male &nbsp;</label>
                  <input type="radio" id="male" name="gender" value='Male' onChange={handleChange} required />
                  <label for="female">&nbsp; Female &nbsp;</label>
                  <input type="radio" id="female" name="gender" value='Female' onChange={handleChange} required />
                </div> */}
            <div className="col-12 pb-3 reader_signin_inputs">
              <label className="pb-3">Address</label>
              <input
                type="text"
                placeholder="Enter the street name"
                name="street"
                onChange={handleChange}
                value={data.street}
                required
              />
            </div>
            <div className="col-12 pb-3 reader_signin_inputs">
              <input
                type="text"
                placeholder="Enter the city"
                name="city"
                onChange={handleChange}
                value={data.city}
                required
              />
            </div>
            <div className="col-12 pb-3 reader_signin_inputs">
              <input
                type="text"
                placeholder="Enter the state"
                name="state"
                onChange={handleChange}
                value={data.state}
                required
              />
            </div>
            <div className="col-6 pb-3 reader_signin_inputs">
              <input
                type="text"
                placeholder="District"
                name="district"
                onChange={handleChange}
                value={data.district}
                required
              />
            </div>
            <div className="col-6 pb-3 reader_signin_inputs">
              <input
                type="number"
                pattern="[0-9]{6}"
                value={data.pincode}
                placeholder="Pincode"
                name="pincode"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 pb-3 reader_signin_inputs w-50">
              <select name="nationality" onChange={handleChange} value={data.nationality} required >
                <option>Nationality</option>
                <option value="Canada">Canada</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="India">India</option>
                <option value="France">France</option>
                <option value="Germany">Germany</option>
                <option value="Japan">Japan</option>
                <option value="China">China</option>
                <option value="Brazil">Brazil</option>
                <option value="Mexico">Mexico</option>
                <option value="Spain">Spain</option>
                <option value="Italy">Italy</option>
                <option value="Russia">Russia</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="South Africa">South Africa</option>
              </select>
            </div>
            <div className="col-12 pb-3 reader_signin_inputfile">
              <label className="pb-3">Select an Image</label>
              <input
                type="file"
                placeholder="Enter the street name"
                className="w-100"
                name="image"
                onChange={handleChange}
              />
            </div>
            <div className="col-12 pb-3 reader_signin_inputbutton text-center">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              {/* <button type="reset" className="btn btn-primary">Cancel</button> */}
            </div>
            <div className="col-12 reader_signin_link">
              {/* <p>
                    Already have an account ? <Link to='/reader_loginpage' >Login</Link>
                  </p> */}
            </div>
          </div>
        </form>
        </div>

        
      </div>
    </div>
  );
}

export default ReaderEditProfile;
