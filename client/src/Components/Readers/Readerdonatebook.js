import React, { useState } from "react";
import "../Readers/Readerdonatebook.css";
import axiosInstance from "../../BaseUrl";
import img from "../../Assets/donateimg.png";
import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

function Readerdonatebook() {
  const id = localStorage.getItem("userid");
  // const navigate = useNavigate()

  console.log(id);
  const [donate, setDonate] = useState({
    bookname: "",
    authername: "",
    publisher: "",
    publisheryear: "",
    count: 0,
    userid: id,
    image: "",
  });
  const changesubmit = (a) => {
    if (a.target.name === "image") {
      setDonate({ ...donate, image: a.target.files[0] });
    } else {
      setDonate({ ...donate, [a.target.name]: a.target.value });
    }
  };

  const submitfn = (b) => {
    b.preventDefault();
    console.log(donate);

    axiosInstance
      .post(`/donatebook`, donate, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log("data entered successfully", result);

        if (result.status === 200) {
          toast.success("Book Donated Successfully");
          // navigate("/")
          window.location.reload();
        } else {
          alert("failed to entered");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  console.log(donate);

  return (
    <div className="reader_donatebook">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <img src={img} alt="images" className="img_fluid" />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 reader_donatebook_col2">
            <p className="reader_donatebooke_heading">Donate Book</p>
            <form onSubmit={submitfn}>
              <div className="row">
                <div className="row align-items-center ">
                  <label className="col-sm-4 donatebook_label">Book Name</label>
                  <div className="col-sm-8 reader_donatebook_inputs">
                    <input
                      type="text"
                      placeholder=""
                      name="bookname"
                      value={donate.bookname}
                      onChange={changesubmit}
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
                      value={donate.authername}
                      onChange={changesubmit}
                      required
                    />
                  </div>

                  <label className="col-sm-4 donatebook_label">Publisher</label>

                  <div className="col-sm-8 reader_donatebook_inputs">
                    <input
                      type="text"
                      placeholder=""
                      name="publisher"
                      value={donate.publisher}
                      onChange={changesubmit}
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
                      value={donate.publisheryear}
                      onChange={changesubmit}
                      required
                    />
                  </div>
                  
                  <label className="col-sm-4 donatebook_label">Count</label>
                  <div className="col-sm-8 reader_donatebook_inputs">
                    <input
                      type="number"
                      placeholder=""
                      name="count"
                      onChange={changesubmit}
                      required
                    />
                  </div>
                  <label className="col-sm-4 donatebook_label">
                    Select a Image
                  </label>
                  <div className="col-sm-8 reader_donatebook_inputs">
                    <input
                      type="file"
                      placeholder=""
                      name="image"
                      onChange={changesubmit}
                      required
                    />
                  </div>
                  <div className="col-sm-8 reader_donatebook_inputs ">
                    <button
                      className="btn btn-primary "
                      id="readerdonatebook_button"
                    >
                      Donate
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
