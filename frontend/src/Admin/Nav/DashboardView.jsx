import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import './DashboardView.css';

const DashboardView = () => {
  const [appointmentsToday, setAppointmentsToday] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [appointmentStats, setAppointmentStats] = useState([]);

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [apptToday, totalAppts, doctors, patients, stats] = await Promise.all([
          axios.get('http://localhost:5001/appointments/today'),
          axios.get('http://localhost:5001/appointments/total'),
          axios.get('http://localhost:5001/doctors/total'),
          axios.get('http://localhost:5001/appointments/stats')
        ]);


        setAppointmentsToday(apptToday.data.count);
        setTotalAppointments(totalAppts.data.count);
        setTotalDoctors(doctors.data.count);
        setTotalPatients(patients.data.count);
        setAppointmentStats(stats.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dash-dashboard-container">
      <h2>Admin Dashboard Overview</h2>

      {/* Quick Stats as Cards in a Row */}
      <div className="quick-stats-row">
        <div className="stat-card">
          <h5>Appointments Today</h5>
          <p>{appointmentsToday}</p>
        </div>
        <div className="stat-card">
          <h5>Total Appointments</h5>
          <p>{totalAppointments}</p>
        </div>
        <div className="stat-card">
          <h5>Total Doctors</h5>
          <p>{totalDoctors}</p>
        </div>
        
      </div>

      {/* Action Cards */}
      <div className="action-cards">
        <div className="action-card">
          <h4>Manage Patients</h4>
          <p>View and edit patient information.</p>
          <button onClick={() => navigate('/admin/offline-patients')}>Go to Patients</button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
