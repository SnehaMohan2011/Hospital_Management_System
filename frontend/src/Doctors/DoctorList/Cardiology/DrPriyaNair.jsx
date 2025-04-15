import React from "react";
import { useNavigate } from "react-router-dom";
import "../DoctorList.css";
import doctor4 from "../../../assets/doc2.jpeg"; 

const DrPriyaNair = () => {
  const navigate = useNavigate();

  return (
    <div className="doctor-profile-container">
      {/* Header Section */}
      <div className="doctor-header">
        <h2>Doctor</h2>
        <p>
          <span className="highlight">Dr. PRIYA NAIR</span>
        </p>
      </div>

      {/* Doctor Info Section */}
      <div className="doctor-info">
        {/* Left - Image & Button */}
        <div className="doctor-left">
          <img src={doctor4} alt="Dr. Priya Nair" className="doctor-image" />
          <h3>Dr. PRIYA NAIR</h3>
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
                <td>6 Years</td>
              </tr>
              <tr>
                <td className="label">Availability</td>
                <td>MON – SAT (01:00 PM – 5:00 PM)</td>
              </tr>
              <tr className="bio-row">
                <td colSpan="2">
                  <p>
                    Dr. Priya Nair completed her undergraduate studies from Lady Hardinge Medical College (LHMC), New Delhi.
                    She has always had a deep interest in cardiology and pursued her specialization with great dedication.
                  </p>
                  <p>
                    She currently serves in the Department of Cardiology at Sneharika Hospital, where she’s appreciated for her
                    compassionate patient care and clinical excellence.
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

export default DrPriyaNair;
