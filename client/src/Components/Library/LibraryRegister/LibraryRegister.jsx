import React, { useState } from "react";
import "../../Clubs/ClubSignin.css";
import "../../Library/LibraryRegister/LibraryRegister.css"
import img from "../../../Assets/Rectangle 141 (1) (1).png";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../BaseUrl";
// import { toast } from "react-toastify";

function LibraryRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    libraryname: "",
    street: "",
    city: "",
    district: "",
    state: "",
    regno: "",
    contact: "",
    email: "",
    password: "",
    pincode: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.libraryname.trim()) newErrors.libraryname = "Library name is required";
    if (!formData.street.trim()) newErrors.street = "Street is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.district.trim()) newErrors.district = "District is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.regno.trim()) newErrors.regno = "Registration number is required";

    if (!formData.contact.trim()) {
      newErrors.contact = "Contact is required";
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact must be 10 digits";
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }

    if (!formData.image) {
      newErrors.image = "Image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      // toast.error("Please fill out all fields correctly.");
      return;
    }

    const formSubmitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formSubmitData.append(key, value);
    });

    try {
      const res = await axiosInstance.post("/addlibrary", formSubmitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.status === 200) {
        // toast.success("Library registered successfully!");
        navigate("/library-login");
      } else {
        // toast.warning(res.data.msg || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      // toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="reader_signin">
      <div className="container">
        <div className="row">
          <div className="col-6 reader_signin_img">
            <img src={img} alt="library" />
          </div>
          <div className="col-6">
            <p className="reader_signin_title">Register your Library</p>
            <form onSubmit={handleSubmit}>
              <div className="row">
                {[
                  { name: "libraryname", placeholder: "Library Name" },
                  { name: "regno", placeholder: "Registration Number" },
                  { name: "contact", placeholder: "Contact Number" },
                  { name: "email", placeholder: "Email Address" },
                  { name: "password", placeholder: "Password", type: "password" },
                  { name: "street", placeholder: "Street" },
                  { name: "city", placeholder: "City" },
                  { name: "district", placeholder: "District" },
                  { name: "state", placeholder: "State" },
                  { name: "pincode", placeholder: "Pincode" },
                ].map((field) => (
                  <div key={field.name} className="col-12 pb-3 reader_signin_inputs">
                    <input
                      type={field.type || "text"}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {errors[field.name] && (
                      <small className="error-text">{errors[field.name]}</small>
                    )}
                  </div>
                ))}

                <div className="col-12 pb-3 reader_signin_inputfile">
                  <label className="pb-2">Upload Image</label>
                  <input
                    type="file"
                    name="image"
                    className="form-control"
                    onChange={handleImageChange}
                  />
                  {errors.image && (
                    <small className="error-text">{errors.image}</small>
                  )}
                </div>

                <div className="col-12 pb-3 reader_signin_inputbutton text-center">
                  <button type="submit" className="btn btn-primary">Sign Up</button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => {
                      setFormData({
                        libraryname: "",
                        street: "",
                        city: "",
                        district: "",
                        state: "",
                        regno: "",
                        contact: "",
                        email: "",
                        password: "",
                        pincode: "",
                        image: null,
                      });
                      setErrors({});
                    }}
                  >
                    Cancel
                  </button>
                </div>

                <div className="col-12 reader_signin_link">
                  <p>Already have an account? <Link to="/library-login">Login</Link></p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibraryRegister;
