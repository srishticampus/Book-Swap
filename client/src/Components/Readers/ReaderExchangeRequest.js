import React from "react";
import ReaderHomeNavbar from "./ReaderHomeNavbar";
import exchange from "../../Assets/exchange.png";
import tick from "../../Assets/mdi_tick.png"
function ReaderExchangeRequest() {
  return (
    <div>
      <ReaderHomeNavbar />
      <div className="container">
        <div className="row">
          <div className="col-5">
            <img src={exchange} alt="img"></img>
          </div>
          <div className="col-7 text-center" id="tickdiv">
          <img src={tick} alt="img" className="tickimg "></img>
          <div className="mt-3">your request has been successfully send.</div>
          <div>pleace wait for the response</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReaderExchangeRequest;
