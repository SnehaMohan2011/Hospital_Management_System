import React from "react";
import { useNavigate } from "react-router-dom";
import "../DoctorList.css";
import doctor13 from "../../../assets/doc11.jpeg"; // Update with the correct image path for Dr. Prakash Menon

const DrPrakashMenon = () => {
  const navigate = useNavigate();

  return (
    <div className="doctor-profile-container">
      {/* Header Section */}
      <div className="doctor-header">
        <h2>Doctor</h2>
        <p>
          <span className="highlight">Dr. PRAKASH MENON</span>
        </p>
      </div>

      {/* Doctor Info Section */}
      <div className="doctor-info">
        {/* Left - Image & Button */}
        <div className="doctor-left">
          <img src={doctor13} alt="Dr. Prakash Menon" className="doctor-image" />
          <h3>Dr. PRAKASH MENON</h3>
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
                <td>MD (Dermatology), Fellowship in Clinical Cosmetology</td>
              </tr>
              <tr>
                <td className="label">Experience</td>
                <td>7 Years</td>
              </tr>
              <tr>
                <td className="label">Availability</td>
                <td>TUE – SAT (11:00 AM – 5:00 PM)</td>
              </tr>
              <tr className="bio-row">
                <td colSpan="2">
                  <p>
                    Dr. Prakash Menon completed his medical education at <strong>Grant Medical College, Mumbai</strong>. He has extensive experience in dermatological procedures and clinical cosmetology.
                  </p>
                  <p>
                    Passionate about skincare and wellness, he currently works as a Consultant Dermatologist at Sneharika Hospital, offering expert diagnosis and tailored treatment plans for a wide range of skin concerns.
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

export default DrPrakashMenon;
