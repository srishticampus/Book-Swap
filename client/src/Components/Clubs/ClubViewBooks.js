import React, { useEffect, useState } from 'react';
import axiosInstance from '../../BaseUrl';
import ReactStars from "react-rating-stars-component";

function ClubViewBooks({ url }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const libraryid = localStorage.getItem("libraryid");
    console.log("Library ID from localStorage:", libraryid);
    if (!libraryid) {
      setErrorMsg("Library ID not found in localStorage");
      setLoading(false);
      return;
    }

    axiosInstance.get(`/viewBooks/${libraryid}`)
      .then((res) => {
        console.log(res)
        if (res.data.msg === "No books found for this library") {
          setData([]);
        } else {
          setData(res.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg("Error fetching books");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-view-book">
      <div className="container">
        <div className="row">
          {errorMsg ? (
            <div className="no_data">
              <h1>{errorMsg}</h1>
            </div>
          ) : data.length > 0 ? (
            data.map((a) => (
              <div className="card admin-books col-3" id="carddesign" key={a._id}>
                <div className="admin-book-top-section">
                  <img
                    src={`${url}/${a.image}`}
                    className="card-img-top"
                    id="adminclub"
                    alt={a.bookname}
                  />
                </div>
                <div className="admin-book-bottom-section container">
                  <h4 className="card-title mt-3 mb-2">{a.bookname}</h4>
                  <h6 className="card-text">Author: {a.authername}</h6>
                  <h6 className="card-text">Publisher: {a.publisher}</h6>
                  <h6 className="card-text">Publishing Year: {a.publisheryear}</h6>
                  <ReactStars
                    count={5}
                    value={a.rating}
                    size={24}
                    activeColor="#ffd700"
                    edit={false}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="no_data">
              <h1>No Books Found</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClubViewBooks;











// import React from 'react'
// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useState } from 'react';
// import axiosInstance from '../../BaseUrl';
// import { Link } from 'react-router-dom';
// import ReactStars from "react-rating-stars-component";


// function ClubViewBooks({url}) {
//   const { clubid } = useParams();
//     const [data,setData]=useState([])

//     useEffect(() => {
//       axiosInstance.get(`/viewBooks/${clubid}`)
//         .then((res) => {
//           console.log(res);
//           setData(res.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }, [clubid]);
    
//     // useEffect(() => {
//     //   axiosInstance.post(`/viewBooks`, { clubid: clubid })
//     //     .then((res) => {
//     //       console.log(res);
//     //       setData(res.data.data);
//     //     })
//     //     .catch((err) => {
//     //       console.log(err);
//     //     });
//     // }, [clubid]);

  

//   return (
//     <div>
//       <div className="admin-view-book" >
//         {/* <Link to='/admin_addbook'>
//         <div className="admin-view-book-add text-center" >
//         <i class="ri-add-fill"></i>
//         <p>Add Book</p>
//         </div>
//         </Link> */}
//         <div class="container ">
//           <div class="row">

//         {
//             data.length?data.map((a)=>{
//                 return(
//                   <div className="card admin-books col-3" id='carddesign' >
//               <div class="admin-book-top-section">
//                 <img
//                   src={`${url}/${a.image}`}
//                   class="card-img-top"
//                   id="adminclub"
//                   alt="..."
//                 />
//               </div>
//               <div class="admin-book-bottom-section container ">
//                 <h4 class="card-title mt-3 mb-2">{a.bookname}</h4>
//                 <h6 class="card-text col">
//                   Author: {a.authername}</h6>
//                   <h6 class="card-text">Publisher: {a.publisher}</h6>
//                  <h6 class="card-text" >Publishing Year: {a.publisheryear}</h6>
//                  <ReactStars
//                     count={5}
//                     value={a.rating} 
//                     size={24}
//                     activeColor="#ffd700"
//                     edit={false}
//                   />
//                 {/* <div className="col text-center pt-3">
//                   <button className="btn btn-primary text-center">
//                     Edit
//                   </button>
//                   <button className="btn btn-primary text-center">
//                     Remove
//                   </button>
//                 </div> */}
//               </div>
//             </div>  
//                 )
//             }):<div className="no_data" >
//               <h1>No Books found</h1>
//             </div>
//         }

            
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ClubViewBooks
