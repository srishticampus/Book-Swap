import React, { useEffect, useState } from "react";
import exchange from "../../Assets/exchange.png";
import "./reader.css";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../BaseUrl";
import { toast } from "react-toastify";

function ReaderExchange() {
  const id = localStorage.getItem("userid");
  const navigate = useNavigate();
  const [bookname, setBookname] = useState("");
  const [authername, setAuthername] = useState("");
  const [discription, setDiscription] = useState("");

  const [exchangeStatus, setExchangeStatus] = useState([]);

  const handleExchange = async (e) => {
    e.preventDefault();
    try {
      const result = await axiosInstance.post("/exchangebook", {
        bookname: bookname,
        authername: authername,
        discription: discription,
        userid: id,
      });
      console.log("Response:", result.data);
      toast.success("Book exchange request sent successfully!");
      navigate("/readerexchangerequest");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to send book exchange request");
    }
  };

  const displayRequestStatus = () => {
    axiosInstance
      .post(`/displayexchangerequests`)
      .then((res) => {
        console.log(res.data);
        setExchangeStatus(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    displayRequestStatus();
  }, []);
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-5 mt-5 ">
            <img src={exchange} alt="img" className="exchangeimg"></img>
          </div>
          <div className="col-6 mt-5 ms-5">
            <h5 className="text-center text-dark mt-5 " id="tablemargin">
              Exchange
            </h5>

            <div className="pt-2 ps-5 pe-5">
              <div className="form-floating mb-3">
                <input
                  value={bookname}
                  onChange={(e) => setBookname(e.target.value)}
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  required
                />
                <label htmlFor="floatingInput">Book Name</label>
              </div>
              <div className="form-floating">
                <input
                  value={authername}
                  onChange={(e) => setAuthername(e.target.value)}
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Auther Name"
                  required
                />
                <label htmlFor="floatingPassword">Auther Name</label>
              </div>
              <div className="form-floating">
                <input
                  value={discription}
                  onChange={(e) => setDiscription(e.target.value)}
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  required
                />
                <label htmlFor="floatingPassword">Discription</label>
              </div>
              <p class="alert" id="alertuser"></p>
              <div className="text-center m-3">
                <button
                  className="btn btn-primary text-center"
                  onClick={handleExchange}
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h5 id="tablemargin">Exchange status</h5>
          <div className="container">
            <div className="admin_exchange_head">
              <div class="row">
                <div class="col">Book Name</div>
                <div class="col">Request From</div>
                <div class="col">Accepted By</div>
                <div class="col">Accepted Date</div>
                <div class="col">status</div>
              </div>
            </div>
            {exchangeStatus.length ? (
              exchangeStatus.map((item) => (
                <div className="admin_exchange_body">
                  <div className="container-fluid">
                    <div class="row">
                      <div class="col">{item.bookname}</div>
                      <div class="col">{item.userid.firstname}</div>
                      <div class="col">{item.statusChangedBy.firstname}</div>
                      <div class="col">{formatDate(item.acceptedDate)}</div>
                      <div id="accepted_button" class="col">
                        {item.status}
                      </div>
                    </div>
                    <div className="container-fluid">
                      <div class="row">
                        <div class="col">{item.bookname}</div>
                        <div class="col">{item.userid.firstname}</div>
                        <div class="col">{item.statusChangedBy.firstname}</div>
                        <div class="col">{formatDate(item.acceptedDate)}</div>
                        <div id="accepted_button" class="col">
                          {item.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no_data">
                <h1>No Details Found</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReaderExchange;
