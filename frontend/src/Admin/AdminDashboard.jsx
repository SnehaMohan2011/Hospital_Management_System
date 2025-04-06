import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Admin.css';
import "../index.css";
import LogoImage from "../assets/logo.png";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:5001/appointments", {
        withCredentials: true, // ✅ Needed for session-based auth
      });

      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        navigate("/admin/login");
      } else {
        setError("Failed to fetch appointments.");
      }
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      try {
        await axios.get("http://localhost:5001/admin/dashboard", {
          withCredentials: true,
        });

        await fetchAppointments();
      } catch (error) {
        console.error("Session check failed:", error);
        navigate("/admin/login");
      }
    };

    checkSession();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/appointments/${id}`, {
        withCredentials: true,
      });

      setAppointments((prev) => prev.filter((appt) => appt._id !== id));
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5001/admin/logout", {}, {
        withCredentials: true,
      });
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="homepage-container">
      <header className="header">
        <div className="logo-container">
          <img src={LogoImage} alt="Sneharika Hospital Logo" className="logo" />
          <h1>Admin Dashboard</h1>
        </div>
        <nav className="navbar">
          <ul>
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/doctors")}>Doctors</li>
            <li onClick={() => navigate("/patients")}>Patients</li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </nav>
      </header>

      <div className="content">
        <h2>Manage Appointments</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Department</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appt) => (
                <tr key={appt._id}>
                  <td>{appt.name}</td>
                  <td>{appt.email}</td>
                  <td>{appt.phone}</td>
                  <td>{appt.department}</td>
                  <td>{appt.doctor}</td>
                  <td>{appt.date}</td>
                  <td>{appt.time}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(appt._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No appointments available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
