import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Nav.css';
import './AppointmentView.css';

const AppointmentsView = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingAppointment, setEditingAppointment] = useState(null);

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
          return appt.status === 'cancelled';
        default:
          return true;
      }
    });
    setFilteredAppointments(filtered);
  }, [filter, appointments]);

  const handleEditClick = (appt) => {
    setEditingAppointment(appt);
  };

  const handleCancelEdit = () => {
    setEditingAppointment(null);
  };

  const handleConfirmEdit = async () => {
    try {
      await axios.post('http://localhost:5001/appointments/send-confirmation', {
        email: editingAppointment.email,
        name: editingAppointment.name,
        date: editingAppointment.date,
        time: editingAppointment.time,
        department: editingAppointment.department,
        doctor: editingAppointment.doctor,
      });
  
      alert(`Email sent to ${editingAppointment.email}`);
      setEditingAppointment(null);
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      alert('Failed to send email.');
    }
  };

  const handleCancelAppointment = async () => {
    try {
      await axios.put(`http://localhost:5001/appointments/${editingAppointment._id}/cancel`);
  
      // Optional: update UI immediately
      const updatedAppointments = appointments.map(appt =>
        appt._id === editingAppointment._id ? { ...appt, status: 'cancelled' } : appt
      );
      setAppointments(updatedAppointments);
      alert(`Appointment cancelled for ${editingAppointment.name}`);
      setEditingAppointment(null);
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      alert('Failed to cancel appointment.');
    }
  };
  
  
  

  const filters = ['All', 'Day', 'Month', 'History', 'Cancelled'];

  return (
    <div className="appointments-container">
      <h2 className="heading">Manage Appointments</h2>

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
                <th>Actions</th>
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
                      {appt.status !== 'cancelled' && (
                        <button
                          onClick={() => handleEditClick(appt)}
                          className="delete-btn"
                          style={{ backgroundColor: '#ffc107', marginLeft: '8px' }}
                        >
                          EDIT
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="no-data">
                    No appointments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for Editing */}
      {editingAppointment && (
  <div className="edit-modal-overlay">
    <div className="edit-modal">
      {/* Close button at top-right */}
      <button className="modal-close-btn" onClick={handleCancelEdit} title="Close">
  &times;
</button>


      <h3>Editing Appointment</h3>
      <p><strong>Name:</strong> {editingAppointment.name}</p>
      <p><strong>Email:</strong> {editingAppointment.email}</p>
      <p><strong>Phone:</strong> {editingAppointment.phone}</p>
      <p><strong>Department:</strong> {editingAppointment.department}</p>
      <p><strong>Gender:</strong> {editingAppointment.gender}</p>
      <p><strong>Age:</strong> {editingAppointment.age}</p>
      <p><strong>Date:</strong> {editingAppointment.date}</p>
      <p><strong>Time:</strong> {editingAppointment.time}</p>

      <div className="edit-modal-actions">
        <button className="edit-bar-btn cancel" onClick={handleCancelAppointment}>
          Cancel
        </button>
        <button className="edit-bar-btn confirm" onClick={handleConfirmEdit}>
          Confirm
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AppointmentsView;
