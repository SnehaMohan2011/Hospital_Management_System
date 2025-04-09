import React from "react";
import { useNavigate } from "react-router-dom";
import "../DoctorList.css";
import doctor2 from "../../../assets/doc16.jpeg"; // Update with the correct image path for Dr. Asha Reddy

const DrAshaReddy = () => {
  const navigate = useNavigate();

  return (
    <div className="doctor-profile-container">
      {/* Header Section */}
      <div className="doctor-header">
        <h2>Doctor</h2>
        <p>
          <span className="highlight">Dr. ASHA REDDY</span>
        </p>
      </div>

      {/* Doctor Info Section */}
      <div className="doctor-info">
        {/* Left - Image & Button */}
        <div className="doctor-left">
          <img src={doctor2} alt="Dr. Asha Reddy" className="doctor-image" />
          <h3>Dr. ASHA REDDY</h3>
          <p>CARDIOLOGIST</p>
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
                <td>MD (Cardiology)</td>
              </tr>
              <tr>
                <td className="label">Experience</td>
                <td>5 Years</td>
              </tr>
              <tr>
                <td className="label">Availability</td>
                <td>MON – SAT (03:00 PM – 7:00 PM)</td>
              </tr>
              <tr className="bio-row">
                <td colSpan="2">
                  <p>
                    Dr. Asha Reddy graduated from Coimbatore Medical College, Coimbatore, and has a strong passion for
                    providing patient-centered cardiac care.
                  </p>
                  <p>
                    Currently, she is working as an Assistant in the Department of Cardiology at Sneharika Hospital,
                    contributing her expertise to the team and patient welfare.
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

export default DrAshaReddy;
