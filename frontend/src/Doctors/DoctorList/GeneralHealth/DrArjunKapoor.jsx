import React from "react";
import { useNavigate } from "react-router-dom";
import "../DoctorList.css";
import doctor20 from "../../../assets/doc24.jpeg"; // Replace with an appropriate image for Dr. Arjun Kapoor

const DrArjunKapoor = () => {
  const navigate = useNavigate();

  return (
    <div className="doctor-profile-container">
      {/* Header Section */}
      <div className="doctor-header">
        <h2>Doctor</h2>
        <p>
          <span className="highlight">Dr. ARJUN KAPOOR</span>
        </p>
      </div>

      {/* Doctor Info Section */}
      <div className="doctor-info">
        {/* Left - Image & Button */}
        <div className="doctor-left">
          <img src={doctor20} alt="Dr. Arjun Kapoor" className="doctor-image" />
          <h3>Dr. ARJUN KAPOOR</h3>
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
                <td>11 Years</td>
              </tr>
              <tr>
                <td className="label">Availability</td>
                <td>MON – SAT (9:30 AM – 12:30 PM)</td>
              </tr>
              <tr className="bio-row">
                <td colSpan="2">
                  <p>
                    Dr. Arjun Kapoor is a compassionate and skilled physician specializing in general health and internal medicine. He completed his MBBS from <strong>SRM Medical College, Chennai</strong> and his MD in Internal Medicine from <strong>JSS Medical College, Mysuru</strong>.
                  </p>
                  <p>
                    With over a decade of experience, Dr. Kapoor excels in managing chronic illnesses, lifestyle diseases, and general wellness. His patient-first approach, accurate diagnostics, and preventive care advice have earned him immense respect in the community. Currently, he is a Senior General Physician at Sneharika Hospital.
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

export default DrArjunKapoor;
