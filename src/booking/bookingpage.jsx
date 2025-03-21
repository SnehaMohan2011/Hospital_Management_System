import React, { useEffect, useState } from "react";
import './bookingpage.css';

const Bookingpage = () => {
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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const doctorsByDepartment = {
        Cardiology: ["Dr. John Doe", "Dr. Jane Smith", "Dr. Rajesh Kumar", "Dr. Priya Reddy"],
        Neurology: ["Dr. Anand Mehta", "Dr. Kavita Rao", "Dr. Arjun Kapoor", "Dr. Meera Shah"],
        Pediatrics: ["Dr. Divya Patel", "Dr. Neha Verma", "Dr. Vikram Singh", "Dr. Anjali Sharma"],
        Dermatology: ["Dr. Shruti Iyer", "Dr. Harsha Nair", "Dr. Prakash Menon", "Dr. Asha Goyal"],
        Emergency: ["Dr. Ramesh Gupta", "Dr. Sneha Mohan", "Dr. Sameer Roy", "Dr. Amrita Balan"],
    };
    const [selectedDoctors, setSelectedDoctors] = useState([]);

    const handleDepartmentChange = (e) => {
        const selectedDepartment = e.target.value;
        setFormData({ ...formData, department: selectedDepartment, doctor: '' });
        setSelectedDoctors(doctorsByDepartment[selectedDepartment] || []);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Appointment Booked Successfully for ${formData.name}!`);
    };
    return (
        <div className="homepage-container">
            {/* Header Section */}
            <header className="header">
                <div className="logo-container">
                    <img src="/assets/logo.png" alt="Sri Ramakrishna Hospital Logo" className="logo" />
                    <h1>Sri Ramakrishna Hospital</h1>
                    <p>"Expertise You Can Trust"</p>
                </div>

                <div className="contact-info">
                    <p>+91 422 350 0000 | +91 422 450 0000 | +91 7970 108 108</p>
                    <p>395, Sarojini Naidu Rd, New Siddhapudur, Coimbatore, Tamil Nadu 641044.</p>
                </div>
            </header>

            {/* Navigation Bar */}
            <nav className="navbar">
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Doctors</li>
                    <li>Facilities</li>
                    <li>Health Packages</li>
                    <li>Admin Log</li>
                </ul>
            </nav>
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

                        <select name="department" value={formData.department} onChange={handleDepartmentChange} required>
                            <option value="">Select Department</option>
                            {Object.keys(doctorsByDepartment).map((dept) => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>

                    <div className="input-group">
                        <select name="doctor" value={formData.doctor} onChange={handleChange} required>
                            <option value="">Select Doctor</option>
                            {selectedDoctors.map((doctor, index) => (
                                <option key={index} value={doctor}>{doctor}</option>
                            ))}
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
