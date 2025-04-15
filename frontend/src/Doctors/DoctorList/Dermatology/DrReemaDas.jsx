import React from "react";
import { useNavigate } from "react-router-dom";
import "../DoctorList.css";
import doctor14 from "../../../assets/doc13.jpeg"; 

const DrReemaDas = () => {
  const navigate = useNavigate();

  return (
    <div className="doctor-profile-container">
      {/* Header Section */}
      <div className="doctor-header">
        <h2>Doctor</h2>
        <p>
          <span className="highlight">Dr. REEMA DAS</span>
        </p>
      </div>

      {/* Doctor Info Section */}
      <div className="doctor-info">
        {/* Left - Image & Button */}
        <div className="doctor-left">
          <img src={doctor14} alt="Dr. Reema Das" className="doctor-image" />
          <h3>Dr. REEMA DAS</h3>
          <p>DERMATOLOGIST</p>
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
                <td>MD (Dermatology), Diploma in Aesthetic Medicine</td>
              </tr>
              <tr>
                <td className="label">Experience</td>
                <td>5 Years</td>
              </tr>
              <tr>
                <td className="label">Availability</td>
                <td>MON – FRI (09:00 AM – 1:00 PM)</td>
              </tr>
              <tr className="bio-row">
                <td colSpan="2">
                  <p>
                    Dr. Reema Das earned her degree from <strong>Lokmanya Tilak Municipal Medical College, Mumbai</strong>, and has a strong interest in both clinical and cosmetic dermatology.
                  </p>
                  <p>
                    She currently practices as a Consultant Dermatologist at Sneharika Hospital, focusing on personalized skincare solutions and delivering high-quality care for patients with various skin, hair, and nail conditions.
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

export default DrReemaDas;
