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

    const [selectedDoctors, setSelectedDoctors] = useState([]);
    const [doctorTime, setDoctorTime] = useState("");
    const [bookedDoctors, setBookedDoctors] = useState([]);
    const [bookedDates, setBookedDates] = useState([]);

    const doctorsByDepartment = {
        Cardiology: [
            { name: "Dr. John", time: "08:00 AM – 4:00 PM" },
            { name: "Dr. Asha Reddy", time: "03:00 PM – 7:00 PM" },
            { name: "Dr. Karan Bhatia", time: "09:00 AM – 1:00 PM" },
            { name: "Dr. Priya Nair", time: "01:00 PM – 5:00 PM" }
        ],
        Neurology: [
            { name: "Dr. Meera Shah", time: "09:00 AM – 2:00 PM" },
            { name: "Dr. Arvind Rao", time: "10:00 AM – 2:00 PM" },
            { name: "Dr. Nilesh Kumar", time: "11:00 AM – 3:00 PM" },
            { name: "Dr. Tanya Joseph", time: "02:00 PM – 6:00 PM" }
        ],
        Pediatrics: [
            { name: "Dr. Neha Verma", time: "09:00 AM – 1:00 PM" },
            { name: "Dr. Kavya Sinha", time: "02:00 PM – 6:00 PM" },
            { name: "Dr. Ramesh Iyer", time: "10:00 AM – 1:00 PM" },
            { name: "Dr. Vikram Solanki", time: "11:00 AM – 4:00 PM" }
        ],
        Dermatology: [
            { name: "Dr. Prakash Menon", time: "03:00 PM – 6:00 PM" },
            { name: "Dr. Anjali Suresh", time: "01:00 PM – 5:00 PM" },
            { name: "Dr. Reema Das", time: "11:00 AM – 2:00 PM" },
            { name: "Dr. Vinod Krishnan", time: "09:00 AM – 1:00 PM" }
        ],
        Emergency: [
            { name: "Dr. Ramesh Gupta", time: "24x7" },
            { name: "Dr. Sneha Mohan", time: "24x7" },
            { name: "Dr. Sameer Roy", time: "24x7" },
            { name: "Dr. Amrita Balan", time: "24x7" }
        ]
    };

    useEffect(() => {
        const fetchBookedDoctors = async () => {
            if (formData.department) {
                try {
                    const response = await fetch(`http://localhost:5001/booked-doctors`);
                    const data = await response.json();
                    setBookedDoctors(data);

                    const departmentDoctors = doctorsByDepartment[formData.department] || [];

                    const availableDoctors = departmentDoctors.filter(doc => {
                        const count = data.filter(entry => entry.doctor === doc.name);
                        const bookedCount = count.reduce((acc, entry) => acc + entry.count, 0);
                        return bookedCount < 5;
                    });

                    setSelectedDoctors(availableDoctors);

                    if (!availableDoctors.find(doc => doc.name === formData.doctor)) {
                        setFormData(prev => ({
                            ...prev,
                            doctor: '',
                            time: '',
                            date: ''
                        }));
                        setDoctorTime('');
                        setBookedDates([]);
                    }

                } catch (err) {
                    console.error("Failed to fetch booked doctors:", err);
                }
            } else {
                setSelectedDoctors([]);
            }
        };

        fetchBookedDoctors();
    }, [formData.department]);

    useEffect(() => {
        if (formData.doctor) {
            const filtered = bookedDoctors.filter(entry =>
                entry.doctor === formData.doctor && entry.count >= 5
            );
            const dates = filtered.map(entry => entry.date); // yyyy-mm-dd format
            setBookedDates(dates);
        } else {
            setBookedDates([]);
        }
    }, [formData.doctor, bookedDoctors]);

    const handleChange = (e) => {
        const { name, value } = e.target;
    
        if (name === "department") {
            // Update department first
            setFormData(prev => ({ ...prev, department: value, doctor: '', time: '', date: '' }));
    
            // Filter doctors directly
            const departmentDoctors = doctorsByDepartment[value] || [];
    
            const availableDoctors = departmentDoctors.filter(doc => {
                const count = bookedDoctors.filter(entry => entry.doctor === doc.name);
                const bookedCount = count.reduce((acc, entry) => acc + entry.count, 0);
                return bookedCount < 5;
            });
    
            setSelectedDoctors(availableDoctors);
            setDoctorTime('');
            setBookedDates([]);
        }
        else if (name === "doctor") {
            const selected = selectedDoctors.find(doc => doc.name === value);
            const time = selected?.time || "";
            setDoctorTime(time);
            setFormData(prev => ({ ...prev, doctor: value, time, date: '' }));
        }
        else if (name === "date") {
            setFormData(prev => ({ ...prev, date: value }));
        }
        else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
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
            <header className="header">
                <div className="logo-container">
                    <img src={LogoImage} alt="Sneharika Hospital Logo" className="logo" />
                    <h1>Sneharika Hospital</h1>
                    <p>"Expertise You Can Trust"</p>
                </div>
                <div className="contact-info">
                    <p>+91 422 350 0000 | +91 422 450 0000</p>
                    <p>+91 7970 108 108</p>
                    <p>No. 395, Myleripalayam, Otthakkalmandapam, Coimbatore - 641032, Tamil Nadu, India.</p>
                </div>
            </header>

            <nav className="navbar">
                <ul>
                    <li onClick={() => navigate("/")}>Home</li>
                    <li onClick={() => navigate("/about")}>About Us</li>
                    <li onClick={() => navigate("/doctors")}>Doctors</li>
                    <li onClick={() => navigate("/facilities")}>Facilities</li>
                    <li onClick={() => navigate("/contact")}>Contact Us</li>
                </ul>
            </nav>

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
                                selectedDoctors.map((doc, index) => (
                                    <option key={index} value={doc.name}>{doc.name}</option>
                                ))
                            ) : (
                                <option value="" disabled>No doctors available</option>
                            )}
                        </select>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            min={new Date().toISOString().split("T")[0]}
                            required
                            onKeyDown={(e) => e.preventDefault()} // Prevent manual typing
                            className={bookedDates.includes(formData.date) ? "disabled-date" : ""}
                            disabled={selectedDoctors.length === 0}
                        />
                        <input type="text" name="time" value={doctorTime} readOnly placeholder="Doctor's Time Slot" required />
                    </div>
                    <button type="submit" className="booking-btn">Confirm Appointment</button>
                </form>
            </div>
        </div>
    );
};

export default Bookingpage;
