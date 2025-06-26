import React, { useEffect, useState } from 'react'
import "../Admin/AdminHome.css"
import { PiBookOpenTextThin } from 'react-icons/pi'
import { FaUserCircle } from 'react-icons/fa'
import { LiaBookReaderSolid } from 'react-icons/lia'
import axiosInstance from "../../BaseUrl";
function AdminHome() {

  const[lib,setLib]=useState([])
  const[user,setUser]=useState([])
  const[books,setBooks]=useState([])

  useEffect(() => {
    axiosInstance.post("/viewAllUsers")
      .then((res) => {
        console.log("all users", res.data);
        setUser(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axiosInstance.get("/getlibraries")
      .then((res) => {
        console.log("all lib", res.data);
        setLib(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
const uid = localStorage.getItem('userid');

  useEffect(() => {
    if (uid) {
      axiosInstance.post(`/viewAllBooks/${uid}`)
        .then((res) => {
          console.log("admin books", res.data);
          setBooks(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [uid]);

  return (

    <div className="Home">
      <div className="Home-pg">
        <form>
          <h2>LET'S MAKE THE BEST INVESTMENT</h2>
          <h1>THERES IS NO FRIEND</h1>
          <h1>AS LOYAL AS A BOOK</h1>
          <h3>
            Books are referred to as a man's best<br /> friend.They are very
            beneficial for <br /> mankind and have helped it evolve
          </h3>
        </form>
      </div>


          <div className='Home-card1'>
        <form>
          <center>
            <h4> <PiBookOpenTextThin style={{ fontSize: 50 }} /></h4>
            <h1>{books.length}</h1>
            <h1>Admin Books</h1>
          </center>
        </form>
      </div>
    
  

      <div className='Home-card2'>
        <form>
          <center>
            <h4> <FaUserCircle style={{ fontSize: 50 }} /></h4>
            <h1>{user.length}</h1>
            <h1>Users</h1>
          </center>
        </form>
      </div>

      <div className='Home-card3'>
        <form>
          <center>
            <h1><LiaBookReaderSolid style={{ fontSize: 50 }} /></h1>
            <h1>{lib.length}</h1>
            <h1>Library</h1>
          </center>
        </form>
      </div>
    </div>

  )
}

export default AdminHome
