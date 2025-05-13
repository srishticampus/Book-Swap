import React from 'react'
import "../Admin/AdminHome.css"
import {PiBookOpenTextThin} from 'react-icons/pi'
import {FaUserCircle} from 'react-icons/fa'
import {LiaBookReaderSolid} from 'react-icons/lia'
function AdminHome() {
  return (
    
      <div className="Home">
      <div className="Home-pg">
        <form>
          <h2>LET'S MAKE THE BEST INVESTMENT</h2>
          <h1>THERES IS NO FRIEND</h1>
          <h1>AS LOYAL AS A BOOK</h1>
          <h3>
            Books are referred to as a man's best<br/> friend.They are very
            beneficial for <br/> mankind and have helped it evolve
          </h3>
        </form>
      </div>

      <div className='Home-card1'>
      <form>
          <center> 
          <h4> <PiBookOpenTextThin style={{fontSize: 50}}/></h4>
      <h1>3,16,00+</h1>
      <h1>Book</h1>
      </center>
      </form>
      </div>

      <div className='Home-card2'>
      <form>
          <center> 
          <h4> <FaUserCircle style={{fontSize: 50}}/></h4>
        <h1>5,00,000+</h1>
        <h1>Users</h1>
        </center>
      </form>
      </div>

      <div className='Home-card3'>
      <form>
          <center> 
        <h1><LiaBookReaderSolid style={{fontSize:50}}/></h1>
       <h1>4,70,000+</h1>
       <h1>Club</h1>
       </center>
      </form>
      </div>
    </div>
    
  )
}

export default AdminHome
