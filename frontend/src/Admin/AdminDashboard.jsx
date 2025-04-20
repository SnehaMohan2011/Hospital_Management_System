import React, { useEffect, useState } from "react";
import './Admin.css';
import LogoImage from "../assets/logo.png";
import ProfileImage from "../assets/profile.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardView from "../Admin/Nav/DashboardView";
import AppointmentsView from "../Admin/Nav/AppointmentsView";
import DoctorsView from "../Admin/Nav/DoctorsView";

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState("dashboard");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Validate token and role on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login");
        return;
      }

      try {
        const res = await axios.get("http://localhost:5001/admin/validate", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.valid && res.data.user.role === "admin") {
          setAuthorized(true);
        } else {
          throw new Error("Unauthorized");
        }
      } catch (error) {
        console.error("Authorization failed:", error);
        localStorage.clear();
        sessionStorage.clear();
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Loading Screen
  if (loading) {
    return <div className="loading-screen">Loading Dashboard...</div>;
  }

  // Not Authorized
  if (!authorized) {
    return <div className="loading-screen">Not Authorized. Redirecting...</div>;
  }

  // Handle Logout
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/admin/login");
  };

  // Render main view content based on selected tab
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
          <img src={LogoImage} alt="Sneharika Logo" className="logo" />
          <h2>Sneharika Hospital</h2>
          <p className="tagline">"Expertise You Can Trust"</p>
        </div>

        <ul className="nav-links">
          <li
            className={selectedTab === "dashboard" ? "active-tab" : ""}
            onClick={() => setSelectedTab("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={selectedTab === "appointments" ? "active-tab" : ""}
            onClick={() => setSelectedTab("appointments")}
          >
            Appointments
          </li>
          <li
            className={selectedTab === "doctors" ? "active-tab" : ""}
            onClick={() => setSelectedTab("doctors")}
          >
            Doctors
          </li>
          <li className="logout-link" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </nav>

      {/* Main Panel */}
      <div className="dashboard-main-panel">
        <header className="dashboard-header">
          <div className="time-display">{currentTime}</div>
          <div className="admin-profile">
            <img src={ProfileImage} alt="Admin Avatar" className="admin-avatar" />
            <span className="admin-name">Admin</span>
          </div>
        </header>

        <main className="content">{renderContent()}</main>
      </div>
    </div>
  );
};

export default AdminDashboard;
