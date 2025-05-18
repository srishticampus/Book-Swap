import React, { useState } from "react";
import admimg from "../../Assets/adminlogin.png";
import "../Admin/adminlogin.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Hardcoded admin credentials
  const email = "admin";
  const password = "admin123";

  // Handle input changes
  const LoginClick = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on input
  };

  // Custom validation logic
  const validateForm = () => {
    const newErrors = {};

    if (!login.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (login.email !== email) {
      newErrors.email = "Invalid Admin ID.";
    }

    if (!login.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (login.password !== password) {
      newErrors.password = "Incorrect password.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const onSubmitData = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    // Login success
    toast.success("Logged in successfully");
    localStorage.setItem("isAdminLoggedIn", "true");
    navigate("/admin_home");

    // Optional: Reset form
    setLogin({ email: "", password: "" });
  };

  return (
    <div>
      <div className="admin_main">
        <div className="admin_img">
          <img src={admimg} alt="admin" />
        </div>

        <form onSubmit={onSubmitData} className="admin_login_form">
          <h5>WELCOME TO BOOK EXCHANGE</h5>
          <table cellPadding={"3px"} cellSpacing={"3px"}>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="Admin Id"
                    name="email"
                    value={login.email}
                    onChange={LoginClick}
                  />
 {errors.email && <span className="error-message">{errors.email}</span>}

                </td>
              </tr>

              <tr>
                <td>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={login.password}
                    onChange={LoginClick}
                  />
{errors.password && <span className="error-message">{errors.password}</span>}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="adminlogin_bttn">
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
