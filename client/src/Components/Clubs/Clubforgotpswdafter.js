import React,{useState,useEffect} from 'react'
import './clubforgotpswdafter.css'
import './clubforgotpswdsec.css'
import './clubforgotpassword.css'
import img from "../../Assets/readerfogotpass.png";
import { useLocation, useNavigate } from 'react-router-dom';
import axiosInstance from '../../BaseUrl';
import { toast } from "react-toastify";



function ClubForgotpassword() {
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  let passwordMatches=false
const location = useLocation();

const navigat=useNavigate()
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setEmail(searchParams.get('id'));
    console.log("email", email);
  }, [])

  const checkPwd = () => {

    console.log("password == newPassword",password,newPassword)
     if (password === newPassword) {
 
      passwordMatches=true
     }
     else
     passwordMatches=false
 
   }
   const handleSubmit = async (e) => {
    e.preventDefault()
    checkPwd()

    console.log("fun ");

    if (!password || !newPassword) {
      alert("Please enter all the fields");
      return false;
    }
    const credentials = { email, password, newPassword };
    console.log("passwordMatches",passwordMatches);
      if (!passwordMatches){
        alert("no match")
      }
      else {
        sendDataToServer(credentials, e);
      }
      console.log(credentials);

   }
   const sendDataToServer = (credentials, e) => {

    axiosInstance.post(`/clubforgotpassword`, credentials).then((res) => {
      console.log(res);
      if (res.data.status === 200) {
        // alert("Password Reset successful");
        toast.success("password Reset successfully")
        navigat("/library_login")
        
      } else {
        alert("Password Reset failed");
      }
    });
  
  };
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (
    <div className="club_forgot">
      <div class="container">
        <div class="row">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <img src={img} alt="img" className="img-fluid" />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 reader_forgot_col2">
            <div>
              <p className="club_forgot_para1"> Reset Your Password</p>
              {/* <p className="club_forgot_para2 mb-5">
                To reset your password, Enter teh email Address you use to sign
                in to login form
              </p> */}
            </div>
            <form onSubmit={handleSubmit}>
            <div className="club_forgotafter_input">
              <input type="password" placeholder="New Password" onChange={(e) => setPassword(e.target.value)}/>
              <input type="password" placeholder="Confirm password"  onChange={(e) => setNewPassword(e.target.value)}/>
            </div>
            <button className="btn btn-primary mt-4" id="btn_login">
                Login
              </button>
              </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClubForgotpassword
