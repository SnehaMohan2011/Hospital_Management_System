import React from "react";
import { useNavigate } from "react-router-dom";
import "../DoctorList.css";
import doctor11 from "../../../assets/doc9.jpeg"; 

const DrKavyaSinha = () => {
  const navigate = useNavigate();

  return (
    <div className="doctor-profile-container">
      <div className="doctor-header">
        <h2>Doctor</h2>
        <p><span className="highlight">Dr. KAVYA SINHA</span></p>
      </div>

      <div className="doctor-info">
        <div className="doctor-left">
          <img src={doctor11} alt="Dr. Kavya Sinha" className="doctor-image" />
          <h3>Dr. KAVYA SINHA</h3>
          <p>PEDIATRICIAN</p>
          <button onClick={() => navigate("/booking")} className="appointment-btn">
            BOOK APPOINTMENT
          </button>
        </div>

        <div className="doctor-right">
          <table className="details-table">
            <tbody>
              <tr>
                <td className="label">Qualifications</td>
                <td>MBBS, MD (Pediatrics)</td>
              </tr>
              <tr>
                <td className="label">Experience</td>
                <td>5 Years</td>
              </tr>
              <tr>
                <td className="label">Availability</td>
                <td>MON – SAT (10:00 AM – 02:30 PM)</td>
              </tr>
              <tr className="bio-row">
                <td colSpan="2">
                  <p>
                    Dr. Kavya Sinha completed her MBBS from Kaleel Medical College, Manipal and MD in Pediatrics from AIIMS Delhi.
                    She is passionate about child nutrition, preventive care, and holistic wellness.
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

// ✅ THIS LINE FIXES YOUR ERROR
export default DrKavyaSinha;
