import React, { useEffect, useState } from 'react';
import "../Readers/Readerdonatebook.css";
import axiosInstance from '../../BaseUrl';
import img from '../../Assets/donateimg.png';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

function Readerdonatebook() {
  const navigate = useNavigate();
  const { id } = useParams(); // Book ID (for edit mode)
  const libraryId = localStorage.getItem("libraryid");

  const [formData, setFormData] = useState({
    bookname: '',
    authername: '',
    publisher: '',
    publisheryear: '',
    count: 1,
    libraryid: libraryId,
    image: '',
  });

  const [loading, setLoading] = useState(true);

  // If in edit mode, fetch book data
  useEffect(() => {
    if (id) {
      axiosInstance.get(`/viewBookById/${id}`)
        .then((res) => {
          const book = res.data.data;
          setFormData({
            bookname: book.bookname || '',
            authername: book.authername || '',
            publisher: book.publisher || '',
            publisheryear: book.publisheryear || '',
            count: book.count || 1,
            libraryid: libraryId,
            image: '',
            bookpdf:"",
          });
          setLoading(false);
        })
        .catch((err) => {
        //   toast.error("Failed to fetch book data.");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, libraryId]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image"|| name==="bookpdf") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = new FormData();
    dataToSend.append('bookname', formData.bookname);
    dataToSend.append('authername', formData.authername);
    dataToSend.append('publisher', formData.publisher);
    dataToSend.append('publisheryear', formData.publisheryear);
    dataToSend.append('count', formData.count);
    dataToSend.append('libraryid', formData.libraryid);
    if (formData.image) {
      dataToSend.append('image', formData.image);
    }
    if (formData.bookpdf) {
  dataToSend.append('bookpdf', formData.bookpdf);
}

    const endpoint = id ? `/library/edit/${id}` : '/addBook';

    axiosInstance.post(endpoint, dataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((result) => {
        const message = id ? "Book updated successfully" : "Book donated successfully";
        toast.success(message);
        navigate("/library_view_books");
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Operation failed");
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="reader_donatebook">
      <div className="container">
        <div className='row'>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <img src={img} alt='images' className='img_fluid' />
          </div>
          <div className='col-sm-12 col-md-6 col-lg-6 reader_donatebook_col2'>
            <p className='reader_donatebooke_heading'>
              {id ? "Edit Book" : "Add Book"}
            </p>
            <form onSubmit={handleSubmit}>
              <div className='row'>
                <div className='row align-items-center '>
                  <label className='col-sm-4 donatebook_label'>Book Name</label>
                  <div className='col-sm-8 reader_donatebook_inputs'>
                    <input type="text" name='bookname' value={formData.bookname} onChange={handleChange} required />
                  </div>

                  <label className='col-sm-4 donatebook_label'>Author Name</label>
                  <div className='col-sm-8 reader_donatebook_inputs'>
                    <input type="text" name='authername' value={formData.authername} onChange={handleChange} required />
                  </div>

                  <label className='col-sm-4 donatebook_label'>Publisher</label>
                  <div className='col-sm-8 reader_donatebook_inputs'>
                    <input type="text" name='publisher' value={formData.publisher} onChange={handleChange} required />
                  </div>

                  <label className='col-sm-4 donatebook_label'>Publishing Year</label>
                  <div className='col-sm-8 reader_donatebook_inputs'>
                    <input type="number" name='publisheryear' value={formData.publisheryear} onChange={handleChange} required />
                  </div>

                  <label className='col-sm-4 donatebook_label'>Count</label>
                  <div className='col-sm-8 reader_donatebook_inputs'>
                    <input type="number" name='count' value={formData.count} onChange={handleChange} required disabled />
                  </div>

                  <label className='col-sm-4 donatebook_label'>Select Image</label>
                  <div className='col-sm-8 reader_donatebook_inputs'>
                    <input type="file" name='image' onChange={handleChange} accept="image/*" required={!id} />
                  </div>
                  

                  <div className='col-sm-8 reader_donatebook_inputs'>
                    <button className="btn btn-primary" id='readerdonatebook_button'>
                      {id ? "Update" : "Add"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Readerdonatebook;
