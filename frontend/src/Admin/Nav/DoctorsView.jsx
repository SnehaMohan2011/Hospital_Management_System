import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DoctorView.css';

function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5001/doctors')
      .then(response => setDoctors(response.data))
      .catch(error => console.error('Error fetching doctors:', error));
  }, []);

  const handleDoctorClick = (doctor) => {
    setSelectedDoctor(doctor);
    axios.get(`http://localhost:5001/appointments/doctor/${encodeURIComponent(doctor.name)}`)
    .then(response => setAppointments(response.data))
    .catch(error => console.error('Error fetching appointments:', error));
  
  };

  const handleBackClick = () => {
    setSelectedDoctor(null);
    setAppointments([]);
  };

  return (
    <div className="doctorview-container">
      {!selectedDoctor ? (
        // === Doctor List View ===
        <div className="doctor-list-view">
          <h2>Doctors</h2>
          <div className="dash-doctor-list">
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                className="dash-doctor-card"
                onClick={() => handleDoctorClick(doctor)}
              >
                <h4>{doctor.name}</h4>
                <p><strong>Department: </strong> {doctor.department || doctor.specialization}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // === Appointment View for Selected Doctor ===
        <div className="appointment-view">
          <button className="back-btn" onClick={handleBackClick}>← Back</button>
          <h3>Appointments for Dr. {selectedDoctor.name}</h3>
          {appointments.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Gender</th>
                  <th>Age</th>
                  <th>Department</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment._id}>
                    <td>{appointment.name}</td>
                    <td>{appointment.email}</td>
                    <td>{appointment.phone}</td>
                    <td>{appointment.gender}</td>
                    <td>{appointment.age}</td>
                    <td>{appointment.department}</td>
                    <td>{appointment.doctor}</td>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No appointments found for this doctor.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default DoctorsPage;
