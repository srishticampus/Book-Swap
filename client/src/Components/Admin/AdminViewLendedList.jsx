import React, { useEffect, useState } from 'react';
import axiosInstance from '../../BaseUrl';

function AdminViewLendedList() {
  const [userLendedBooks, setUserLendedBooks] = useState([]);
  const [libraryLendedBooks, setLibraryLendedBooks] = useState([]);
  const id = localStorage.getItem("userid"); 

  useEffect(() => {
    // Fetch lended books by specific user
    axiosInstance
      .post(`/lendedBooksByUser/${id}`)
      .then((res) => {
        setUserLendedBooks(res.data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching user lended books:", err);
      });

    // Fetch all lended books from library
    axiosInstance
      .get('/lended-books/admin')
      .then((res) => {
        setLibraryLendedBooks(res.data.data || []);
      })
      .catch((err) => {
        console.error("Error fetching library lended books:", err);
      });
  }, [id]);

  return (
    <div className="admin_exchange">
      <div className="container">
        {/* Section: User Lended Books */}
        <h3>Lended Books List</h3>
        <div className="admin_exchange_head">
          <div className="row">
            <div className="col">Book Name</div>
            <div className="col">Author Name</div>
            <div className="col">Lended On</div>
            <div className="col">Lended To</div>
          </div>
        </div>

        {userLendedBooks.filter(book => !book.isReturned).length ? (
          userLendedBooks
            .filter(book => !book.isReturned)
            .map((a) => (
              <div className="admin_exchange_body" key={a._id}>
                <div className="container-fluid">
                  <div className="row">
                    <div className="col">{a?.bookid?.bookname}</div>
                    <div className="col">{a?.bookid?.authername}</div>
                    <div className="col">{a?.date?.slice(0, 10)}</div>
                    <div className="col">{a?.userid?.firstname}</div>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="no_data">
            <h1>No Books Found</h1>
          </div>
        )}

        {/* Section: Library Lended Books */}
        <h3 className="mt-5">Library Lended Books</h3>
        <div className="admin_exchange_head">
          <div className="row">
            <div className="col">Book Name</div>
            <div className="col">Author Name</div>
            <div className="col">Lended On</div>
            <div className="col">Lended To</div>
          </div>
        </div>

        {libraryLendedBooks.length ? (
          libraryLendedBooks.map((book) => (
            <div className="admin_exchange_body" key={book._id}>
              <div className="container-fluid">
                <div className="row">
                  <div className="col">{book.bookname}</div>
                  <div className="col">{book.authername}</div>
                  <div className="col">{book.lentDate?.slice(0, 10)}</div>
                  <div className="col">{book.lentTo?.email}</div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no_data">
            <h1>No Library Books Found</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminViewLendedList;







// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../../BaseUrl';

// function AdminViewLendedList() {
//   const [data, setData] = useState([]);
//   const id = localStorage.getItem("userid"); 

//   useEffect(() => {
//     axiosInstance
//       .post(`/lendedBooksByUser/${id}`)
//       .then((res) => {
//         console.log("lended books by user:", res.data);
//         setData(res.data.data || []);
//       })
//       .catch((err) => {
//         console.error("Error fetching lended books:", err);
//       });
//   }, [id]);

//   return (
//     <div className="admin_exchange">
//       <div className="container">
//         <h3>Lended Books List</h3>
//         <div className="admin_exchange_head">
//           <div className="row">
//             <div className="col">Book Name</div>
//             <div className="col">Author Name</div>
//             <div className="col">Lended On</div>
//             <div className="col">Lended To</div>
//           </div>
//         </div>

//         {data.filter(book => !book.isReturned).length ? (
//           data
//             .filter(book => !book.isReturned)
//             .map((a) => (
//               <div className="admin_exchange_body" key={a._id}>
//                 <div className="container-fluid">
//                   <div className="row">
//                     <div className="col">{a?.bookid?.bookname}</div>
//                     <div className="col">{a?.bookid?.authername}</div>
//                     <div className="col">{a?.date?.slice(0, 10)}</div>
//                     <div className='col'>{a?.userid?.firstname}</div>
//                   </div>
//                 </div>
//               </div>
//             ))
//         ) : (
//           <div className="no_data">
//             <h1>No Books Found</h1>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminViewLendedList;
