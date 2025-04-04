import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ContactUs.css";
import "../index.css";
import LogoImage from "../assets/logo.png";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const ContactUs = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Your message has been sent successfully!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="homepage-container">
                            {/* Header Section */}
                            <header className="header">
                                <div className="logo-container">
                                    <img src={LogoImage} alt="Sri Ramakrishna Hospital Logo" className="logo" />                     <h1>Sneharika Hospital</h1>
                                    <p>"Expertise You Can Trust"</p>
                                </div>
                
                                <div className="contact-info">
                                    <p> +91 422 350 0000 | +91 422 450 0000 | +91 7970 108 108</p>
                                    <p>  No. 395, Myleripalayam, Otthakkalmandapam, Coimbatore - 641032, Tamil Nadu, India.</p>
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
        <div className="contact-container">
            {/* Contact Information Section */}
            <div className="contact-info-para">
                <h2>Contact Us</h2>
                <p>We are here to help you with any queries or concerns.</p>
                
                <div className="contact-details">
                    <div className="contact-item">
                        <FaMapMarkerAlt className="icon" />
                        <p>No. 395, Myleripalayam, Otthakkalmandapam, Coimbatore - 641032, Tamil Nadu, India.</p>
                    </div>
                    <div className="contact-item">
                        <FaPhoneAlt className="icon" />
                        <p>+91 422 350 0000 | +91 422 450 0000 | +91 7970 108 108</p>
                    </div>
                    <div className="contact-item">
                        <FaEnvelope className="icon" />
                        <p>support@sneharikahospital.com</p>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="social-icons">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form">
                <h2>Get in Touch</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
                    <textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
                    <button type="submit" className="submit-button">Send Message</button>
                </form>
            </div>

            {/* Google Map Section */}
            <div className="map-container">
                <iframe
                    title="Sneharika Hospital Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.8815361258496!2d76.955832!3d11.0114369!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sCoimbatore%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1636043212345"
                    width="100%" height="350" allowFullScreen loading="lazy"
                ></iframe>
            </div>
        </div>
        </div>
    );
};

export default ContactUs;
