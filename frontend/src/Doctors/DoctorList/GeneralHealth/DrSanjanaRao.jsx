import React from "react";
import { useNavigate } from "react-router-dom";
import "../DoctorList.css";
import doctor17 from "../../../assets/doc14.jpg"; 

const DrSanjanaRao = () => {
  const navigate = useNavigate();

  return (
    <div className="doctor-profile-container">
      {/* Header Section */}
      <div className="doctor-header">
        <h2>Doctor</h2>
        <p>
          <span className="highlight">Dr. SANJANA RAO</span>
        </p>
      </div>

      {/* Doctor Info Section */}
      <div className="doctor-info">
        {/* Left - Image & Button */}
        <div className="doctor-left">
          <img src={doctor17} alt="Dr. Sanjana Rao" className="doctor-image" />
          <h3>Dr. SANJANA RAO</h3>
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
                <td>MBBS, MD (Internal Medicine)</td>
              </tr>
              <tr>
                <td className="label">Experience</td>
                <td>6 Years</td>
              </tr>
              <tr>
                <td className="label">Availability</td>
                <td>MON – SAT (08:30 AM – 12:00 PM)</td>
              </tr>
              <tr className="bio-row">
                <td colSpan="2">
                  <p>
                    Dr. Sanjana Rao completed her MBBS from <strong>St. John's Medical College, Bengaluru</strong>, and went on to earn her MD in Internal Medicine from <strong>JIPMER, Puducherry</strong>. She has built a reputation for being approachable and thorough in her consultations.
                  </p>
                  <p>
                    With 6 years of hands-on experience in general health and internal medicine, Dr. Rao specializes in diagnosing common illnesses, managing chronic diseases, and promoting preventive healthcare. Her ability to listen carefully and explain conditions in an easy-to-understand manner makes her highly appreciated by her patients.
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

export default DrSanjanaRao;
