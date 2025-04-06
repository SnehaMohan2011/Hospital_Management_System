import React, { useEffect, useState } from "react";
import axios from "axios";
import './Admin.css';
import "../index.css";
import LogoImage from "../assets/logo.png";
import ProfileImage from "../assets/profile.png";


import DashboardView from "../Admin/Nav/DashboardView";
import AppointmentsView from "../Admin/Nav/AppointmentsView";
import DoctorsView from "../Admin/Nav/DoctorsView";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (selectedTab) {
      case "dashboard":
        return <DashboardView />;
      case "appointments":
        return <AppointmentsView />;
      case "doctors":
        return <DoctorsView />;
      default:
        return <p>Select a section from the menu.</p>;
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <nav className="admin-navbar-vertical">
        <div className="logo-container-vertical">
          <img src={LogoImage} alt="Logo" className="logo" />
          <h2>Sneharika Hospital</h2>
          <p className="tagline">"Expertise You Can Trust"</p>
        </div>
        <ul className="nav-links">
          <li onClick={() => setSelectedTab("dashboard")}>Dashboard</li>
          <li onClick={() => setSelectedTab("appointments")}>Appointments</li>
          <li onClick={() => setSelectedTab("doctors")}>Doctors</li>
        </ul>
      </nav>

      {/* Main Panel */}
      <div className="dashboard-main-panel">
        {/* Top Header */}
        <div className="dashboard-header">
          <div className="time-display">{currentTime}</div>
          <div className="admin-profile">
            <img src={ProfileImage} alt="Admin" className="admin-avatar" />
            <span className="admin-name">Admin</span>
          </div>
        </div>

        {/* Main Content */}
        <main className="content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
