import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
function LibraryViewEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    // const isLibraryLoggedin = localStorage.getItem("liblogin") === 'true'
    const isUserLoggedIn = localStorage.getItem("userlogin") === 'true'
    const isAdminLogged = localStorage.getItem("isAdminLoggedIn")==="true"

    useEffect(() => {
        axios.get('http://localhost:4059/viewall/events')
            .then(response => {
                setEvents(response.data);
                console.log(response.data)
                setLoading(false);
            })
            .catch(err => {
                setError(err.message || 'Failed to fetch events');
                setLoading(false);
            });
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;

        try {

            axios.get(`http://localhost:4059/deleteevents/id?id=${id}`);

            setEvents(prev => prev.filter(event => event._id !== id));
        } catch (err) {
            alert('Failed to delete event: ' + (err.response?.data?.message || err.message));
        }
    };


    return (
        <div className="container mt-4">
            {/* {!isAdminLoggedIn && (
                <Link to='/library-events'>
                    <button className='btn btn-success btn-lg mb-3'>Add Event</button>
                </Link>
            )} */}
            {/* {
        !isLibraryLoggedin && (
                    <Link to='/library-events'>
                    <button className='btn btn-success btn-lg mb-3'>Add Event</button>
                </Link>
        )
    } */}
            {
                !isUserLoggedIn && !isAdminLogged &&(
                    <Link to='/library-events'>
                        <button className='btn btn-success btn-lg mb-3'>Add Event</button>
                    </Link>

                )
            }
            <h2 className="mb-4"> Events</h2>


            {loading && <div className="alert alert-info">Loading events...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {!loading && !error && (
                <table className="table table-bordered table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th>Event Name</th>
                            <th>Description</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Library</th>
                            <th>Contact</th>
                            <th>Email</th>
                            <th>Venue</th>
                            {
                                !isUserLoggedIn && !isAdminLogged && (
                                    <th>Delete</th>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event._id}>
                                <td>{event.eventName}</td>
                                <td>{event.description}</td>
                                <td>{new Date(event.startDate).toLocaleDateString()}</td>
                                <td>{new Date(event.endDate).toLocaleDateString()}</td>
                                <td>{event.status}</td>
                                <td>{event.libraryId?.libraryname || 'N/A'}</td>
                                <td>{event.libraryId?.contact || 'N/A'}</td>
                                <td>{event.libraryId?.email || 'N/A'}</td>
                                <td>
                              {event.venue || "NA"}
                                </td>
                                {
                                    !isUserLoggedIn && !isAdminLogged && (
                                        <td>
                                            <button className="btn btn-danger" onClick={() => handleDelete(event._id)}>
                                                Delete
                                            </button>
                                        </td>
                                    )
                                }
                            </tr>
                        ))}

                    </tbody>
                </table>
            )}
        </div>
    );
}

export default LibraryViewEvents;
