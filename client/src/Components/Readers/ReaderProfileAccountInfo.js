import React, { useEffect, useState } from 'react'
import '../Readers/ReaderProfileAccountInfo.css'
import img from '../../Assets/accountInfo.png'
import axiosInstance from '../../BaseUrl'
import { Link } from 'react-router-dom'

function ReaderProfileAccountInfo() {

  const [data,setData]=useState({dob:''})
  const id=localStorage.getItem('userid')
  console.log(id);

  useEffect(()=>{

  axiosInstance.post(`/viewUserById/${id}`)
  .then((res)=>{
    console.log(res);
    setData(res.data.data)
  })
  .catch((err)=>{
    console.log(err);
  })

  },[id])

  const date= new Date()
  let year=date.getFullYear()
  console.log(year)

  const calculateAge = (dobString) => {
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };
  

  return (
    <div className='reader_profile_account_info' >
      <div className='reader_profile_account_info_details row' >
        <div className='col-7  reader_profile_account_info_fulldetails ' >
          <p>Account Info</p>
          <div className='reader_profile_account_info_fulldetails_box mb-3' >
            <p>Name</p>
            <p>{data.firstname} {data.lastname}</p>
          </div>
          <div className='reader_profile_account_info_fulldetails_box mb-3' >
            <p>Gender</p>
            <p>{data.gender}</p>
          </div>
          <div className='reader_profile_account_info_fulldetails_box mb-3' >
            <p>Age</p>
            <p>{data.dob ? (calculateAge(data.dob) >= 0 ? calculateAge(data.dob) : "Invalid DOB") : ""}</p>


          </div>
          <div className='reader_profile_account_info_fulldetails_box mb-3' >
            <p>Contact</p>
            <p>{data.mobile}</p>
          </div>
          <div className='reader_profile_account_info_fulldetails_box mb-3' >
            <p>Email</p>
            <p>{data.email}</p>
          </div>
          <div className='reader_profile_account_info_fulldetails_box mb-3' >
            <p>Street</p>
            <p>{data.street}</p>
          </div>
          <div className='reader_profile_account_info_fulldetails_box mb-3' >
            <p>City</p>
            <p>{data.city}</p>
          </div>
          <div className='reader_profile_account_info_fulldetails_box mb-3' >
            <p>State</p>
            <p>{data.state}</p>
          </div>
          <div className='reader_profile_account_info_fulldetails_box mb-3' >
            <p>Pincode</p>
            <p>{data.pincode}</p>
          </div>
          <div className='reader_profile_account_info_fulldetails_box mb-3' >
            <p>Nationality</p>
            <p>{data.nationality}</p>
          </div>
          <div className='reader_profile_account_info_editbtn ' >
            <Link to='/reader_edit_profile'><button className='btn btn-primary' >Edit</button></Link>
          </div>
        </div>
        <div className='col-5 reader_profile_account_info_image' >
          <img src={img} alt='img' />
        </div>
      </div>
    </div>
  )
}

export default ReaderProfileAccountInfo
