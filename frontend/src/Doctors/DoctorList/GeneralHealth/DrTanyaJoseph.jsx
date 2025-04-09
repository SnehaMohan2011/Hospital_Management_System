import React from "react";
import { useNavigate } from "react-router-dom";
import "../DoctorList.css";
import doctor19 from "../../../assets/doc20.jpg"; // Replace with an appropriate image for Dr. Tanya Joseph

const DrTanyaJoseph = () => {
  const navigate = useNavigate();

  return (
    <div className="doctor-profile-container">
      {/* Header Section */}
      <div className="doctor-header">
        <h2>Doctor</h2>
        <p>
          <span className="highlight">Dr. TANYA JOSEPH</span>
        </p>
      </div>

      {/* Doctor Info Section */}
      <div className="doctor-info">
        {/* Left - Image & Button */}
        <div className="doctor-left">
          <img src={doctor19} alt="Dr. Tanya Joseph" className="doctor-image" />
          <h3>Dr. TANYA JOSEPH</h3>
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
                <td>MBBS, MD (General Medicine)</td>
              </tr>
              <tr>
                <td className="label">Experience</td>
                <td>9 Years</td>
              </tr>
              <tr>
                <td className="label">Availability</td>
                <td>MON – SAT (09:00 AM – 1:00 PM)</td>
              </tr>
              <tr className="bio-row">
                <td colSpan="2">
                  <p>
                    Dr. Tanya Joseph is a compassionate and highly respected general physician with 9 years of dedicated service in internal and general medicine. She completed her MBBS from <strong>Christian Medical College, Vellore</strong> and pursued her MD from <strong>All India Institute of Medical Sciences (AIIMS), New Delhi</strong>.
                  </p>
                  <p>
                    Renowned for her attentive care, sharp diagnosis, and warm demeanor, Dr. Joseph has positively impacted the lives of countless patients. Her approach to healthcare emphasizes early detection, personalized treatment, and building long-term patient trust.
                  </p>
                  <p>
                    Whether it’s managing lifestyle diseases or providing preventive care, Dr. Tanya Joseph stands out as a true professional who brings both expertise and empathy to the field of general medicine.
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

export default DrTanyaJoseph;
