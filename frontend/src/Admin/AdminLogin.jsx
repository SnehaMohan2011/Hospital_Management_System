import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './Admin.css';
import "../index.css";
import LogoImage from "../assets/logo.png";
import axios from "axios";

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: '', password: '', stayLoggedIn: false });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");
    
        if (token) {
            axios.post("http://localhost:5001/admin/verify-token", { token })
                .then(response => {
                    console.log("Token verification response:", response.data);
                    if (response.data.valid) {
                        navigate("/admin/dashboard", { replace: true });
                    } else {
                        refreshToken(); // Try refreshing if invalid
                    }
                })
                .catch(() => {
                    localStorage.removeItem("adminToken");
                    sessionStorage.removeItem("adminToken");
                });
        }
    }, [navigate]);
    ;

    const fetchAdminData = async () => {
        let token = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");
    
        if (!token) {
            navigate("/admin/login");
            return;
        }
    
        try {
            const response = await axios.get("http://localhost:5001/admin/dashboard", {
                headers: {
                    Authorization: `Bearer {$token}`
                }
            });
    
            console.log("Admin Dashboard Data:", response.data);
        } catch (error) {
            if (error.response?.status === 401) {
                console.log("Access token expired. Refreshing...");
                token = await refreshAccessToken();
    
                if (token) {
                    fetchAdminData();  // Retry with new token
                }
            } else {
                console.error("Error fetching admin data", error);
            }
        }
    };
    
    
    useEffect(() => {
        fetchAdminData();
    }, []);

    
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: type === "checkbox" ? checked : value }));
        setError("");  // Clear error when user starts typing
        setIsInvalid(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        try {
            const response = await axios.post("http://localhost:5001/admin/login", {
                email: formData.email,
                password: formData.password
            });
    
            if (response.data.success && response.data.token) {
                const accessToken = response.data.token;
                const refreshToken = response.data.refreshToken;
    
                if (formData.stayLoggedIn) {
                    // Save tokens in localStorage if 'Stay Logged In' is checked
                    localStorage.setItem("adminToken", accessToken);
                    localStorage.setItem("refreshToken", refreshToken);
                } else {
                    // Save tokens in sessionStorage (temporary)
                    sessionStorage.setItem("adminToken", accessToken);
                    sessionStorage.setItem("refreshToken", refreshToken);
                }
    
                navigate("/admin/dashboard", { replace: true });
            } else {
                setError("Invalid user! Please check your credentials.");
                setIsInvalid(true);
            }
        } catch (error) {
            setError(error.response?.data?.message || "Login failed. Check your credentials.");
            setIsInvalid(true);
        } finally {
            setLoading(false);
        }
    };
    
    
    const refreshToken = async () => {
        try {
            const oldToken = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");
    
            if (!oldToken) return;
    
            const response = await axios.post("http://localhost:5001/admin/refresh-token", { token: oldToken });
    
            if (response.data.success && response.data.newToken) {
                const newToken = response.data.newToken;
                
                if (localStorage.getItem("adminToken")) {
                    localStorage.setItem("adminToken", newToken);
                } else {
                    sessionStorage.setItem("adminToken", newToken);
                }
    
                console.log("Token refreshed:", newToken);
            }
        } catch (error) {
            console.error("Token refresh failed:", error);
            localStorage.removeItem("adminToken");
            sessionStorage.removeItem("adminToken");
            navigate("/admin/login"); // Redirect to login page if refresh fails
        }
    };
    
    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem("refreshToken") || sessionStorage.getItem("refreshToken");
    
        if (!refreshToken) {
            setError("Session expired. Please log in again.");
            navigate("/admin/login");
            return;
        }
    
        try {
            const response = await axios.post("http://localhost:5001/admin/refresh-token", {
                token: refreshToken
            });
    
            if (response.data.success && response.data.newToken) {
                const newAccessToken = response.data.newToken;
    
                if (localStorage.getItem("refreshToken")) {
                    localStorage.setItem("adminToken", newAccessToken);
                } else {
                    sessionStorage.setItem("adminToken", newAccessToken);
                }
    
                return newAccessToken;
            } else {
                setError("Session expired. Please log in again.");
                navigate("/admin/login");
            }
        } catch (error) {
            console.error("Error refreshing token", error);
            navigate("/admin/login");
        }
    };
    

    return (
        <div className="homepage-container">
            {/* Header Section */}
            <header className="header">
                <div className="logo-container">
                    <img src={LogoImage} alt="Sneharika Hospital Logo" className="logo" />
                    <h1>Sneharika Hospital</h1>
                    <p>"Expertise You Can Trust"</p>
                </div>

                <div className="contact-info">
                    <p>+91 422 350 0000 | +91 422 450 0000 | +91 7970 108 108</p>
                    <p>No. 395, Myleripalayam, Otthakkalmandapam, Coimbatore - 641032, Tamil Nadu, India.</p>
                </div>
            </header>

            {/* Navigation Bar */}
            <nav className="navbar">
                <ul>
                <li onClick={() => navigate("/")}>Home</li>
                            <li onClick={() => navigate("/about")}>About Us</li>
                            <li onClick={() => navigate("/doctors")}>Doctors</li>
                            <li onClick={() => navigate("/facilities")}>Facilities</li>
                            <li onClick={() => navigate("/contact")}>Contact Us</li>
                            <li onClick={() => navigate("/admin/login")}>Admin Log</li>
                </ul>
            </nav>

            {/* Login Section */}
            <div className="login-container">
                <div className="login-box">
                    <h2>Admin Login</h2>

                    {error && <p className="error-message">{error}</p>}

                    <form onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div className="input-group">
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Email" 
                                value={formData.email} 
                                onChange={handleChange} 
                                required 
                                className={isInvalid ? "input-error" : ""}
                            />
                        </div>

                        {/* Password Input with Toggle */}
                        <div className="input-group password-group">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                name="password" 
                                placeholder="Password" 
                                value={formData.password} 
                                onChange={handleChange} 
                                required 
                                className={isInvalid ? "input-error" : ""}
                            />
                            
                        </div>

                        {/* Stay Logged In Checkbox */}
                        <div className="options">
                            <label>
                                <input type="checkbox" name="stayLoggedIn" checked={formData.stayLoggedIn} onChange={handleChange} />
                                Stay logged in
                            </label>
                        </div>

                        {/* Login Button */}
                        <button type="submit" className="login-btn" disabled={loading} >
                            {loading ? "Signing in..." : "SIGN IN"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
