import React, { useState } from "react";
import AdminHomeNavbar from "./AdminHomeNavbar";
import addbook from "../../Assets/addbook.png";
import "./adminaddbook.css";
import axiosInstance from "../../BaseUrl";
import { toast } from "react-toastify";

function AdminAddBook() {
  const [addBook, setAddBook] = useState({
    bookname: "",
    authername: "",
    publisher: "",
    publisheryear: "",
    count:0,
    image: "",
  });
  const changesubmit = (a) => {
    if (a.target.name === "image") {
      setAddBook({ ...addBook, image: a.target.files[0] });
    } else {
      setAddBook({ ...addBook, [a.target.name]: a.target.value });
    }
  };
  const submitfn = (b) => {
    b.preventDefault();
    console.log(addBook);
    axiosInstance
      .post(`/adminaddbook`, addBook, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((result) => {
        console.log("data entered successfully", result);
        if (result.status === 200) {
          toast.success("Book added Sucessfully");
          window.location.reload();
        } else {
          toast.error("failed to entered");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  console.log(addBook);
  return (
    <div>
      <div className="admin_addbook">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6">
              <img
                src={addbook}
                alt="images"
                className="img_fluid"
                id="addbook_img"
              />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 admin_addbook_col2">
              <p className="admin_addbooke_heading">Book Upload</p>
              <form onSubmit={submitfn}>
                <div className="row">
                  <div className="row align-items-center ">
                    <label className="col-sm-4 addbook_label">Book Name</label>
                    <div className="col-sm-8 admin_addbook_inputs">
                      <input
                        type="text"
                        placeholder=""
                        name="bookname"
                        value={addBook.bookname}
                        onChange={changesubmit}
                        required
                      />
                    </div>
                    <label className="col-sm-4 addbook_label">
                      Author Name
                    </label>
                    <div className="col-sm-8 admin_addbook_inputs">
                      <input
                        type="text"
                        placeholder=""
                        name="authername"
                        value={addBook.authername}
                        onChange={changesubmit}
                        required
                      />
                    </div>
                    <label className="col-sm-4 addbook_label">Publisher</label>
                    <div className="col-sm-8 admin_addbook_inputs">
                      <input
                        type="text"
                        placeholder=""
                        name="publisher"
                        value={addBook.publisher}
                        onChange={changesubmit}
                        required
                      />
                    </div>
                    <label className="col-sm-4 addbook_label">
                      Publishing year
                    </label>
                    <div className="col-sm-8 admin_addbook_inputs">
                      <input
                        type="number"
                        placeholder=""
                        name="publisheryear"
                        value={addBook.publisheryear}
                        onChange={changesubmit}
                        required
                      />
                    </div>
                    <label className="col-sm-4 addbook_label">
                      Count
                    </label>
                    <div className="col-sm-8 admin_addbook_inputs">
                      <input
                        type="number"
                        placeholder=""
                        name="count"
                        onChange={changesubmit}
                        required
                      />
                    </div>
                    <label className="col-sm-4 addbook_label">
                      Select a Image
                    </label>
                    <div className="col-sm-8 admin_addbook_inputs">
                      <input
                        type="file"
                        placeholder=""
                        name="image"
                        onChange={changesubmit}
                        required
                      />
                    </div>
                    <div className="col-sm-8 admin_addbook_inputs ">
                      <button
                        className="btn btn-primary "
                        id="adminaddbook_button"
                      >
                        Upload a file
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAddBook;
