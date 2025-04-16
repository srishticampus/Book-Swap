import React, { useEffect, useState } from "react";
import "../Readers/ReaderSignin.css";
import img from "../../Assets/Signin.png";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../../BaseUrl'
import { readerRegSchema } from "../../Schema";
import { useFormik } from "formik";
import { toast } from "react-toastify";

function ReaderSignin() {

  const navigate=useNavigate();
  
  const onSubmit=(e)=>{
    e.preventDefault();
    axiosInstance
      .post(`/adduser`, values, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.status === 200) {
          axiosInstance
        .post(`/userlogin`,{email:values.email,password:values.password})
        .then((res) => {
          console.log("data entered", res);
          if (res.status === 200) {
            toast.success("Registered Successfully");
            localStorage.setItem("token", res.data.token);
          localStorage.setItem("userid", res.data.id);
          navigate("/reader_home");
          } else {
            console.log(res);

            toast.error("Something went wrong");
          }
        })
        .catch((error) => {
          console.log("error", error);
          toast.error("Something went wrong");
        });
          // navigate("/reader_loginpage")
          // window.location.reload();
        } else if(res.data.status==409){
          toast.warning(res.data.msg);
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("Something went wrong");
      });
  }

  const { values, errors, touched, handleBlur,setFieldValue, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        firstname: '',
        lastname:'',
        email: '',
        password: '',
        confirmpassword: '',
        dob: '',
        gender: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        mobile:'',
        district:'',
        nationality:'',
        image:''
      },
      validationSchema: readerRegSchema,
      validateOnChange: true,
      onSubmit,
    });

    const handleImageChange = (event) => {
      setFieldValue('image', event.currentTarget.files[0]);
    };
    // useEffect(()=>{
    //   console.log(values);

    // })

    console.log(errors);

  return (
    <div className="reader_signin">
      <div class="container">
        <div class="row">

          <div class="col-sm-12 col-md-6 col-lg-6 reader_signin_img">
            <img src={img} alt="images" className="img-fluid"/>

          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <p className="reader_signin_title">Create a new account</p>
            <form onSubmit={onSubmit}>
              <div className="row ">
                <div className="col-6 pb-3 reader_signin_inputs">
                  <input type="text" className="form-label" placeholder="First Name" name="firstname" value={values.firstname} onChange={handleChange} onBlur={handleBlur} required title="Please fill the field" />
                  {errors.firstname && touched.firstname && (
              <p className="error">{errors.firstname}</p>
            )}
                </div>
                <div className="col-6 pb-3 reader_signin_inputs">
                  <input type="text" placeholder="Last Name" name="lastname" value={values.lastname} onChange={handleChange} onBlur={handleBlur} required />
                  {errors.lastname && touched.lastname && (
              <p className="error">{errors.lastname}</p>
            )}
                </div>
                <div className="col-12 pb-3 reader_signin_inputs">
                  <input type="email" placeholder="Enter Email address" name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} required />
                  {errors.email && touched.email && (
              <p className="error">{errors.email}</p>
            )}
                </div>
                <div className="col-12 pb-3 reader_signin_inputs">
                  <input type="password" placeholder="New Password"  name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} required />
                  {errors.password && touched.password && (
              <p className="error">{errors.password}</p>
            )}
                </div>
                <div className="col-12 pb-3 reader_signin_inputs">
                  <input type="password" placeholder="Confirm Password"  name="confirmpassword" value={values.confirmpassword} onChange={handleChange} onBlur={handleBlur} required />
                  {errors.confirmpassword && touched.confirmpassword && (
              <p className="error">{errors.confirmpassword}</p>
            )}
                </div>
                <div className="col-12 pb-3 reader_signin_inputs w-50">
                  <label className="pb-3">Date of Birth</label>
                  <input type="date"  name="dob" value={values.dob} onChange={handleChange} onBlur={handleBlur} required />
                  {errors.dob && touched.dob && (
              <p className="error">{errors.dob}</p>
            )}
                </div>

                <div className="col-12 pb-3 ">
                  <label className="pb-3">Gender :</label>
                  <label for="male">&nbsp; Male &nbsp;</label>
                  <input type="radio" id="male" name="gender" value='Male' onChange={handleChange} onBlur={handleBlur} required />
                  <label for="female">&nbsp; Female &nbsp;</label>
                  <input type="radio" id="female" name="gender" value='Female' onChange={handleChange} onBlur={handleBlur} required />
                  {errors.gender && touched.gender && (
              <p className="error">{errors.gender}</p>
            )}
                </div>
                <div className="col-12 pb-3 reader_signin_inputs">
                  <label className="pb-3">Address</label>
                  <input type="text" placeholder="Enter the street name" name="street" value={values.street} onChange={handleChange} onBlur={handleBlur} required />
                  {errors.street && touched.street && (
              <p className="error">{errors.street}</p>
            )}
                </div>
                <div className="col-12 pb-3 reader_signin_inputs">
                  <input type="text" placeholder="Enter the city" name="city" value={values.city} onChange={handleChange} onBlur={handleBlur} required />
                  {errors.city && touched.city && (
              <p className="error">{errors.city}</p>
            )}
                </div>
                <div className="col-12 pb-3 reader_signin_inputs">
                  <input type="text" placeholder="Enter the state" name="state" value={values.state} onChange={handleChange} onBlur={handleBlur} required />
                  {errors.state && touched.state && (
              <p className="error">{errors.state}</p>
            )}
                </div>
                <div className="col-6 pb-3 reader_signin_inputs">
                  <input type="text" placeholder="District" name="district" value={values.district} onChange={handleChange} onBlur={handleBlur} required />
                  {errors.district && touched.district && (
              <p className="error">{errors.district}</p>
            )}
                </div>
                <div className="col-6 pb-3 reader_signin_inputs">
                  <input type="number"  placeholder="Pincode" name="pincode" value={values.pincode} onChange={handleChange} onBlur={handleBlur} required />
                  {touched.pincode && errors.pincode && (
              <p className="error">{errors.pincode}</p>
            )}
                </div>
                <div className="col-12 pb-3 reader_signin_inputs w-50">
                  <select name="nationality"  onChange={handleChange} onBlur={handleBlur} required >
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
                  {errors.nationality && touched.nationality && (
              <p className="error">{errors.nationality}</p>
            )}
                </div>
                <div className="col-12 pb-3 reader_signin_inputs w-50">
                <input type="number" placeholder="Contact" name="mobile" value={values.mobile} onChange={handleChange} onBlur={handleBlur} required />
                {errors.mobile && touched.mobile && (
              <p className="error">{errors.mobile}</p>
            )}
                </div>
                <div className="col-12 pb-3 reader_signin_inputfile">
                  <label className="pb-3">Select an Image</label>
                  <input
                    type="file"
                    placeholder="Enter the street name"
                    className="w-100"
                    name="image"
                    onChange={handleImageChange} onBlur={handleBlur} required
                  />
                {/* {errors.image && touched.image && (
              <p className="error">{errors.image}</p>
            )} */}
                </div>
                <div className="col-12 pb-3 reader_signin_inputbutton text-center">
                  <button type="submit" className="btn btn-primary">SignUP</button>
                  <button type="reset" className="btn btn-primary">Cancel</button>
                </div>
                <div className="col-12 reader_signin_link">
                  <p>
                    Already have an account ? <Link to='/reader_loginpage' >Login</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReaderSignin;
