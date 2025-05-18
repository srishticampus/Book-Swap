import React, { useState } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../Readers/ReaderViewWishlist.css";
// import img from "../../Assets/bookdemo.png";
import { BsFillHeartFill } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";
import { useEffect } from "react";
import axiosInstance from "../../BaseUrl";
import { toast } from "react-toastify";

function ReaderViewWishlist({ show, setShow, url }) {
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const [data, setData] = useState([]);
  const id = localStorage.getItem("userid");

  useEffect(() => {
    axiosInstance
      .post(`/bookviewwishlist/${id}`)
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleRemove = (id) => {
    axiosInstance.post(`/deletewishlist/${id}`)
      .then((res) => {
        console.log(res);
        if(res.data.status===200){
            toast.success('Removed from wishlist')
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
    <div className="reader_wishlist">
      <Modal dialogClassName="custom-modal" show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <div className="reader_wishlist_main">
          <div className="reader_wishlist_head">
            <p>MY WISHLIST</p>
          </div>
          <div className="reader_wishlist_count">
            <p>Items ({data.length})</p>
          </div>
          <hr />
          {data.length
            ? data.map((a) => {
                return (
                  <div>
                    <div className="reader_wishlist_items mt-4">
                      <div className="reader_wishlist_item_image">
                        <img src={`${url}/${a.bookid.image}`} alt="img" className="img-fluid" />
                      </div>
                      <div className="reader_wishlist_item_content">
                        <h6>{a.bookid.bookname}</h6>
                        <p>
                          Author: {a.bookid.authername}
                          <br />
                          Publisher: {a.bookid.publisher}
                          <br />
                          Publishing Year: {a.bookid.publisheryear}
                          <ReactStars
                    count={5}
                    value={a.bookid.rating} 
                    size={24}
                    activeColor="#ffd700"
                    edit={false}
                  />
                        </p>
                      </div>
                      <div className="reader_wishlist_item_action">
                        <BsFillHeartFill color="red" size="20px" />
                        <br />
                        <button className="btn btn-primary" onClick={()=>{handleRemove(a._id)}} >Remove</button>
                      </div>
                    </div>
                    <hr />
                  </div>
                );
              })
            :<div className="no_data"><h1>No items in wishlist</h1></div>}
        </div>
      </Modal>
    </div>
  );
}

export default ReaderViewWishlist;
