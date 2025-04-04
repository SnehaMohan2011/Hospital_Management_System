import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Admin.css';
import "../index.css";
import LogoImage from "../assets/logo.png";

const AdminDashboard = () => {
    const navigate = useNavigate();
    
    const [appointments, setAppointments] = useState([]);
    
    useEffect(() => {
        const fetchAdminData = async () => {
            let token = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");
    
            if (!token) {
                navigate("/admin/login");
                return;
            }
    
            try {
                const response = await axios.get("http://localhost:5001/admin/dashboard", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                console.log("Admin Data:", response.data);
            } catch (error) {
                if (error.response?.status === 401) {  // Token expired
                    const newToken = await refreshAccessToken();
                    if (newToken) {
                        axios.get("http://localhost:5001/admin/dashboard", {
                            headers: { Authorization: `Bearer ${newToken}` }
                        }).then(res => console.log("Admin Data:", res.data));
                    } else {
                        navigate("/admin/login");  // Redirect if refresh fails
                    }
                }
            }
        };
    
        fetchAdminData();
    }, []);
    
    

    const fetchAppointments = async (token) => {
        try {
            const response = await fetch("http://localhost:5001/appointments", {
                headers: { 
                    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZWEyY2I0NTZlYmI1N2I1N2Q0MTBmNiIsImlhdCI6MTc0MzQ1MzczMSwiZXhwIjoxNzQzNDU3MzMxfQ.YLet2SeLEVGK6E6mCJ-zPcOGenaN7BdE-MIoJbZV0HQ` // Include token in the Authorization header
                }
            });
    
            const data = await response.json();
            console.log("Fetched Appointments:", data); // Debugging
    
            if (response.ok) {
                setAppointments(data);
            } else {
                throw new Error(data.message || "Unauthorized access");
            }
        } catch (error) {
            console.error("Error fetching appointments:", error);
            navigate("/admin/login", { replace: true });
        }
    };

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");
            await fetch(`http://localhost:5001/appointments/${id}`, {
                method: "DELETE",
                headers: { 
                    "Authorization": `Bearer ${token}` // Include token for delete operation
                }
            });
            setAppointments(appointments.filter(appt => appt.id !== id));
        } catch (error) {
            console.error("Error deleting appointment:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        sessionStorage.removeItem("adminToken"); // Clears session storage too
        navigate("/admin/login");
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
                                <tr key={appt.id}>
                                    <td>{appt.name}</td>
                                    <td>{appt.email}</td>
                                    <td>{appt.phone}</td>
                                    <td>{appt.department}</td>
                                    <td>{appt.doctor}</td>
                                    <td>{appt.date}</td>
                                    <td>{appt.time}</td>
                                    <td>
                                        <button className="delete-btn" onClick={() => handleDelete(appt.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="8">No appointments available</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
