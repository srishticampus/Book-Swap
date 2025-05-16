import React, { useEffect, useState } from 'react'
// import img from "../../Assets/bookdemo.png";
// import { BsFillHeartFill } from "react-icons/bs";
// import ReactStars from "react-rating-stars-component";
import "../Readers/ReaderProfileNotification.css";
import axiosInstance from '../../BaseUrl';
import { toast } from 'react-toastify';

function ReaderProfileClub({url}) {
  const[data,setData]=useState([])
  const id=localStorage.getItem('userid')
  console.log(id);

  useEffect(()=>{
      axiosInstance.post(`/getAcceptedRequestForuser/${id}`)
      .then((res)=>{
        console.log(res);
        setData(res.data)
      })
      .catch((err)=>{
        console.log(err);
      })
  
  },[id])

  const removeclub=(id)=>{
    axiosInstance.post(`/deleteClubMember/${id}`)
    .then((res)=>{
      console.log(res);
      if(res.data.status===200){
        toast.success("Sucessfully Left")
        setData(prevArray => prevArray.filter(item => item._id !== id));
      }
      else{
        console.log("error else");
      }
      
    })
    .catch((err) => {
      console.log(err);
    });

  }
  return (
    
    <div className="reader_profile_notification">
      <div className="reader_profile_notification_main">
        <div className="reader_profile_notification_head">
        </div>

        <div className="reader_profile_notification_count">
          <p>Items  ({data ? data.length : 0})</p>
        </div>
        <hr />
        <div>
        {
          data&&data.length?data.map((a)=>{
            return(

          <div className="reader_profile_notification_items mt-4">
            <div className="reader_profile_notification_item_image">
              <img src={`${url}/${a.clubId.image}`} alt='img' className="img-fluid" />
              {console.log(`${url}/${a.clubId.image}`)}
            </div>
            <div className="reader_profile_notification_item_content">
              <h6>{a.clubId.clubname}</h6>
              
              <p>
                Reg No: {a.clubId.regno}
                <br />
                {a.clubId.contact}
                <br />
                {a.clubId.email}
              
              </p>
            </div>
            <div className="reader_profile_notification_item_action">
             
              <button className="btn btn-primary" onClick={()=>removeclub(a._id)}>Remove</button>
            </div>
          </div>
                      )
                    }):<div className="no_data" >
                    <h1>No Library found</h1>
                  </div>
                  }
          
          <hr />
        </div>

      
        
        {/* // <div>
        //   <div className="reader_profile_notification_items mt-4">
        //     <div className="reader_profile_notification_item_image">
        //       <img src={img} className="img-fluid" />
        //     </div>
        //     <div className="reader_profile_notification_item_content">
        //       <h6>YMCA</h6>
        //       <p>
        //         Reg No: Elara
        //         <br />
        //         1234567890
        //         <br />
        //         Ymca@Gmail.com
              
        //       </p>
        //     </div>
        //     <div className="reader_profile_notification_item_action">
             
        //       <button className="btn btn-primary">Remove</button>
        //     </div>
        //   </div>
        //   <hr />
           
        // </div>
 */}
      </div>
    </div>
  )
}

export default ReaderProfileClub
