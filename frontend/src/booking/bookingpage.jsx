import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './bookingpage.css';
import "../index.css";
import LogoImage from "../assets/logo.png";

const Bookingpage = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        age: '',
        department: '',
        doctor: '',
        date: '',
        time: ''
    });

    const doctorsByDepartment = {
        Cardiology: ["Dr. John Doe"],
        Neurology: ["Dr. Meera Shah"],
        Pediatrics: ["Dr. Neha Verma"],
        Dermatology: ["Dr. Prakash Menon"],
        Emergency: ["Dr. Ramesh Gupta", "Dr. Sneha Mohan", "Dr. Sameer Roy", "Dr. Amrita Balan"],
    };

    const [selectedDoctors, setSelectedDoctors] = useState([]);

    // Update doctors list when department changes
    useEffect(() => {
        if (formData.department) {
            setSelectedDoctors(doctorsByDepartment[formData.department] || []);
            setFormData((prev) => ({ ...prev, doctor: "" })); // Reset doctor selection
        } else {
            setSelectedDoctors([]);
        }
    }, [formData.department]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:5001/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
            if (response.ok) {
                alert("Appointment booked successfully! Confirmation email sent.");
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error sending request:", error);
            alert("Failed to send email. Check console for details.");
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
                <p> +91 422 350 0000 | +91 422 450 0000 </p><p>+91 7970 108 108</p>                   
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
                            
                    
                </ul>
            </nav>

            {/* Booking Section */}
            <div className="homepage-container">
                <div className="booking-container">
                    <h2>Book Your Appointment</h2>
                    <form className="booking-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                        </div>

                        <div className="input-group">
                            <input type="tel" name="phone" placeholder="Your Phone Number" value={formData.phone} onChange={handleChange} required />
                            <input type="text" name="age" placeholder="Your Age" value={formData.age} onChange={handleChange} required />
                        </div>

                        <div className="input-group">
                            <select name="gender" value={formData.gender} onChange={handleChange} required>
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>

                            <select name="department" value={formData.department} onChange={handleChange} required>
                                <option value="">Select Department</option>
                                {Object.keys(doctorsByDepartment).map((dept) => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>

                        <div className="input-group">
                            <select name="doctor" value={formData.doctor} onChange={handleChange} required>
                                <option value="">Select Doctor</option>
                                {selectedDoctors.length > 0 ? (
                                    selectedDoctors.map((doctor, index) => (
                                        <option key={index} value={doctor}>{doctor}</option>
                                    ))
                                ) : (
                                    <option value="" disabled>No doctors available</option>
                                )}
                            </select>

                            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                            <input type="time" name="time" value={formData.time} onChange={handleChange} required />
                        </div>

                        <button type="submit" className="booking-btn">Confirm Appointment</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Bookingpage;
