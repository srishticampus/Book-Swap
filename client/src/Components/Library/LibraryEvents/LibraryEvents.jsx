import React, { useState } from 'react';
import img from "../../../Assets/donateimg.png";
import { useNavigate } from 'react-router-dom';

function LibraryEvents({url}) {
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    startDate: '',
    endDate: '',
      venue: '' 
  });
const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const libraryId = localStorage.getItem("libraryid");

  if (!libraryId) {
    alert("Library ID not found in local storage.");
    return;
  }

  const payload = {
    libraryId,
    eventName: formData.eventName,
    description: formData.description,
    startDate: formData.startDate,
    endDate: formData.endDate,
     venue: formData.venue
  };

  try {
    const response = await fetch('http://localhost:4059/add/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      alert("Event added successfully!");
      navigate("/library-view-events")
      setFormData({
        eventName: '',
        description: '',
        startDate: '',
        endDate: '',
        venue:""
      });
    } else {
      const errorData = await response.json();
      alert("Failed to add event: " + (errorData.message || "Unknown error"));
    }
  } catch (error) {
    console.error("Error adding event:", error);
    alert("An error occurred while adding the event.");
  }
};


  return (
    <div className="reader_donatebook">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <img src={img} alt="images" className="img_fluid" />
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 reader_donatebook_col2">
            <p className="reader_donatebooke_heading">Add Event</p>
            <form onSubmit={handleSubmit}>
              <div className="row align-items-center">
                <label className="col-sm-4 donatebook_label">Event Name</label>
                <div className="col-sm-8 reader_donatebook_inputs">
                  <input
                    type="text"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    required
                    title="Please fill the field"
                  />
                </div>

                <label className="col-sm-4 donatebook_label">Description</label>
                <div className="col-sm-8 reader_donatebook_inputs">
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </div>
                <label className="col-sm-4 donatebook_label">Venue</label>
<div className="col-sm-8 reader_donatebook_inputs">
  <input
    type="text"
    name="venue"
    value={formData.venue}
    onChange={handleChange}
    required
  />
</div>

                <label className="col-sm-4 donatebook_label">Start Date</label>
                <div className="col-sm-8 reader_donatebook_inputs">
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <label className="col-sm-4 donatebook_label">End Date</label>
                <div className="col-sm-8 reader_donatebook_inputs">
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-sm-8 reader_donatebook_inputs mt-3">
                  <button className="btn btn-primary btn-lg" id="readerdonatebook_button">
                    Add
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibraryEvents;







//copy of without api 

// import React from 'react'
// import img from "../../../Assets/donateimg.png"

// function LibraryEvents() {
//   return (
//  <div className="reader_donatebook">
//        <div className="container">
//          <div className="row">
//            <div className="col-sm-12 col-md-6 col-lg-6">
//              <img src={img} alt="images" className="img_fluid" />
//            </div>
//            <div className="col-sm-12 col-md-6 col-lg-6 reader_donatebook_col2">
//              <p className="reader_donatebooke_heading">Add Event</p>
//              <form >
//                <div className="row">
//                  <div className="row align-items-center ">
//                    <label className="col-sm-4 donatebook_label">Event Name</label>
//                    <div className="col-sm-8 reader_donatebook_inputs">
//                      <input
//                        type="text"
//                        placeholder=""
//                        name="bookname"
 
//                        required
//                        title="Please fill the field"
//                      />
//                    </div>
//                    <label className="col-sm-4 donatebook_label">
//                      Description
//                    </label>
 
//                    <div className="col-sm-8 reader_donatebook_inputs">
//                      <input
//                        type="text"
//                        placeholder=""
//                        name="authername"
       
//                        required
//                      />
//                    </div>
 
//                    <label className="col-sm-4 donatebook_label">Start Date</label>
 
//                    <div className="col-sm-8 reader_donatebook_inputs">
//                      <input
//                        type="date"
//                        placeholder=""
//                        name="publisher"
 
//                        required
//                      />
//                    </div>
 
//                    <label className="col-sm-4 donatebook_label">
//                      End Date
//                    </label>
 
//                    <div className="col-sm-8 reader_donatebook_inputs">
//                      <input
//                        type="date"
//                        placeholder=""
//                        name="publisheryear"
                    
//                        required
//                      />
//                    </div>
                   
//                    {/* <label className="col-sm-4 donatebook_label">Count</label>
//                    <div className="col-sm-8 reader_donatebook_inputs">
//                      <input
//                        type="number"
//                        placeholder=""
//                        name="count"
                    
//                        required
//                      />
//                    </div>
//                    <label className="col-sm-4 donatebook_label">
//                      Select a Image
//                    </label>
//                    <div className="col-sm-8 reader_donatebook_inputs">
//                      <input
//                        type="file"
//                        placeholder=""
//                        name="image"
                
//                        required
//                      />
//                    </div> */}
//                    <div className="col-sm-8 reader_donatebook_inputs ">
//                      <button
//                        className="btn btn-primary btn-lg"
//                        id="readerdonatebook_button"
//                      >
//                        Add 
//                      </button>
//                    </div>
//                  </div>
//                </div>
//              </form>
//            </div>
//          </div>
//        </div>
//      </div>
//   )
// }

// export default LibraryEvents

