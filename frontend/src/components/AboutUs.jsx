import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";
import "../index.css";
import AboutImage from "../assets/hospital2.jpeg";
import LogoImage from "../assets/logo.png"; 

const AboutUs = () => {
    const navigate = useNavigate();

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

            {/* About Section */}
            <header className="about-header">
                <h1>About Sneharika Hospital</h1>
                <p>Delivering Excellence in Healthcare Since 1980</p>
            </header>

            <section className="about-intro">
                <div className="about-content">
                    <h2>Who We Are</h2>
                    <p>
                        Sneharika Hospital is one of the leading multispecialty hospitals in Coimbatore.
                        Established in 1980, we have grown to become a beacon of healthcare excellence,
                        offering cutting-edge treatments and compassionate care. Our expert team of
                        doctors and staff are dedicated to providing top-quality medical services
                        with state-of-the-art technology.
                    </p>
                </div>
                <div className="about-image">
                    <img src={AboutImage} alt="Hospital Building" />
                </div>
            </section>

            {/* Mission & Vision Section */}
            <section className="mission-vision">
                <div className="mission">
                    <h2>Our Mission</h2>
                    <p>To provide high-quality, affordable healthcare to all, focusing on patient-centric care and innovative medical treatments.</p>
                </div>
                <div className="vision">
                    <h2>Our Vision</h2>
                    <p>To be the most trusted healthcare provider, setting global standards for medical excellence and patient satisfaction.</p>
                </div>
            </section>


            {/* Core Values */}
            <section className="core-values">
                <h2>Our Core Values</h2>
                <ul>
                    <li>🛡️ <strong>Reliability</strong> - Consistent, dependable healthcare</li>
                    <li>🤝 <strong>Responsibility</strong> - Commitment to patient well-being</li>
                    <li>🤲 <strong>Respect</strong> - Compassionate and ethical care</li>
                    <li>⚖️ <strong>Reasonable</strong> - Affordable and accessible treatment</li>
                </ul>
            </section>

            {/* Call to Action */}
            <section className="cta-section">
                <h2>Experience Exceptional Healthcare</h2>
                <p>Book an appointment today and receive the best medical care from our specialists.</p>
                <button className="cta-button" onClick={() => navigate("/booking")}>Book Appointment</button>
            </section>
        </div>
    );
};

export default AboutUs;
