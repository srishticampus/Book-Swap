import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axiosInstance from "../../BaseUrl";
import ReactStars from "react-rating-stars-component";
import { BsFillHeartFill } from "react-icons/bs";
import "./ReaderViewBooks.css";
import { toast } from "react-toastify";
function ReaderViewBooks({url}) {

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

  },[])
  const addToWishlist = (bid) => {
    axiosInstance.post('/userwishlist',{userid:uid,bookid:bid})
      .then((res) => {
        console.log(res);
        if(res.data.status==200){
            toast.success('Added to wishlist')
            setData((prevData) =>
          prevData.map((book) =>
            book._id === bid ? { ...book, wishlisted: !book.wishlisted } : book
          )
        );
        }else if(res.data.status==500){
           toast.warning(res.data.msg)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const lend = (bid) => {
    axiosInstance.post('/lendbyuser',{userid:uid,bookid:bid})
      .then((res) => {
        console.log(res);
        if(res.data.status==200){
            toast.success('Lended Successfully')
            // window.location.reload()
        }else if(res.data.status==500){
          toast.warning(res.data.msg)
       }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div>
      <div className="admin-view-book">
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
              <div class="reader-book-top-section">
                <img
                  src={`${url}/${a.image}`}
                  class="card-img-top"
                  id="adminclub"
                  alt="..."
                />
                <button className="btn reader-book-top-section-heart" onClick={() => addToWishlist(a._id)} ><BsFillHeartFill  color={a.wishlisted==true?'red':'grey'} size="20px"  /></button>
              </div>
              <div class="admin-book-bottom-section container">
                <h4 class="card-title mt-2">{a.bookname}</h4>
                <h6 class="card-text">
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
                <div className="col text-center">
                  
                  <button className="btn btn-primary text-center" onClick={() => lend(a._id)}>
                    Lend
                  </button>
                </div>
                
              </div>
            </div>  
                )
            }):<div className="no_data" >
              <h1>No books found</h1>
            </div>
        }

            
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReaderViewBooks;
