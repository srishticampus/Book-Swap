import React, { useEffect, useState } from "react";
import img from "../../../Assets/img1.jpeg";
import "../../Clubs/ClubProfile.css"
import { IoIosCall } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";
import { HiMiniArrowRightOnRectangle } from "react-icons/hi2";
import axiosInstance from "../../../BaseUrl";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function LibraryProfile({ url }) {
  const [data, setData] = useState({ image: { filename: "" } });
  const id = localStorage.getItem("libraryid");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axiosInstance
      .get(`/viewalibrary/${id}`)
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data)
      })
      .catch((err) => {
        console.error("View error", err);
      });
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setData({ ...data, image: e.target.files[0] });
    } else {
      setData({ ...data, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in data) {
      if (key === "image") {
        formData.append("image", data.image);
      } else {
        formData.append(key, data[key]);
      }
    }

    axiosInstance
      .post(`/editlibrary/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          toast.success("Library updated successfully!");
          window.location.reload();
        } else {
          toast.error("Update failed");
        }
      })
      .catch((err) => {
        console.error("Edit error", err);
        toast.error("Something went wrong");
      });
  };

  return (
    <div id="allclubprofile" className="container">
      <div className="row">
        <div className="clubprofile-division col-lg-4">
          <form>
            <center>


              <img
                src={data.image && data.image.filename ? `${url}/${data.image.filename}` : img}
                alt="Library"
              />





              <h1>{data.libraryname || ""}</h1>
              <div className="clubprofile-details">
                <table cellPadding={5}>
                  <tbody>
                    <tr>
                      <td>Register No:</td>
                      <td>{data.regno || ""}</td>
                    </tr>
                    <tr>
                      <td><IoIosCall /> Contact:</td>
                      <td>{data.contact || ""}</td>
                    </tr>
                    <tr>
                      <td><AiOutlineMail /> Email:</td>
                      <td>{data.email || ""}</td>
                    </tr>
                    <tr>
                      <td><FaLocationDot /> Street:</td>
                      <td>{data.street || ""}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h4>{data.city || ""}</h4>
              <h4>{data.district || ""}</h4>
              <h4>{data.state || ""}</h4>
              <Link to="/" className="text-decoration-none">
                <button type="button" className="form-control">
                  <HiMiniArrowRightOnRectangle /> Logout
                </button>
              </Link>
            </center>
          </form>
        </div>

        <div className="clubprofile-editprofile col-lg-8">
          <form onSubmit={handleSubmit}>
            <h1>EDIT LIBRARY PROFILE</h1>
            <input type="text" name="libraryname" value={data.libraryname || ""} className="form-control" placeholder="Library Name" onChange={handleChange} required /><br />
            <input type="text" name="regno" value={data.regno || ""} className="form-control" placeholder="Registration No" onChange={handleChange} required /><br />
            <input type="text" name="contact" value={data.contact || ""} className="form-control" placeholder="Contact" onChange={handleChange} required /><br />
            <input type="email" name="email" value={data.email || ""} className="form-control" placeholder="Email" onChange={handleChange} required /><br />
            <input type="text" name="street" value={data.street || ""} className="form-control" placeholder="Street" onChange={handleChange} required /><br />
            <input type="text" name="city" value={data.city || ""} className="form-control" placeholder="City" onChange={handleChange} required /><br />
            <input type="text" name="district" value={data.district || ""} className="form-control" placeholder="District" onChange={handleChange} required /><br />
            <input type="text" name="state" value={data.state || ""} className="form-control" placeholder="State" onChange={handleChange} required /><br />
            <input type="text" name="pincode" value={data.pincode || ""} className="form-control" placeholder="Pincode" onChange={handleChange} required /><br />
            <div className="inputfileclubedit">
              <input type="file" name="image" onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LibraryProfile;
