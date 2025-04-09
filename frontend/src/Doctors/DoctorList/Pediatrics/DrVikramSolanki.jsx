import React from "react";
import { useNavigate } from "react-router-dom";
import "../DoctorList.css";
import doctor12 from "../../../assets/doc10.jpeg"; // Replace this with the correct image if needed

const DrVikramSolanki = () => {
  const navigate = useNavigate();

  return (
    <div className="doctor-profile-container">
      {/* Header Section */}
      <div className="doctor-header">
        <h2>Doctor</h2>
        <p>
          <span className="highlight">Dr. VIKRAM SOLANKI</span>
        </p>
      </div>

      {/* Doctor Info Section */}
      <div className="doctor-info">
        {/* Left - Image & Button */}
        <div className="doctor-left">
          <img src={doctor12} alt="Dr. Vikram Solanki" className="doctor-image" />
          <h3>Dr. VIKRAM SOLANKI</h3>
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
                <td>MBBS, MD (Pediatrics)</td>
              </tr>
              <tr>
                <td className="label">Experience</td>
                <td>10 Years</td>
              </tr>
              <tr>
                <td className="label">Designation</td>
                <td>Senior Orthopedic Surgeon</td>
              </tr>
              <tr>
                <td className="label">Availability</td>
                <td>MON – FRI (11:00 AM – 4:00 PM)</td>
              </tr>
              <tr className="bio-row">
                <td colSpan="2">
                  <p>
                    Dr. Vikram Solanki is an accomplished orthopedic surgeon with a decade of experience treating complex bone and joint disorders. He completed his MBBS from AIIMS Delhi and earned his MS in Orthopedics from PGIMER, Chandigarh.
                  </p>
                  <p>
                    At Sneharika Hospital, Dr. Solanki is known for his expertise in joint replacements, sports injuries, and fracture management. His surgical precision and patient-friendly approach make him a favorite among patients.
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

export default DrVikramSolanki;
