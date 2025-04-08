import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Nav.css"; // Make sure this is the correct CSS file

const AppointmentsView = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5001/appointments', {
          withCredentials: true,
        });
        setAppointments(response.data);
        setFilteredAppointments(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch appointments:', err);
        setError('Failed to fetch appointments.');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const filtered = appointments.filter((appt) => {
      switch (filter) {
        case 'Day':
          return appt.date === today;
        case 'Month':
          return new Date(appt.date).getMonth() === new Date().getMonth();
        case 'History':
          return new Date(appt.date) < new Date();
        case 'Cancelled':
          return appt.status === 'cancelled'; // optional field
        default:
          return true;
      }
    });
    setFilteredAppointments(filtered);
  }, [filter, appointments]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/appointments/${id}`, {
        withCredentials: true,
      });
      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    } catch (error) {
      alert('Failed to delete appointment.');
    }
  };

  const filters = ['All', 'Day', 'Month', 'History', 'Cancelled'];

  return (
    <div className="appointments-container">
      <h2 className="heading">Manage Appointments</h2>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {filters.map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`filter-btn ${filter === item ? 'active' : ''}`}
          >
            {item}
          </button>
        ))}
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="appointments-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Department</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.length > 0 ? (
                filteredAppointments.map((appt) => (
                  <tr key={appt._id}>
                    <td>{appt.name}</td>
                    <td>{appt.email}</td>
                    <td>{appt.phone}</td>
                    <td>{appt.gender}</td>
                    <td>{appt.age}</td>
                    <td>{appt.department}</td>
                    <td>{appt.doctor}</td>
                    <td>{appt.date}</td>
                    <td>{appt.time}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(appt._id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="no-data">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentsView;
