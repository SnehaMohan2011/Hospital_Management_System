import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Admin.css";
import LogoImage from "../assets/logo.png";
import axios from "axios";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    stayLoggedIn: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateToken = async (token) => {
    try {
      const res = await axios.get("http://localhost:5001/admin/validate", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch {
      return { valid: false };
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken") || sessionStorage.getItem("adminToken");
    const role = localStorage.getItem("role") || sessionStorage.getItem("role");

    if (token && role === "admin") {
      validateToken(token).then((res) => {
        if (res.valid && res.user?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          localStorage.clear();
          sessionStorage.clear();
        }
      });
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    const { email, password, stayLoggedIn } = formData;
  
    try {
      const response = await axios.post('http://localhost:5001/admin/login', { email, password });
  
      const token = response.data.token;
      if (stayLoggedIn) {
        localStorage.setItem("adminToken", token);
        localStorage.setItem("role", "admin");
      } else {
        sessionStorage.setItem("adminToken", token);
        sessionStorage.setItem("role", "admin");
      }
  
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      const message = error.response?.data?.message || "Login failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  
  
  
  
  
      

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
              <label htmlFor="email"><h5>Email</h5></label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className={error ? "input-error" : ""}
              />
            </div>

            <div className="input-group password-group">
              <label htmlFor="password"><h5>Password</h5></label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={error ? "input-error" : ""}
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword((prev) => !prev)}
                  role="button"
                  aria-label="Toggle password visibility"
                  tabIndex={0}
                >
                  {showPassword ? (
                    <FaEyeSlash className="password-toggle-icon" />
                  ) : (
                    <FaEye className="password-toggle-icon" />
                  )}
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
