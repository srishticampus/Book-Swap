import React, { useEffect, useState } from "react";
import img from "../../Assets/clublogin.png";
import "./ClubLogin.css";
import { Link ,useNavigate} from "react-router-dom";
import { BsArrowClockwise } from "react-icons/bs";
import axiosInstance  from "../../BaseUrl";
import { toast } from "react-toastify";

function ClubLogin() {
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
      const result = await axiosInstance.post("/clublogin", {
        email,
        password,
      });
      if (result.data.message) {
        if (userCaptchaInput === captchaText) {
          toast.success("login successfully");
          localStorage.setItem("token", result.data.token);
          localStorage.setItem("clubid",result.data.id)
          console.log(result);
          console.log(result.data.id);
          navigate("/club_home");
        } else {
          document.getElementById("alertuser").innerHTML =
            "Invalid CAPTCHA. Please enter the correct text.";
        }
      }
    } catch (err) {
      console.log("mh err", err);
      document.getElementById("alertuser").innerHTML =
        err.response.data.message;
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
    <div className="club_login">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <img src={img} alt="img" className="img-fluid" />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <p className="club_login_title ">
              Library Login
            </p>
            <form>
              <div className="row mt-4">
                <div className="col-12">
                  <div className="club_login_inputs mt-4">
                    <input type="email" placeholder="Email" className="mb-5" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                  </div>
                  <div className="col-12 club_login_forgotpass mt-3">
                    <Link to="/clubforgotpassword">Forgot Password?</Link>
                  </div>
                </div>
                <p class="alert text-center mt-2" id="alertuser"></p>

                <div className="col-6 club_login_card">
                  <div class="captchaborder mt-3">
                    <div class="card-body club_login_captcha">
                      <h5 class="card-title">{captchaText}</h5>
                      <button
                      type="button"
                        className="btn btn-primary"
                        onClick={generateCaptcha}
                      >
                        <BsArrowClockwise />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="club_login_inputs mt-4">
                  <input
                    type="text"
                    placeholder="Enter the Captcha"
                    className="mb-4"
                    value={userCaptchaInput}
                    onChange={handleCaptchaInputChange}
                  />
                </div>
                <div className="club_login_button">
                  <button className="btn btn-primary" type="submit"
                  onClick={handleLogin}
                  >Login</button>
                </div>
              </div>
            </form>
            <div className="col-12 club_signin_link mt-3">
              <p>
                Are you a new user? <Link to='/library_register' >SignUp</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubLogin;
