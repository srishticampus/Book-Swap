import React from "react";
import ReactStars from "react-rating-stars-component";
import img from "../../Assets/bookreturn.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import axiosInstance from "../../BaseUrl";
import { useState } from "react";
import { toast } from "react-toastify";

function ReaderReturnBook() {
  const [data, setData] = useState({});
  const [book, setBook] = useState({});
  const [rating, setRating] = useState(0);

  const { lendid, bid } = useParams();
  const navigate=useNavigate();

  useEffect(() => {
    axiosInstance
      .post(`/calcFineForUser/${lendid}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/adminviewbookone/${bid}`)
      .then((res) => {
        console.log(res);
        setBook(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [lendid,bid]);


  const returnbook=(a)=>{
    a.preventDefault();
    axiosInstance
      .post(`/returnbook/${lendid}`)
      .then((res) => {
        console.log(res);
        if(res.data.status===200){
          toast.success('Return Successfully')
          navigate('/reader_view_lended_books')
        }
        
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/addRating/${bid}`,{rating:rating})
      .then((res) => {
        console.log(res);
        if(res.data.status===200){
          // toast.success('Return Successfully')
          // navigate('/reader_view_lended_books')
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  }


  const currentYear = new Date().getFullYear();
  const expiryYears = Array.from(
    { length: 20 },
    (_, index) => currentYear + index
  );

  let addRating=(e)=>{
    setRating(e)
  }
  console.log(rating);


  if (data.data1 === 0) {
    return (
      <div className="reader_donatebook">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <img src={img} alt="images" className="img_fluid" height='532px' width='476px' />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 reader_donatebook_col2">
              <p className="reader_donatebooke_heading">Return Book</p>
              <form onSubmit={returnbook} >
                <div className="row">
                  <div className="row align-items-center ">
                    <label className="col-sm-4 donatebook_label">
                      Book Name
                    </label>
                    <div className="col-sm-8 reader_donatebook_inputs">
                      <input
                        type="text"
                        placeholder=""
                        name="bookname"
                        value={book.bookname}
                        disabled
                        required
                        title="Please fill the field"
                      />
                    </div>
                    <label className="col-sm-4 donatebook_label">
                      Author Name
                    </label>
                    <div className="col-sm-8 reader_donatebook_inputs">
                      <input
                        type="text"
                        placeholder=""
                        name="authername"
                        value={book.authername}
                        disabled
                        required
                      />
                    </div>
                    <label className="col-sm-4 donatebook_label">
                      Publisher
                    </label>
                    <div className="col-sm-8 reader_donatebook_inputs">
                      <input
                        type="text"
                        placeholder=""
                        name="publisher"
                        value={book.publisher}
                        disabled
                        required
                      />
                    </div>
                    <label className="col-sm-4 donatebook_label">
                      Publishing year
                    </label>
                    <div className="col-sm-8 reader_donatebook_inputs">
                      <input
                        type="text"
                        placeholder=""
                        name="publisheryear"
                        value={book.publisheryear}
                        disabled
                        required
                      />
                    </div>
                    <label className="col-sm-4 donatebook_label">
                      Add Rating
                    </label>
                    <div className="col-sm-8 reader_donatebook_inputs">
                    <ReactStars
                    count={5}
                     onChange={addRating}
                    size={44}
                    activeColor="#F1B31C"
                
                      />
                    </div>

                    <div className="col-sm-12 reader_donatebook_inputs ">
                      <button
                      type="submit"
                        className="btn btn-primary "
                        id="readerdonatebook_button"
                      >
                        Return Now
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
  } else {
    return (
      <div className="reader_donatebook">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <img src={img} alt="images" className="img_fluid" />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 reader_donatebook_col2">
              <p className="reader_donatebooke_heading">Return Book</p>
              <form onSubmit={returnbook} >
                <div className="row">
                  <div className="row align-items-center ">
                    <label className="col-sm-4 donatebook_label">
                      Book Name
                    </label>
                    <div className="col-sm-8 reader_donatebook_inputs">
                      <input
                        type="text"
                        placeholder=""
                        name="bookname"
                        required
                        value={book.bookname}
                        disabled
                        title="Please fill the field"
                      />
                    </div>
                    <label className="col-sm-4 donatebook_label">
                      Author Name
                    </label>
                    <div className="col-sm-8 reader_donatebook_inputs">
                      <input
                        type="text"
                        placeholder=""
                        name="authername"
                        value={book.authername}
                        disabled
                        required
                      />
                    </div>
                    <label className="col-sm-4 donatebook_label">
                      Publisher
                    </label>
                    <div className="col-sm-8 reader_donatebook_inputs">
                      <input
                        type="text"
                        placeholder=""
                        name="publisher"
                        value={book.publisher}
                        disabled
                        required
                      />
                    </div>
                    <label className="col-sm-4 donatebook_label">
                      Publishing year
                    </label>
                    <div className="col-sm-8 reader_donatebook_inputs">
                      <input
                        type="text"
                        placeholder=""
                        name="publisheryear"
                        value={book.publisheryear}
                        disabled
                        required
                      />
                    </div>
                    <label className="col-sm-4 donatebook_label">
                      Fine Amount
                    </label>
                    <div className="col-sm-8 reader_donatebook_inputs">
                      <input
                        type="text"
                        placeholder=""
                        name="publisheryear"
                        value={`₹ ${data.data1}`}
                        disabled
                        required
                      />
                    </div>
                    <label className="col-sm-4 donatebook_label">
                      Account Details
                    </label>
                    <div className="col-sm-8 reader_donatebook_inputs">
                      <input
                        type="text"
                        placeholder="Card Holder Name"
                        name="publisheryear"
                        required
                      />
                    </div>
                    <label className="col-sm-4 donatebook_label"></label>
                    <div className="col-sm-4 reader_donatebook_inputs">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="\d{12,}"
                        placeholder="Card Number"
                        name="cardNumber"
                        required
                        title='Card number must be 12 digit'
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(/\D/g, '').slice(0, 12);
                          
                        }}
                      />
                    </div>

                    <div className="col-sm-4 reader_donatebook_inputs">
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="\d{3,}"
                        placeholder="CVV Number"
                        name="cardNumber"
                        required
                        title='CVV must be 3 digit number'
                        onInput={(e) => {
                          e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
                          
                        }}
                      />
                    </div>
                    <label className="col-sm-4 donatebook_label"></label>

                    <div className="col-sm-4 reader_donatebook_inputs">
                      <select
                        class="form-control return"
                        name="month"
                        id="month"
                      >
                        <option>Expiry Month</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                      </select>
                    </div>
                    <div className="col-sm-4 reader_donatebook_inputs">
                      <select
                        class="form-control return"
                        name="month"
                        id="month"
                      >
                        <option>Expiry Year</option>
                        {expiryYears.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-sm-12 reader_donatebook_inputs ">
                      <button
                      type="submit"
                        className="btn btn-primary "
                        id="readerdonatebook_button"
                      >
                        Pay and Return
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
}

export default ReaderReturnBook;
