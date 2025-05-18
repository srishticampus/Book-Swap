import React from 'react'
import '../Clubs/ClubSignin.css'
import img from'../../Assets/Rectangle 141 (1) (1).png'
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from '../../BaseUrl';
import { clubRegSchema } from '../../Schema';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';


function ClubSignin() {


const navigate=useNavigate();

  
const onSubmit=(e)=>{
  e.preventDefault();


  axiosInstance
    .post(`/addclubs`, values, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      if (res.data.status === 200) {
        axiosInstance
      .post(`/clublogin`,{email:values.email,password:values.password})
      .then((res) => {
        console.log("data entered", res);
        if (res.status === 200) {
          console.log(values.email,values.password);
          toast.success("Registereded Successfully");
          localStorage.setItem("token", res.data.token);
        localStorage.setItem("clubid", res.data.id);
        navigate("/club_home");
        } else {
          toast.error("Something went wrong");
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("Something went wrong");
      });
        // navigate("/reader_loginpage")
        // window.location.reload();
      } else if(res.data.status===409){
        toast.warning(res.data.msg);
      }
    })
    .catch((error) => {
      console.log("error", error);
      toast.error("Something went wrong");
    });
}



const { values, errors, touched, handleBlur,setFieldValue, handleChange } =
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
    validationSchema: clubRegSchema,
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
        <div class="col-6 reader_signin_img">
          <img src={img} alt="img"/>
        </div>
        <div className="col-6 ">
          <p className="reader_signin_title">Create a new account</p>
          <form onSubmit={onSubmit} >
            <div className="row ">
              <div className="col-6 pb-3 reader_signin_inputs">
                <input type="text" placeholder="Library Name" name='clubname' value={values.clubname} onChange={handleChange} onBlur={handleBlur} required title="please fill the field"/>
                {errors.clubname && touched.clubname && (
              <p className="error">{errors.clubname}</p>
            )}
              </div>
              <div className="col-6 pb-3 reader_signin_inputs">
                <input type="number" placeholder="Reg No" name='regno' value={values.regno} onChange={handleChange} onBlur={handleBlur} required/>
                {errors.regno && touched.regno && (
              <p className="error">{errors.regno}</p>
            )}
              </div>
              <div className="col-12 pb-3 reader_signin_inputs">
                <input type="email" placeholder="Enter Email address" name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} required/>
                {errors.email && touched.email && (
              <p className="error">{errors.email}</p>
            )}
              </div>
              <div className="col-12 pb-3 reader_signin_inputs" >
                <input type="number" placeholder="Enter contact Number" name='contact' value={values.contact} onChange={handleChange} onBlur={handleBlur} required/>
                {errors.contact && touched.contact && (
              <p className="error">{errors.contact}</p>
            )}
              </div>
              <div className="col-12 pb-3 reader_signin_inputs">
                <input type="password" placeholder="New Password" name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} required/>
                {errors.password && touched.password && (
              <p className="error">{errors.password}</p>
            )}
              </div>
              <div className="col-12 pb-3 reader_signin_inputs">
                <input type="password" placeholder="Confirm Password" name='confirmpassword' value={values.confirmpassword} onChange={handleChange} onBlur={handleBlur} required/>
                {errors.confirmpassword && touched.confirmpassword && (
              <p className="error">{errors.confirmpassword}</p>
            )}
              </div>
              <div className="col-12 pb-3 reader_signin_inputs">
                <label className="pb-3">Address</label>
                <input type="text" placeholder="Enter the street name" name='street' value={values.street} onChange={handleChange} onBlur={handleBlur} required/>
                {errors.street && touched.street && (
              <p className="error">{errors.street}</p>
            )}
              </div>
              <div className="col-12 pb-3 reader_signin_inputs">
                <input type="text" placeholder="Enter the city" name='city' value={values.city} onChange={handleChange} onBlur={handleBlur} required/>
                {errors.city && touched.city && (
              <p className="error">{errors.city}</p>
            )}
              </div>
              <div className="col-12 pb-3 reader_signin_inputs">
                <input type="text" placeholder="Enter the state" name='state' value={values.state} onChange={handleChange} onBlur={handleBlur} required/>
                {errors.state && touched.state && (
              <p className="error">{errors.state}</p>
            )}
              </div>
              <div className="col-6 pb-3 reader_signin_inputs">
                <input type="text" placeholder="District" name='district' value={values.district} onChange={handleChange} onBlur={handleBlur} required/>
                {errors.district && touched.district && (
              <p className="error">{errors.district}</p>
            )}
              </div>
              <div className="col-6 pb-3 reader_signin_inputs">
                <input type="number" placeholder="Pincode" name='pincode' value={values.pincode} onChange={handleChange} onBlur={handleBlur} required/>
                {errors.pincode && touched.pincode && (
              <p className="error">{errors.pincode}</p>
            )}
              </div>
              <div className="col-12 pb-3 reader_signin_inputfile">
                <label className="pb-3">Select an Image</label>
                <input
                  type="file"
                  placeholder="Enter the street name"
                  className="w-100"
                  name='image'
                  onChange={handleImageChange} onBlur={handleBlur} required
                />
             
              </div>
              <div className="col-12 pb-3 reader_signin_inputbutton text-center">
                <button type='submit' className="btn btn-primary" >SignUP</button>
                <button className="btn btn-primary" >Cancel</button>
              </div>
              <div className="col-12 reader_signin_link">
                <p>
                  Already have an account ? <Link to='/library_login'>Login</Link> 
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  )
}

export default ClubSignin