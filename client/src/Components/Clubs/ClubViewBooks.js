import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import axiosInstance from '../../BaseUrl';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";


function ClubViewBooks({url}) {

    const [data,setData]=useState([])

  useEffect(()=>{

  axiosInstance.post(`/viewallbookforclub`)
  .then((res)=>{
    console.log(res);
    setData(res.data.data)
  })
  .catch((err)=>{
    console.log(err);
  })

  },[])

  return (
    <div>
      <div className="admin-view-book" >
        {/* <Link to='/admin_addbook'>
        <div className="admin-view-book-add text-center" >
        <i class="ri-add-fill"></i>
        <p>Add Book</p>
        </div>
        </Link> */}
        <div class="container ">
          <div class="row">

        {
            data.length?data.map((a)=>{
                return(
                  <div className="card admin-books col-3" id='carddesign' >
              <div class="admin-book-top-section">
                <img
                  src={`${url}/${a.image}`}
                  class="card-img-top"
                  id="adminclub"
                  alt="..."
                />
              </div>
              <div class="admin-book-bottom-section container ">
                <h4 class="card-title mt-3 mb-2">{a.bookname}</h4>
                <h6 class="card-text col">
                  Author: {a.authername}</h6>
                  <h6 class="card-text">Publisher: {a.publisher}</h6>
                 <h6 class="card-text" >Publishing Year: {a.publisheryear}</h6>
                 <ReactStars
                    count={5}
                    value={a.rating} 
                    size={24}
                    activeColor="#ffd700"
                    edit={false}
                  />
                {/* <div className="col text-center pt-3">
                  <button className="btn btn-primary text-center">
                    Edit
                  </button>
                  <button className="btn btn-primary text-center">
                    Remove
                  </button>
                </div> */}
              </div>
            </div>  
                )
            }):<div className="no_data" >
              <h1>No Books found</h1>
            </div>
        }

            
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClubViewBooks
