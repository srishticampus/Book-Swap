import React, { useEffect, useState } from 'react';
import axiosInstance from '../../BaseUrl';

function ClubViewMembers({ url }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosInstance
      .post('/viewAllUsers') // ✅ Using the new API
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const date = new Date();
  let year = date.getFullYear();

  const remove = (id) => {
    axiosInstance
      .post(`/deleteClubMember/${id}`)
      .then((res) => {
        console.log(res);
      
        setData(prevData => prevData.filter(user => user._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="admin-view-book">
        <div className="container">
          <div className="row">
            {data.length ? (
              data.map((user) => (
                <div className="card admin-books col-3" id="carddesign" key={user._id}>
                  <div className="admin-user-top-section">
                    <img
                      src={`${url}/${user.image?.filename}`} // Adjusted path based on new API structure
                      className="card-img-top"
                      id="adminclub"
                      alt="User"
                    />
                  </div>
                  <div className="admin-book-bottom-section container">
                    <h4 className="card-title mt-2 text-center">
                      {user.firstname} {user.lastname}
                    </h4>
                    <p className="card-title text-center">
                      Age: {year - user.dob?.slice(0, 4)}
                    </p>
                    <h6 className="card-text"><i className="ri-phone-fill"></i> {user.mobile}</h6>
                    <h6 className="card-text"><i className="ri-mail-line"></i> {user.email}</h6>
                    <h6 className="card-text"><i className="ri-map-pin-fill"></i> {user.street}</h6>
                    <h6 className="card-text"><i className="ri-map-pin-fill"></i> {user.district}</h6>
                    <h6 className="card-text"><i className="ri-map-pin-fill"></i> {user.state}</h6>
                    <div className="col text-center">
                      <button className="btn btn-primary text-center" onClick={() => remove(user._id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no_data">
                <h1>No Users found</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubViewMembers;






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
