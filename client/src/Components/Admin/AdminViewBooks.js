import React from "react";
// import img from "../../Assets/clubicon.jpg";
import './AdminViewBooks.css'
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../../BaseUrl";
import { toast } from "react-toastify";

function AdminViewBooks({url}) {

    const [data,setData]=useState([])
    const uid=localStorage.getItem('userid')

  useEffect(()=>{

  axiosInstance.post(`/viewAllBooks/${uid}`)
  .then((res)=>{
    console.log(res);
    setData(res.data.data)
  })
  .catch((err)=>{
    console.log(err);
  })

  },[uid])

  const handleRemove = (id) => {
    axiosInstance.post(`/deleteBook/${id}`)
      .then((res) => {
        console.log(res);
        if(res.data.status===200){
            toast.success('Removed')
            setData(prevArray => prevArray.filter(item => item._id !== id));
            // window.location.reload()
        }else{
            // alert.warning('Employee Already Exist')
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="admin-view-book" >
        <Link to='/admin_addbook'>
        <div className="admin-view-book-add text-center" >
        <i class="ri-add-fill"></i>
        <p>Add Book</p>
        </div>
        </Link>
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
              <div class="admin-book-bottom-section container">
                <h4 class="card-title mt-3">{a.bookname}</h4>
                <h6 class="card-text">
                  Author: {a.authername}</h6>
                  <h6 class="card-text">Publisher: {a.publisher}</h6>
                 <h6 class="card-text" >Publishing Year: {a.publisheryear}</h6>
                
                <div className="col text-center pt-3">
                  <Link to={`/admin_editbook/${a._id}`}><button className="btn btn-primary text-center">
                    Edit
                  </button></Link>
                  <button className="btn btn-primary text-center" onClick={() => handleRemove(a._id)}>
                    Remove
                  </button>
                </div>
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
  );
}

export default AdminViewBooks;
