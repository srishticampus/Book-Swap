import React, { useEffect, useState } from 'react';
import "../Readers/ReaderProfileNotification.css";
import axiosInstance from '../../BaseUrl';
import { toast } from 'react-toastify';
import ViewBooksModal from './ViewBooksModal'; // Make sure the path is correct

function ReaderProfileClub({ url }) {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const id = localStorage.getItem('userid');

  useEffect(() => {
    axiosInstance.get(`/acceptedLibraries/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const removeclub = (clubId) => {
    axiosInstance.post(`/deleteClubMember/${clubId}`)
      .then((res) => {
        if (res.data.status === 200) {
          toast.success("Successfully Left");
          setData(prev => prev.filter(item => item._id !== clubId));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const viewBooks = (libraryId) => {
    setLoadingBooks(true);
    axiosInstance.get(`/viewBooks/${libraryId}`)
      .then((res) => {
             console.log("Fetched books:", res.data.data);
        setBooks(res.data.data || []);

        setModalOpen(true);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to fetch books");
      })
      .finally(() => {
        setLoadingBooks(false);
      });
  };

  return (
    <div className="reader_profile_notification">
      <div className="reader_profile_notification_main">
        <div className="reader_profile_notification_count">
          <p>Items ({data?.length || 0})</p>
        </div>
        <hr />
        <div>
          {data.length ? data.map((a) => (
            <div key={a._id} className="reader_profile_notification_items mt-4">
              <div className="reader_profile_notification_item_image">
                <img src={`${url}/${a.libraryId?.image?.filename}`} alt='img' className="img-fluid" />
              </div>
              <div className="reader_profile_notification_item_content">
                <h6>{a.libraryId?.clubname}</h6>
                <p>
                  Reg No: {a.libraryId?.regno}
                  <br />
                  {a.libraryId?.contact}
                  <br />
                  {a.libraryId?.email}
                </p>
              </div>
              <div className="reader_profile_notification_item_action">
                <button className="btn btn-primary" onClick={() => removeclub(a._id)}>Remove</button>
              </div>
              <div className="reader_profile_notification_item_action">
                <button className="btn btn-primary" onClick={() => viewBooks(a.libraryId?._id)}>ViewBooks</button>
              </div>
            </div>
          )) : <div className="no_data"><h1>No Library found</h1></div>}
          <hr />
        </div>
      </div>

      {/* Modal */}
      {/* <ViewBooksModal show={modalOpen} onClose={() => setModalOpen(false)} books={books} /> */}
      <ViewBooksModal show={modalOpen} onClose={() => setModalOpen(false)} books={books} url={url} />

    </div>
  );
}

export default ReaderProfileClub;




// import React, { useEffect, useState } from 'react'
// // import img from "../../Assets/bookdemo.png";
// // import { BsFillHeartFill } from "react-icons/bs";
// // import ReactStars from "react-rating-stars-component";
// import "../Readers/ReaderProfileNotification.css";
// import axiosInstance from '../../BaseUrl';
// import { toast } from 'react-toastify';

// function ReaderProfileClub({ url }) {
//   const [data, setData] = useState([])
//   const id = localStorage.getItem('userid')
//   console.log(id);

//   useEffect(() => {
//     axiosInstance.get(`/acceptedLibraries/${id}`)
//       .then((res) => {
//         console.log(res);
//         setData(res.data)
//       })
//       .catch((err) => {
//         console.log(err);
//       })

//   }, [id])

//   const removeclub = (id) => {
//     axiosInstance.post(`/deleteClubMember/${id}`)
//       .then((res) => {
//         console.log(res);
//         if (res.data.status === 200) {
//           toast.success("Sucessfully Left")
//           setData(prevArray => prevArray.filter(item => item._id !== id));
//         }
//         else {
//           console.log("error else");
//         }

//       })
//       .catch((err) => {
//         console.log(err);
//       });

//   }
//   return (

//     <div className="reader_profile_notification">
//       <div className="reader_profile_notification_main">
//         <div className="reader_profile_notification_head">
//         </div>

//         <div className="reader_profile_notification_count">
//           <p>Items  ({data ? data.length : 0})</p>
//         </div>
//         <hr />
//         <div>
//           {
//             data && data.length ? data.map((a) => {
//               return (

//                 <div className="reader_profile_notification_items mt-4">
//                   <div className="reader_profile_notification_item_image">
//                     <img src={`${url}/${a.libraryId?.image.filename}`} alt='img' className="img-fluid" />
//                     {console.log(`${url}/${a.libraryId?.image.filename}`)}
//                   </div>
//                   <div className="reader_profile_notification_item_content">
//                     <h6>{a.libraryId?.clubname}</h6>

//                     <p>
//                       Reg No: {a.libraryId?.regno}
//                       <br />
//                       {a.libraryId?.contact}
//                       <br />
//                       {a.libraryId?.email}

//                     </p>
//                   </div>
//                   <div className="reader_profile_notification_item_action">

//                     <button className="btn btn-primary" onClick={() => removeclub(a._id)}>Remove</button>
//                   </div>
                  
//                   <div className="reader_profile_notification_item_action">

//                     <button className="btn btn-primary">ViewBooks</button>
//                   </div>

//                 </div>
//               )
//             }) : <div className="no_data" >
//               <h1>No Library found</h1>
//             </div>
//           }

//           <hr />
//         </div>

//       </div>
//     </div>
//   )
// }

// export default ReaderProfileClub
