import React from "react";
import "./ReaderProfileHelp.css";
// import img from "../../Assets/bookdemo.png";
// import { BsFillHeartFill } from "react-icons/bs";
// import ReactStars from "react-rating-stars-component";

function ReaderProfileHelp() {
  return (
    <div className="reader_profile_help">
      <div className="reader_profile_help_main">
        <div className="reader_profile_help_head">
          <p>Help</p>
        </div>
        <div className="reader_profile_help_content mt-5">
          <p>
            Creating and maintaining a book exchange application involves
            various steps, and depending on your technical expertise and
            resources, you might consider different approaches. Here's a
            step-by-step guide to help you navigate the process:
          </p>
          <ol className="mt-5" >
            <li>
              Define Your Vision:
              <ul>
                <li>
                  Clearly outline the goals and features of your book exchange
                  application. Understand your target audience and what unique
                  value your app will provide.
                </li>
              </ul>
            </li>
            <li>
              Market Research:
              <ul>
                <li>
                  Investigate existing book exchange platforms and apps.
                  Identify their strengths and weaknesses.
                </li>
              </ul>
            </li>
            <li>
              Technical Skills or Hiring a Developer:
              <ul>
                <li>
                  Assess your own technical skills. If you're proficient in
                  programming, you might choose to develop the app yourself.
                </li>
              </ul>
            </li>
            <li>
              Choose a Tech Stack:
              <ul>
                <li>
                  Decide on the technology stack for your application. Consider
                  the programming language, frameworks, and libraries that align
                  with your project goals.
                </li>
              </ul>
            </li>
            <li>
              Database Design:
              <ul>
                <li>
                  Plan the structure of your database. Determine how user data,
                  book information, and other relevant data will be stored and
                  retrieved.
                </li>
              </ul>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default ReaderProfileHelp;
