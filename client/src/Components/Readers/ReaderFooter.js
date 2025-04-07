import React from "react";
import img from "../../Assets/Footerlogo (2).png";
import "../Readers/ReaderFooter.css";
import { IoIosCall } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";

function ReaderFooter() {
  return (
    <div>
      <footer className="mt-5">
        <div className="container">
          <div className="footer-row row">
            <div className="footer-col1">
              <img src={img} className="footer-Image1 col-4" />
              <div className="d-flex justify-content-between" >
                <p>
                A book is written or printed work of literature or
                information,typically consisting of pages bound
                together,offering a portable and durable means of sorting and
                transmitting knowledge
              </p>
              <div className="footer-vl"></div>
              </div>
              

            </div>


            <div className="footer-col2 col-4">
              <h6>Books</h6>
              <h6>View Clubs</h6>
              <h6>View User</h6>
              <h6>View All Exchanges</h6>
            </div>

            <div className="footer-col3 col-4">
              <h6>
                <IoIosCall style={{ fontSize: 20, color: "white" }} />{" "}
                +9148393637
              </h6>
              <h6>
                <FaLocationDot style={{ fontSize: 20, color: "white" }} />
                70&34,C.T.M.Road,selam 629170
              </h6>
              <h6>
                <AiOutlineMail style={{ fontSize: 20, color: "white" }} />
                bookexchange@gmail.com
              </h6>
            </div>

            {/* <div className="footer-col4">
              <h3>Follow us</h3>
            </div> */}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default ReaderFooter;
