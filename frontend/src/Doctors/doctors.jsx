import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import "./doctors.css";
import "../index.css";
import LogoImage from "../assets/logo.png";

import doctor1 from "../assets/doc12.jpeg";
import doctor2 from "../assets/doc16.jpeg";
import doctor3 from "../assets/doc17.jpeg";
import doctor4 from "../assets/doc19.jpeg";
import doctor5 from "../assets/doc8.jpg";

const allDoctors = [
  {
    id: 1,
    name: "Dr. John",
    specialization: "Cardiologist",
    department: "Cardiology",
    image: doctor1,
    link: "/doctors/dr-john",
  },
  {
    id: 2,
    name: "Dr. Meera Shah",
    specialization: "Neurologist",
    department: "Neurology",
    image: doctor2,
  },
  {
    id: 3,
    name: "Dr. Neha Verma",
    specialization: "Pediatrics",
    department: "Pediatrics",
    image: doctor3,
  },
  {
    id: 4,
    name: "Dr. Prakash Menon",
    specialization: "Dermatologist",
    department: "Dermatology",
    image: doctor4,
  },
  {
    id: 5,
    name: "Dr. Sanjana Rao",
    specialization: "General Physician",
    department: "General Health",
    image: doctor5,
  },
  {
    id: 6,
    name: "Dr. Asha Reddy",
    specialization: "Cardiologist",
    department: "Cardiology",
    image: doctor2,
  },
  {
    id: 7,
    name: "Dr. Karan Bhatia",
    specialization: "Cardiologist",
    department: "Cardiology",
    image: doctor3,
  },
  {
    id: 8,
    name: "Dr. Priya Nair",
    specialization: "Cardiologist",
    department: "Cardiology",
    image: doctor4,
  },
  {
    id: 9,
    name: "Dr. Arvind Rao",
    specialization: "Neurologist",
    department: "Neurology",
    image: doctor3,
  },
  {
    id: 10,
    name: "Dr. Sneha Pillai",
    specialization: "Neurologist",
    department: "Neurology",
    image: doctor1,
  },
  {
    id: 11,
    name: "Dr. Nilesh Kumar",
    specialization: "Neurologist",
    department: "Neurology",
    image: doctor4,
  },
  {
    id: 12,
    name: "Dr. Ramesh Iyer",
    specialization: "Pediatrics",
    department: "Pediatrics",
    image: doctor1,
  },
  {
    id: 13,
    name: "Dr. Kavya Sinha",
    specialization: "Pediatrics",
    department: "Pediatrics",
    image: doctor2,
  },
  {
    id: 14,
    name: "Dr. Vikram Solanki",
    specialization: "Pediatrics",
    department: "Pediatrics",
    image: doctor4,
  },
  {
    id: 15,
    name: "Dr. Reema Das",
    specialization: "Dermatologist",
    department: "Dermatology",
    image: doctor1,
  },
  {
    id: 16,
    name: "Dr. Anjali Suresh",
    specialization: "Dermatologist",
    department: "Dermatology",
    image: doctor2,
  },
  {
    id: 17,
    name: "Dr. Vinod Krishnan",
    specialization: "Dermatologist",
    department: "Dermatology",
    image: doctor3,
  },
  {
    id: 18,
    name: "Dr. Rohit Sharma",
    specialization: "General Physician",
    department: "General Health",
    image: doctor5,
  },
  {
    id: 19,
    name: "Dr. Tanya Joseph",
    specialization: "General Physician",
    department: "General Health",
    image: doctor5,
  },
  {
    id: 20,
    name: "Dr. Arjun Kapoor",
    specialization: "General Physician",
    department: "General Health",
    image: doctor5,
  },
];

const Doctors = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDoctors = allDoctors.filter((doctor) =>
    doctor.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const departments = [...new Set(allDoctors.map((doc) => doc.department))];

  return (
    <div className="homepage-container">
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <img src={LogoImage} alt="Logo" className="logo" />
          <h1>Sneharika Hospital</h1>
          <p>"Expertise You Can Trust"</p>
        </div>
        <div className="contact-info">
          <p>+91 422 350 0000 | +91 422 450 0000</p>
          <p>+91 7970 108 108</p>
          <p>No. 395, Myleripalayam, Otthakkalmandapam, Coimbatore - 641032, Tamil Nadu, India.</p>
        </div>
      </header>

      {/* Navbar */}
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
        <h2>Meet Our Expert Doctors</h2>

        {/* Search Input */}
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by Department (e.g., Cardiology)"
            className="doctor-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Search Results */}
        {searchTerm && (
          <div className="department">
            <h2>Search Results</h2>
            <div className="doctors-container">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="doctor-card"
                    onClick={() => doc.link && navigate(doc.link)}
                  >
                    <img src={doc.image} alt={doc.name} />
                    <h3>{doc.name}</h3>
                    <p>{doc.specialization}</p>
                    <p><strong>{doc.department}</strong></p>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: "center", width: "100%" }}>
                  No doctors found in this department.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Department-wise Static Display */}
        {!searchTerm &&
          departments.map((dept) => {
            const doctorsInDept = allDoctors.filter(
              (doc) => doc.department === dept
            );
            return (
              <div key={dept} className="department">
                <h2>{dept}</h2>
                <div className="doctors-container">
                  {doctorsInDept.map((doc) => (
                    <div
                      key={doc.id}
                      className="doctor-card"
                      onClick={() => doc.link && navigate(doc.link)}
                    >
                      <img src={doc.image} alt={doc.name} />
                      <h3>{doc.name}</h3>
                      <p>{doc.specialization}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </section>
    </div>
  );
};

export default Doctors;
