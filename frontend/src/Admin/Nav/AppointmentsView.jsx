import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AppointmentsView = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5001/appointments', {
          withCredentials: true,
        });
        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch appointments:', err);
        setError('Failed to fetch appointments.');
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

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

  return (
    <div style={{ padding: '20px' }}>
      <h2>Manage Appointments</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Phone</th><th>Department</th>
              <th>Doctor</th><th>Date</th><th>Time</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt._id}>
                <td>{appt.name}</td>
                <td>{appt.email}</td>
                <td>{appt.phone}</td>
                <td>{appt.department}</td>
                <td>{appt.doctor}</td>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td>
                  <button onClick={() => handleDelete(appt._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

};

export default AppointmentsView;
