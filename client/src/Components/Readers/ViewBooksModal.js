import React from 'react';
import axiosInstance from '../../BaseUrl';
import { toast } from 'react-toastify';
import "../Readers/ViewBooksModal.css";

function ViewBooksModal({ show, onClose, books = [], url, userId }) {
  if (!show) return null;

  const lendBook = (bookId) => {
    axiosInstance.post(`/library/lend/${bookId}`, { userId })
      .then((res) => {
        if (res.data.status === 200) {
          toast.success("Book successfully lent!");
          console.log(res);
        } else {
          toast.error(res.data.msg || "Failed to lend book");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error while lending book");
      });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        <h4>Library Books</h4>
        <div className="book-cards">
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book._id} className="book-card">
                <h5>{book?.bookname || "Unknown Title"}</h5>
                <p>Author: {book?.authername || "Unknown"}</p>
                <p>Publisher: {book?.publisher || "Unknown"}</p>
                <p>Year: {book?.publisheryear || "N/A"}</p>
                <p>Available: {book?.isLent ? 'No' : 'Yes'}</p>
                {book.image && (
                  <img
                    src={`${url}/${book?.image.filename}`}
                    alt={book?.bookname || "Book"}
                    className="img-fluid"
                    style={{ width: "100%", height: "auto", marginTop: "10px" }}
                  />
                )}
                <button
                  className='btn btn-primary mt-2'
                  onClick={() => lendBook(book._id)}
                  disabled={book.isLent}
                >
                  {book.isLent ? "Not Available" : "Lend"}
                </button>
              </div>
            ))
          ) : (
            <p>No books available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewBooksModal;






// import React from 'react';
// import "../Readers/ViewBooksModal.css"

// function ViewBooksModal({ show, onClose, books, url }) {
//     if (!show) return null;
//     console.log("Modal Books Response:", books);
//     return (
//         <div className="modal-backdrop">
//             <div className="modal-content">
//                 <button className="close-btn" onClick={onClose}>×</button>
//                 <h4>Library Books</h4>
//                 <div className="book-cards">
//                     {books.length > 0 ? books.map((book) => (
//                         <div key={book._id} className="book-card">
//                             <h5>{book.bookname}</h5>
//                             <p>Author: {book.authername}</p>
//                             <p>Publisher: {book.publisher}</p>
//                             <p>Year: {book.publisheryear}</p>
//                             <p>Available: {book.isLent ? 'No' : 'Yes'}</p>
//                             {book.image && (
//                                 <img
//                                     src={`${url}/${book.image}`}
//                                     alt={book.bookname}
//                                     className="img-fluid"
//                                     style={{ width: "100%", height: "auto", marginTop: "10px" }}
//                                 />
//                             )}
//                             <button className='btn btn-primary mt-2'>Lend</button>
//                         </div>
                        
//                     )) : <p>No books available.</p>}
//                 </div>

//             </div>
//         </div>
//     );
// }

// export default ViewBooksModal;
