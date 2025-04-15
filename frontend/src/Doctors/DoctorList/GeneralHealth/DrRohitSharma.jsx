import React from "react";
import { useNavigate } from "react-router-dom";
import "../DoctorList.css";
import doctor18 from "../../../assets/doc18.jpeg"; 

const DrRohitSharma = () => {
  const navigate = useNavigate();

  return (
    <div className="doctor-profile-container">
      {/* Header Section */}
      <div className="doctor-header">
        <h2>Doctor</h2>
        <p>
          <span className="highlight">Dr. ROHIT SHARMA</span>
        </p>
      </div>

      {/* Doctor Info Section */}
      <div className="doctor-info">
        {/* Left - Image & Button */}
        <div className="doctor-left">
          <img src={doctor18} alt="Dr. Rohit Sharma" className="doctor-image" />
          <h3>Dr. ROHIT SHARMA</h3>
          <p>GENERAL HEALTH</p>
          <button onClick={() => navigate("/booking")} className="appointment-btn">
            BOOK APPOINTMENT
          </button>
        </div>

        {/* Right - Details Table */}
        <div className="doctor-right">
          <table className="details-table">
            <tbody>
              <tr>
                <td className="label">Qualifications</td>
                <td>MBBS, MD (General Medicine)</td>
              </tr>
              <tr>
                <td className="label">Experience</td>
                <td>9 Years</td>
              </tr>
              <tr>
                <td className="label">Availability</td>
                <td>TUE – SUN (11:30 AM – 4:30 PM)</td>
              </tr>
              <tr className="bio-row">
                <td colSpan="2">
                  <p>
                    Dr. Rohit Sharma earned his MBBS from <strong>Government Medical College, Nagpur</strong>, and completed his MD in General Medicine from <strong>Bangalore Medical College and Research Institute</strong>. He is known for his meticulous attention to detail and deep understanding of internal health.
                  </p>
                  <p>
                    He has over 9 years of experience in managing a wide spectrum of general health conditions including hypertension, diabetes, infections, and lifestyle-related disorders. At Sneharika Hospital, Dr. Sharma is recognized not just for his clinical expertise but also for his patient-friendly nature and strong communication skills that make consultations effective and comforting.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DrRohitSharma;
