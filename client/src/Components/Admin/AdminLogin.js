import React, { useState } from "react";
import admimg from "../../Assets/adminlogin.png";
import "../Admin/adminlogin.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [login, setLogin] = useState({ email: "", password: "" });
  const LoginClick = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const navigate=useNavigate();
  let email='admin';
  let password='admin123';

  const onSubmitData = (e) => {
    e.preventDefault();

    if(email==login.email){
      if(password==login.password){
        toast.success('Logged in successfully')
        navigate('/admin_home')
      }else{
        toast.error('password is incorrect')
      }
    }else{
      toast.error('Userid is incorrect')
    }

    console.log(login);
    console.log("Submitted");
  };

  return (
    <div>
      <div className="admin_main">
        <div className="admin_img">
          <img src={admimg} />
        </div>

        {/* edited by radhul 04/11/2023-------added a class named 'admin_login_form' */}

        <form onSubmit={onSubmitData} className="admin_login_form">
          <h5>WELCOME TO BOOK EXCHANGE</h5>
          <table cellPadding={"3px"} cellSpacing={"3px"}>
            <tr>
              <td>
                <input
                  type="text"
                  placeholder="Admin Id"
                  name="email"
                  onChange={LoginClick}
                  required
                />
              </td>
            </tr>
            <hr />
            <tr>
              <td>
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={LoginClick}
                />
              </td>
            </tr>
            <hr />
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
