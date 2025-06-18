// edit function is handled on club donatebook page


// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../../../BaseUrl';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';

// function EditBook() {
//   const navigate = useNavigate();
//   const { id } = useParams(); // Book ID from URL

//   const [formData, setFormData] = useState({
//     bookname: '',
//     authername: '',
//     publisher: '',
//     publisheryear: '',
//     count: 1,
//     image: null, // file object
//   });

//   const [loading, setLoading] = useState(true);

//   // Temporarily prefill data since GET API doesn't exist
//   useEffect(() => {
//     console.log('Book ID:', id);

//     // Prefill mock data for now
//     setFormData({
//       bookname: 'Sample Book Title',
//       authername: 'Sample Author',
//       publisher: 'Sample Publisher',
//       publisheryear: '2023',
//       count: 5,
//       image: null,
//     });

//     setLoading(false);
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'image') {
//       setFormData((prev) => ({ ...prev, image: files[0] }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const dataToSend = new FormData();
//     dataToSend.append('bookname', formData.bookname);
//     dataToSend.append('authername', formData.authername);
//     dataToSend.append('publisher', formData.publisher);
//     dataToSend.append('publisheryear', formData.publisheryear);
//     dataToSend.append('count', formData.count);
//     if (formData.image) {
//       dataToSend.append('image', formData.image);
//     }

//     axiosInstance.post(`/library/edit/${id}`, dataToSend, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     })
//       .then(() => {
//         toast.success('Book updated successfully');
//         navigate('/library_view_books');
//       })
//       .catch(() => {
//         toast.error('Failed to update book');
//       });
//   };

//   if (loading) return <div>Loading...</div>;

//   return (
//     <div className="edit-book-container">
//       <h2>Edit Book</h2>
//       <form onSubmit={handleSubmit} encType="multipart/form-data">
//         <label>Book Name</label>
//         <input
//           type="text"
//           name="bookname"
//           value={formData.bookname}
//           onChange={handleChange}
//           required
//         />

//         <label>Author Name</label>
//         <input
//           type="text"
//           name="authername"
//           value={formData.authername}
//           onChange={handleChange}
//           required
//         />

//         <label>Publisher</label>
//         <input
//           type="text"
//           name="publisher"
//           value={formData.publisher}
//           onChange={handleChange}
//           required
//         />

//         <label>Publishing Year</label>
//         <input
//           type="number"
//           name="publisheryear"
//           value={formData.publisheryear}
//           onChange={handleChange}
//           required
//         />

//         <label>Count</label>
//         <input
//           type="number"
//           name="count"
//           value={formData.count}
//           onChange={handleChange}
//           required
//         />

//         <label>Change Image (optional)</label>
//         <input
//           type="file"
//           name="image"
//           onChange={handleChange}
//           accept="image/*"
//         />

//         <button type="submit" className="btn btn-primary mt-3">
//           Update Book
//         </button>
//       </form>
//     </div>
//   );
// }

// export default EditBook;
