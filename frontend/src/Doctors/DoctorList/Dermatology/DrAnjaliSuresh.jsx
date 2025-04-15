import React from "react";
import { useNavigate } from "react-router-dom";
import "../DoctorList.css";
import doctor15 from "../../../assets/doc4.jpg"; 

const DrAnjaliSuresh = () => {
  const navigate = useNavigate();

  return (
    <div className="doctor-profile-container">
      {/* Header Section */}
      <div className="doctor-header">
        <h2>Doctor</h2>
        <p>
          <span className="highlight">Dr. ANJALI SURESH</span>
        </p>
      </div>

      {/* Doctor Info Section */}
      <div className="doctor-info">
        {/* Left - Image & Button */}
        <div className="doctor-left">
          <img src={doctor15} alt="Dr. Anjali Suresh" className="doctor-image" />
          <h3>Dr. ANJALI SURESH</h3>
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
                <td>MD (Dermatology), DVL</td>
              </tr>
              <tr>
                <td className="label">Experience</td>
                <td>4 Years</td>
              </tr>
              <tr>
                <td className="label">Availability</td>
                <td>MON – FRI (10:00 AM – 2:00 PM)</td>
              </tr>
              <tr className="bio-row">
                <td colSpan="2">
                  <p>
                    Dr. Anjali Suresh completed her MD in Dermatology from <strong>Kasturba Medical College, Manipal</strong>, and has been devoted to treating various skin, hair, and nail disorders.
                  </p>
                  <p>
                    With a deep commitment to cosmetic and medical dermatology, she is currently serving as a Consultant Dermatologist at Sneharika Hospital. She is known for her empathetic approach and strives to boost her patients’ confidence through personalized skincare treatments.
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

export default DrAnjaliSuresh;
