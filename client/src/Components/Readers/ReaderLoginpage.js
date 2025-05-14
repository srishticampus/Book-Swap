import React, { useState, useEffect } from "react";
import loginimage from "../../Assets/Rectangle 142 (2).png";
import "./reader.css";
import { BsArrowClockwise } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../BaseUrl";
import { toast } from "react-toastify";

function ReaderLoginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [userCaptchaInput, setUserCaptchaInput] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!validateEmail(email)) {
      document.getElementById("alertuser").innerHTML =
        "Please enter a valid email";
      return;
    }
    if (password === "") {
      document.getElementById("alertuser").innerHTML = "password is empty";
      return;
    }
    try {
      const result = await axiosInstance.post("/userlogin", {
        email,
        password,
      });
      if (result.data.message) {
        if (userCaptchaInput === captchaText) {
          toast.success("login successfully");
          console.log(result);
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("userid", result.data.id);
          navigate("/reader_home");
        } else {
          document.getElementById("alertuser").innerHTML =
            "Invalid CAPTCHA. Please enter the correct text.";
        }
      }
    } catch (err) {
      console.log("mh err", err);
    
    }
  };

  const generateCaptcha = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaText(result);
  };

  const handleCaptchaInputChange = (e) => {
    setUserCaptchaInput(e.target.value);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  return (
    <div>
      {/* <LoginNavbar /> updated by radhul navbar called in app.js */}
      <div className="container mt-2 mb-5">
        <div className="row">
          <div className="col-6">
            <img src={loginimage} alt="img" className="userloginimg" />
          </div>
          <div className="col-6">
            <p className="loginheading text-center">
             User Login
            </p>
            <div className="pt-2 ps-5 pe-5">
              <div className="form-floating mb-3">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="d-flex justify-content-end align-items-center m-2">
                <Link to="/reader_forgotpswd" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>

              <p class="alert" id="alertuser"></p>
              <div class="captchaborder">
                <h5 class="card-title">
                  {captchaText}
                  <button
                    className="btn btn-primary"
                    style={{ float: "right" }}
                    onClick={generateCaptcha}
                  >
                    <BsArrowClockwise />
                  </button>
                </h5>
              </div>
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="floatingCaptcha"
                  placeholder="Enter the captcha"
                  value={userCaptchaInput}
                  onChange={handleCaptchaInputChange}
                />
                <label htmlFor="floatingCaptcha">Enter the Captcha</label>{" "}
              </div>

              <div className="text-center m-3">
                <button
                  className="btn btn-primary text-center"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </div>
              <div className="">
                Are you a new user?{" "}
                <Link to="/reader_signin" className="gotosignup text-primary">
                  SignUp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReaderLoginpage;
