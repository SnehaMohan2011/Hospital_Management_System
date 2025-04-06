import React from "react";
import { useNavigate } from "react-router-dom";
import "./doctors.css";
import "../index.css";
import LogoImage from "../assets/logo.png";

// Importing doctor images
import doctor1 from "../assets/doc12.jpeg";
import doctor2 from "../assets/doc16.jpeg";
import doctor3 from "../assets/doc17.jpeg";
import doctor4 from "../assets/doc19.jpeg";

const Doctors = () => {
    const navigate = useNavigate();

    return (
        <div className="homepage-container">
            {/* Header Section */}
            <header className="header">
                <div className="logo-container">
                    <img src={LogoImage} alt="Sri Ramakrishna Hospital Logo" className="logo" />                     <h1>Sneharika Hospital</h1>
                    <p>"Expertise You Can Trust"</p>
                </div>

                <div className="contact-info">
                <p> +91 422 350 0000 | +91 422 450 0000 </p><p>+91 7970 108 108</p>                    <p>  No. 395, Myleripalayam, Otthakkalmandapam, Coimbatore - 641032, Tamil Nadu, India.</p>
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

            {/* Doctors Section */}
            <section className="doctors-section">
                <p>Meet Our Expert Doctors</p>
                <div className="doctors-container">
                    {/* Doctor 1 */}
                    <div className="doctor-card" onClick={() => navigate("/doctors/dr-john-doe")}>
                        <img src={doctor1} alt="Dr. John Doe" />
                        <h3>Dr. John Doe</h3>
                        <p>Cardiologist</p>
                    </div>

                    {/* Doctor 2 */}
                    <div className="doctor-card">
                        <img src={doctor2} alt="Dr. Sarah Smith" />
                        <h3>Dr. Meera Shah</h3>
                        <p>Neurologist</p>
                    </div>

                    {/* Doctor 3 */}
                    <div className="doctor-card">
                        <img src={doctor3} alt="Dr. Emily Johnson" />
                        <h3>Dr. Neha Verma</h3>
                        <p>Orthopedic Surgeon</p>
                    </div>

                    {/* Doctor 4 */}
                    <div className="doctor-card">
                        <img src={doctor4} alt="Dr. Michael Brown" />
                        <h3>Dr. Prakash Menon</h3>
                        <p>Dermatologist</p>
                    </div>
                   
                    
                </div>
            </section>
        </div>
    );
};

export default Doctors;
