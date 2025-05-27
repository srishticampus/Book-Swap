import React, { useEffect, useState } from 'react'
import axiosInstance from '../../BaseUrl';

function ClubViewMembers({url}) {

    const [data, setData] = useState([]);
    const libraryid = localStorage.getItem("libraryid");


    useEffect(() => {
      axiosInstance
        .get(`/acceptedRequests/${libraryid}`)
        .then((res) => {
          console.log("response",res);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, [libraryid]
    );

    const date = new Date();
    let year = date.getFullYear();

    const remove=(id)=>{
      axiosInstance
        .delete(`/deleteMember/${id}`)
        .then((res) => {
          console.log(res);
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

    }

    
 
  return (
    <div>
      <div className="admin-view-book">
        <div class="container ">
          <div class="row">
            {data.length ? (
              data.map((a) => {
                return (
                  <div className="card admin-books col-3" id="carddesign">
                    <div class="admin-user-top-section">
                      <img
                        src={`${url}/${a.userId.image.filename}`}
                        class="card-img-top"
                        id="adminclub"
                        alt="..."
                      />
                    </div>
                    <div class="admin-book-bottom-section container">
                      <h4 class="card-title mt-2 text-center">
                        {a.userId.firstname} {a.userId.lastname}
                      </h4>
                      <p class="card-title text-center">
                        Age: {year - a.userId.dob.slice(0, 4)}
                      </p>
                      <h6 class="card-text"><i class="ri-phone-fill"></i> {a.userId.mobile}</h6>
                      <h6 class="card-text"><i class="ri-mail-line"></i> {a.userId.email}</h6>
                      <h6 class="card-text"><i class="ri-map-pin-fill"></i> {a.userId.street} {a.city}</h6>
                      <h6 class="card-text"><i class="ri-map-pin-fill"></i> {a.userId.district}</h6>
                      <h6 class="card-text"><i class="ri-map-pin-fill"></i> {a.userId.state}</h6>
                      <div className="col text-center">
                  
                  <button className="btn btn-primary text-center" onClick={() => remove(a.userId._id)}>
                    Remove
                  </button>
                </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="no_data">
                <h1>No Users found</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClubViewMembers




// UNTOUCHED CODE BELOW

// import React, { useEffect, useState } from 'react'
// import axiosInstance from '../../BaseUrl';

// function ClubViewMembers({url}) {

//     const [data, setData] = useState([]);
//     const clubId = localStorage.getItem("clubid");


//     useEffect(() => {
//       axiosInstance
//         .post(`/getAcceptedRequestForClub/${clubId}`)
//         .then((res) => {
//           console.log(res);
//           setData(res.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//     }, []
//     );

//     const date = new Date();
//     let year = date.getFullYear();

//     const remove=(id)=>{
//       axiosInstance
//         .post(`/deleteClubMember/${id}`)
//         .then((res) => {
//           console.log(res);
//           setData(res.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         });

//     }

    
 
//   return (
//     <div>
//       <div className="admin-view-book">
//         <div class="container ">
//           <div class="row">
//             {data.length ? (
//               data.map((a) => {
//                 return (
//                   <div className="card admin-books col-3" id="carddesign">
//                     <div class="admin-user-top-section">
//                       <img
//                         src={`${url}/${a.userId.image.filename}`}
//                         class="card-img-top"
//                         id="adminclub"
//                         alt="..."
//                       />
//                     </div>
//                     <div class="admin-book-bottom-section container">
//                       <h4 class="card-title mt-2 text-center">
//                         {a.userId.firstname} {a.userId.lastname}
//                       </h4>
//                       <p class="card-title text-center">
//                         Age: {year - a.userId.dob.slice(0, 4)}
//                       </p>
//                       <h6 class="card-text"><i class="ri-phone-fill"></i> {a.userId.mobile}</h6>
//                       <h6 class="card-text"><i class="ri-mail-line"></i> {a.userId.email}</h6>
//                       <h6 class="card-text"><i class="ri-map-pin-fill"></i> {a.userId.street} {a.city}</h6>
//                       <h6 class="card-text"><i class="ri-map-pin-fill"></i> {a.userId.district}</h6>
//                       <h6 class="card-text"><i class="ri-map-pin-fill"></i> {a.userId.state}</h6>
//                       <div className="col text-center">
                  
//                   <button className="btn btn-primary text-center" onClick={() => remove(a.userId._id)}>
//                     Remove
//                   </button>
//                 </div>
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <div className="no_data">
//                 <h1>No Users found</h1>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default ClubViewMembers
