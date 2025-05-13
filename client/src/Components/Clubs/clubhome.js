import React from "react";
import img from "../../Assets/Rectangle 114.png"
import "../Readers/ReaderHome.css"
function ReaderHome() {
  return (
    <div>
      <div className="readerhome_main1">
        <form>
          <div className="readerhome_heading">
            <h2>LETS MAKE THE BEST INVESTMENT</h2>
            <h1>THERE IS NO FRIEND</h1>
            <h1>AS LOYAL AS A<span> BOOK </span></h1>
          </div>

         

          <p>
            Books are referred to as a man's best
            <br />
            friend.They are very beneficial for <br />
            mankind and have helped it evolve.
          </p>
          <br />
        </form>
      </div>

      {/* .........................block2.............................. */}
      <div className="readerhome_main2">
        <div className="readerhome_pict2">
          <img src={img} />
        </div>
        <form>
          <h4>Available Books on Topics</h4>
          <div className="readerhome_para">
            <p>
              In publishing and graphic design,Lorem ipsum is a placeholder
              <br /> text commonly used to demonstrate the visual form of a
              <br /> document or a typeface
            </p>

            <br />
            <li>How the power works</li>
            <li>How to improve power</li>
            <li>How power is increased </li>
            <li>Lets learn to control power</li>
            <li>Make the life easy</li>
            <li>Harness the power within you</li>
            <br />
            <p>
              {" "}
              In publishing and graphic design,Lorem ipsum is a placeholder
              <br /> text commonly used to demonstrate the visual form of a
              <br /> document or a typeface
            </p>
          </div>
        </form>
      </div>
      {/* ..................block3.......... */}
      <div className="readerhome_main3">
        <form>
          <div className="readerhome_align">
            <h1>A ROOM WITHOUT </h1>
            <h1>BOOKS IS LIKE A BODY</h1>
            <h1>BODY WITHOUT A SOUL</h1>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReaderHome;
