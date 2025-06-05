import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // assuming you're using react-router
import axiosInstance from '../../BaseUrl'; // update path as needed

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ReaderViewAllBooksByOtherUsers() {
    const [books, setBooks] = useState([]);
    //   const { userid } = useParams();
    const userid = localStorage.getItem("userid");


    useEffect(() => {
        axiosInstance
            .get(`/otheruserbooks/${userid}`)
            .then((res) => {
                setBooks(res?.data?.data || []);
                console.log(res.data)
            })
            .catch((err) => {
                console.error('Failed to fetch books:', err);
                setBooks([]);
            });
    }, [userid]);

    const handleLendBook = async (bookid) => {
        try {
            const response = await axiosInstance.post(`/lenddonatedbook/${bookid}`, {
                userid, // only if required by your backend
            });

            if (response.status === 200) {
                toast.success("Book lending request successful!");
                window.location.reload()
            } else {
                toast.warning("Book could not be lent. Try again.");
            }
        } catch (error) {
            console.error('Error lending book:', error);
            toast.error("An error occurred while trying to lend the book.");
        }
    };



    return (
        <div className="container mt-4">
            <h3 className="mb-4">Books Donated by Other Users</h3>

            <div className="row">
                {books.length ? (
                    books
                        .filter(book => book.isLent === false)
                        .map((book) => (
                            <div className="col-md-4 mb-4" key={book._id}>
                                <div className="card h-100">
                                    <img
                                        src={`http://localhost:4059/${book.image}`}
                                        alt={book.bookname}
                                        className="card-img-top"
                                        style={{ height: '200px', objectFit: 'cover' }}
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = '/default-book.png';
                                        }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{book.bookname}</h5>
                                        <p className="card-text"><strong>Author:</strong> {book.authername}</p>
                                        <p className="card-text"><strong>Publisher:</strong> {book.publisher}</p>
                                        <p className="card-text"><strong>Year:</strong> {book.publisheryear}</p>
                                    </div>
                                    <button
                                        className='btn btn-primary'
                                        onClick={() => handleLendBook(book._id)}
                                    >
                                        Lend
                                    </button>
                                </div>
                            </div>
                        ))
                ) : (
                    <div className="col-12">
                        <p>No books available.</p>
                    </div>
                )}
            </div>

            {/* <div className="row">
                {books.length ? (
                    books.map((book) => (
                        <div className="col-md-4 mb-4" key={book._id}>
                            <div className="card h-100">
                                <img
                                    src={`http://localhost:4059/${book.image}`}
                                    alt={book.bookname}
                                    className="card-img-top"
                                    style={{ height: '200px', objectFit: 'cover' }}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = '/default-book.png';
                                    }}
                                />


                                <div className="card-body">
                                    <h5 className="card-title">{book.bookname}</h5>
                                    <p className="card-text"><strong>Author:</strong> {book.authername}</p>
                                    <p className="card-text"><strong>Publisher:</strong> {book.publisher}</p>
                                    <p className="card-text"><strong>Year:</strong> {book.publisheryear}</p>
                                </div>
                <button
                                    className='btn btn-primary'
                                    onClick={() => handleLendBook(book._id)}
                                >
                                    Lend
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-12">
                        <p>No books available.</p>
                    </div>
                )}
            </div> */}
        </div>
    );
}

export default ReaderViewAllBooksByOtherUsers;
