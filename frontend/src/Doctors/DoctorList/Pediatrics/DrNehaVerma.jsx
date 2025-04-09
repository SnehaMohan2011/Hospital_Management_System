import React from "react";
import { useNavigate } from "react-router-dom";
import "../DoctorList.css";
import doctor2 from "../../../assets/doc8.jpg"; // Replace with an image relevant to Dr. Neha Verma if needed

const DrNehaVerma = () => {
  const navigate = useNavigate();

  return (
    <div className="doctor-profile-container">
      {/* Header Section */}
      <div className="doctor-header">
        <h2>Doctor</h2>
        <p>
          <span className="highlight">Dr. NEHA VERMA</span>
        </p>
      </div>

      {/* Doctor Info Section */}
      <div className="doctor-info">
        {/* Left - Image & Button */}
        <div className="doctor-left">
          <img src={doctor2} alt="Dr. Neha Verma" className="doctor-image" />
          <h3>Dr. NEHA VERMA</h3>
          <p>PEDIATRICIAN</p>
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
                <td>MBBS, DCH (Diploma in Child Health)</td>
              </tr>
              <tr>
                <td className="label">Experience</td>
                <td>3 Years</td>
              </tr>
              <tr>
                <td className="label">Designation</td>
                <td>Consultant Pediatrician, Pediatrics Department</td>
              </tr>
              <tr>
                <td className="label">Availability</td>
                <td>MON – SAT (09:00 AM – 1:00 PM)</td>
              </tr>
              <tr className="bio-row">
                <td colSpan="2">
                  <p>
                    Dr. Neha Verma earned her MBBS and DCH from <strong>St. John’s Medical College, Bengaluru</strong>. She has a strong passion for ensuring children’s health through early intervention and preventive care.
                  </p>
                  <p>
                    As a consultant pediatrician at Sneharika Hospital, she is committed to offering compassionate care, focusing on both physical and emotional development of young patients.
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

export default DrNehaVerma;
