
import React, { useEffect, useState } from 'react'
import img from "../../Assets/img1.jpeg"
import "../Clubs/ClubProfile.css"
import { IoIosCall } from 'react-icons/io';
import { AiOutlineMail } from 'react-icons/ai'
import { FaLocationDot } from 'react-icons/fa6'
import { HiMiniArrowRightOnRectangle } from 'react-icons/hi2'
import axios from 'axios';
import axiosInstance from '../../BaseUrl';
import { toast } from 'react-toastify';
import { Toast } from 'bootstrap';
import { Link } from 'react-router-dom';

function ClubProfile({url}) {
    const[data,setData]=useState({image:{filename:''}})
    const id=localStorage.getItem("clubid")
    const token=localStorage.getItem("token")

    console.log(id);

    useEffect(()=>{
        axiosInstance.post(`/viewClubbyid/${id}`)
        .then((result)=>{
          console.log(result);
          setData(result.data.data)
          console.log(result.data.data);
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
      // if (!/^\d{6}$/.test(data.pincode)) {
      //   alert("Pincode must have 6 digits");
      //   return;
      // }
  
      axiosInstance.post(`/clubeditbyid/${id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(data);
          console.log("data entered", res);
          if (res.data.status === 200) {
            toast.success("Updated successfully");

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

    <div id='allclubprofile' className='container'>
      <div className=" row">

        <div className='clubprofile-division col-lg-4 '>
          <form>
            <center>
              <img src={`${url}/${data.image}`} />
              <h1>{data ? data.clubname : ""}
              
              </h1>
              <div className='clubprofile-details'>
                <table cellPadding={5}>
                  <tr>
                    <td>Club Name:</td>
                    <td>{data ? data.clubname : ""}</td>
                  </tr>
                  <tr>
                    <td>Register No:</td>
                    <td>{data ? data.regno : ""}</td>
                  </tr>
                  <tr>
                    <td><IoIosCall style={{ fontSize: 20 }} />Contact No:</td>
                    <td>{data ? data.contact : ""}</td>
                  </tr>
                  <tr>
                    <td><AiOutlineMail style={{ fontSize: 20 }} />Email:</td>
                    <td>{data ? data.email : ""}</td>
                  </tr>
                  <tr>
                    <td><FaLocationDot style={{ fontSize: 20 }} />Location:</td>
                    <td>{data ? data.street : ""}</td>

                  </tr>
                </table>
              </div>
              <h4>{data ? data.city : ""}</h4>
              <h4>{data ? data.district : ""}</h4>
              <h4>{data ? data.state : ""}</h4>


              <Link to='/' className='text-decoration-none' ><button type='button' className='form-control'><HiMiniArrowRightOnRectangle style={{ fontSize: 20 }} />Logout</button></Link>
            </center>
          </form>
        </div>


        <div className='clubprofile-editprofile col-lg-8'>
          <form onSubmit={handleSubmit}>
            <h1>EDIT PROFILE</h1>
            <div className='clubprofile-name-no-email'>
              <input type='text' placeholder='Club Name' className='form-control' value={data.clubname} name='clubname' onChange={handleChange} required/><br />
              <input type='text' placeholder='Contact No' className='form-control' value={data.contact} name='contact' onChange={handleChange} required/><br />
              <input type='text' placeholder='Email' className='form-control' value={data.email} name='email' onChange={handleChange} required/><br />
            </div>

            <div className='clubprofile-Address'>
              <label>Address:</label><br />
              <input type='text' placeholder=' Enter the Street name' className='form-control'value={data.street} name='street' onChange={handleChange} required/><br />
              <input type='text' placeholder='Enter the city' className='form-control' value={data.city} name='city' onChange={handleChange} required/><br />
              <input type='text' placeholder='Enter the state ' className='form-control' value={data.state} name='state' onChange={handleChange} required/><br />
            </div>

            <div className='clubprofile-district'>
              <input type='text' placeholder='District' className='form-control' value={data.district} name='district' onChange={handleChange} required
              /><br />
            </div>
            <div className='inputfileclubedit'>
              <input type='file' name='image' onChange={handleChange}/>
              </div>
            <button type='submitt' className='btn btn-primary'>Update</button><br />
          </form>
        </div>

      </div>
    </div>
  );
}

export default ClubProfile;
