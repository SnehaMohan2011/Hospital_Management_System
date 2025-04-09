import React from "react";
import { useNavigate } from "react-router-dom";
import "../DoctorList.css";
import doctor2 from "../../../assets/doc7.jpeg"; // Make sure this image fits Dr. Sneha Pillai's profile

const DrSnehaPillai = () => {
  const navigate = useNavigate();

  return (
    <div className="doctor-profile-container">
      {/* Header Section */}
      <div className="doctor-header">
        <h2>Doctor</h2>
        <p>
          <span className="highlight">Dr. SNEHA PILLAI</span>
        </p>
      </div>

      {/* Doctor Info Section */}
      <div className="doctor-info">
        {/* Left - Image & Button */}
        <div className="doctor-left">
          <img src={doctor2} alt="Dr. Sneha Pillai" className="doctor-image" />
          <h3>Dr. SNEHA PILLAI</h3>
          <p>JUNIOR NEUROLOGIST</p>
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
                <td>MD (Neurology),Master of Surgery(MS)</td>
              </tr>
              <tr>
                <td className="label">Experience</td>
                <td>2 Years</td>
              </tr>
              <tr>
                <td className="label">Designation</td>
                <td>Junior Neurologist, Neurology Department</td>
              </tr>
              <tr>
                <td className="label">Availability</td>
                <td>MON – SAT (03:00 PM – 7:00 PM)</td>
              </tr>
              <tr className="bio-row">
                <td colSpan="2">
                  <p>
                    Dr. Sneha Pillai completed her MD in Neurology from **Bharati Institute of Medical Sciences, Pune**. She is passionate about the early diagnosis and treatment of neurological disorders and emphasizes holistic patient care.
                  </p>
                  <p>
                    As a junior neurologist under the Neurology Department at Sneharika Hospital, she is known for her patient-centric approach and continual pursuit of medical excellence.
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

export default DrSnehaPillai;
