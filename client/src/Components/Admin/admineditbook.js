import React, { useEffect, useState } from "react";
// import AdminHomeNavbar from "./AdminHomeNavbar";
import addbook from "../../Assets/addbook.png";
import "./adminaddbook.css";
import axiosInstance from "../../BaseUrl";
import {  useParams } from "react-router-dom";
// import { Toast } from "bootstrap";
import { toast } from "react-toastify";

function AdminAddBook() {
// const navigate=useNavigate()
    const {id}=useParams();
    console.log(id);
    const[data,setData]=useState({image:{filename:''}})

    useEffect(()=>{
        axiosInstance.post(`/adminviewbookone/${id}`)
        .then((res)=>{
            console.log(res);
            setData(res.data.data)
            // console.log(data);

          })
          .catch((err)=>{
            console.log(err);
          })
      
    },[id])
    // console.log(data);
    const handleChange = (a) => {
        if (a.target.name === "image") {
          setData({ ...data, image: a.target.files[0] });
        } else {
          setData({ ...data, [a.target.name]: a.target.value });
        }
        console.log(data);
      };

      const handelsubmit=(a)=>{
        a.preventDefault()
        axiosInstance.post(`/admineditbook/${id}`, data, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log(data);
            console.log("data entered", res);
            if (res.data.status === 200) {
              toast.success("Updated");
              window.location.reload();
            } else {
              alert("Something went wrong");
            }
          })
          .catch((error) => {
            console.log("error", error);
            alert("Something went wrong");
          });
    
      }

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
                            <p className="admin_addbooke_heading">Edit Book Here</p>
                            <form onSubmit={handelsubmit}>
                                <div className="row">
                                    <div className="row align-items-center ">
                                        <label className="col-sm-4 addbook_label">Book Name</label>
                                        <div className="col-sm-8 admin_addbook_inputs">
                                            <input
                                                type="text"
                                                placeholder=""
                                                name="bookname"
                                                value={data.bookname}
                                                onChange={handleChange}
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
                                                value={data.authername}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <label className="col-sm-4 addbook_label">Publisher</label>
                                        <div className="col-sm-8 admin_addbook_inputs">
                                            <input
                                                type="text"
                                                placeholder=""
                                                name="publisher"
                                                value={data.publisher}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <label className="col-sm-4 addbook_label">
                                            Publishing year
                                        </label>
                                        <div className="col-sm-8 admin_addbook_inputs">
                                            <input
                                                type="text"
                                                placeholder=""
                                                name="publisheryear"
                                                value={data.publisheryear}
                                                onChange={handleChange}
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
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-sm-8 admin_addbook_inputs ">
                                            <button
                                                className="btn btn-primary "
                                                id="adminaddbook_button"
                                                type="submit"
                                            >
                                                Save Updates
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
