import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import './Admin.css';

import LogoImage from "../assets/logo.png";
import axios from "axios";

const AdminLogin = () => {
    const [formData, setFormData] = useState({ email: "", password: "", stayLoggedIn: false });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const fieldValue = type === "checkbox" ? checked : value;
        setFormData((prev) => ({ ...prev, [name]: fieldValue }));
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:5001/admin/login", formData, {
                withCredentials: true
            });

            console.log("Login response:", res.data);

            // Change this condition based on your actual backend response
            if (res.data.success || res.data.message === "Login successful") {
                navigate("/admin/dashboard");
            } else {
                setError("Invalid email or password.");
            }
        } catch (err) {
            console.error("Login failed:", err);
            setError(err.response?.data?.message || "Login failed.");
        } finally {
            setLoading(false);
        }
    };

    const isInvalid = !!error;

    return (
        <div className="homepage-container">
            <header className="header">
                <div className="logo-container">
                    <img src={LogoImage} alt="Logo" className="logo" />
                    <h1>Sneharika Hospital</h1>
                    <p>"Expertise You Can Trust"</p>
                </div>
                <div className="contact-info">
                    <p>+91 422 350 0000 | +91 422 450 0000</p>
                    <p>+91 7970 108 108</p>
                    <p>No. 395, Myleripalayam, Otthakkalmandapam, Coimbatore - 641032</p>
                </div>
            </header>

            

            <div className="login-container">
                <div className="login-box">
                    <h2>Admin Login</h2>

                    {error && <p className="error-message">{error}</p>}

                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <h5>Email</h5>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={isInvalid ? "input-error" : ""}
                            />
                        </div>

                        <div className="input-group password-group">
                            <h5>Password</h5>
                            <div className="password-input-wrapper">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className={isInvalid ? "input-error" : ""}
                                />
                                <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash className="password-toggle-icon" /> : <FaEye className="password-toggle-icon" />}
                                </span>
                            </div>
                        </div>

                        <div className="checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="stayLoggedIn"
                                    checked={formData.stayLoggedIn}
                                    onChange={handleChange}
                                />
                                Stay logged in
                            </label>
                        </div>

                        <button type="submit" className="login-btn" disabled={loading}>
                            {loading ? "Signing in..." : "SIGN IN"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
