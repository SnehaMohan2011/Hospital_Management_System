import React from "react";
import { useNavigate } from "react-router-dom";
import "../DoctorList.css";
import doctor16 from "../../../assets/doc15.jpeg"; // Update with the correct image path for Dr. Vinod Krishnan

const DrVinodKrishnan = () => {
  const navigate = useNavigate();

  return (
    <div className="doctor-profile-container">
      {/* Header Section */}
      <div className="doctor-header">
        <h2>Doctor</h2>
        <p>
          <span className="highlight">Dr. VINOD KRISHNAN</span>
        </p>
      </div>

      {/* Doctor Info Section */}
      <div className="doctor-info">
        {/* Left - Image & Button */}
        <div className="doctor-left">
          <img src={doctor16} alt="Dr. Vinod Krishnan" className="doctor-image" />
          <h3>Dr. VINOD KRISHNAN</h3>
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
                <td>MD (Dermatology), Fellowship in Cosmetic Dermatology</td>
              </tr>
              <tr>
                <td className="label">Experience</td>
                <td>10 Years</td>
              </tr>
              <tr>
                <td className="label">Availability</td>
                <td>TUE – SAT (11:00 AM – 3:00 PM)</td>
              </tr>
              <tr className="bio-row">
                <td colSpan="2">
                  <p>
                    Dr. Vinod Krishnan completed his MD in Dermatology from <strong>Christian Medical College, Vellore</strong>, and holds a Fellowship in Cosmetic Dermatology.
                  </p>
                  <p>
                    Renowned for his clinical precision and patient-first attitude, Dr. Vinod Krishnan has over a decade of experience in diagnosing and treating dermatological concerns. At Sneharika Hospital, he is known not only for his expertise but also for his passion to make every patient feel confident in their skin.
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

export default DrVinodKrishnan;
