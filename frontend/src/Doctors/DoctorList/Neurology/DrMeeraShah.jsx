import React from "react";
import { useNavigate } from "react-router-dom";
import "../DoctorList.css";
import doctor2 from "../../../assets/doc5.jpg"; 

const DrMeeraShah = () => {
  const navigate = useNavigate();

  return (
    <div className="doctor-profile-container">
      {/* Header Section */}
      <div className="doctor-header">
        <h2>Doctor</h2>
        <p>
          <span className="highlight">Dr. MEERA SHAH</span>
        </p>
      </div>

      {/* Doctor Info Section */}
      <div className="doctor-info">
        {/* Left - Image & Button */}
        <div className="doctor-left">
          <img src={doctor2} alt="Dr. Meera Shah" className="doctor-image" />
          <h3>Dr. MEERA SHAH</h3>
          <p>NEUROLOGIST</p>
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
                <td>MD (Neurology)</td>
              </tr>
              <tr>
                <td className="label">Experience</td>
                <td>6 Years</td>
              </tr>
              <tr>
                <td className="label">Availability</td>
                <td>MON – SAT (03:00 PM – 7:00 PM)</td>
              </tr>
              <tr className="bio-row">
                <td colSpan="2">
                  <p>
                    Dr. Meera Shah graduated from GGSIPU, Delhi, and has been dedicated to diagnosing and treating a wide range of neurological disorders with precision and empathy.
                  </p>
                  <p>
                    With a focus on improving patient quality of life, she combines the latest advances in neurology with a patient-first approach. She is currently serving as a Consultant Neurologist at Sneharika Hospital.
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

export default DrMeeraShah;
