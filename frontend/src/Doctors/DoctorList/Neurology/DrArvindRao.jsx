import React from "react";
import { useNavigate } from "react-router-dom";
import "../DoctorList.css";
import doctor1 from "../../../assets/doc1.jpeg";

const DrArvindRao = () => {
  const navigate = useNavigate();

  return (
    <div className="doctor-profile-container">
      {/* Header Section */}
      <div className="doctor-header">
        <h2>Doctor</h2>
        <p>
          <span className="highlight">Dr. ARVIND RAO</span>
        </p>
      </div>

      {/* Doctor Info Section */}
      <div className="doctor-info">
        {/* Left - Image & Button */}
        <div className="doctor-left">
          <img src={doctor1} alt="Dr. Arvind Rao" className="doctor-image" />
          <h3>Dr. ARVIND RAO</h3>
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
                <td>DM (Neurology), Fellowship in Neurocritical Care</td>
              </tr>
              <tr>
                <td className="label">Experience</td>
                <td>15 Years</td>
              </tr>
              <tr>
                <td className="label">Availability</td>
                <td>MON – SAT (8:00 AM – 1:00 PM)</td>
              </tr>
              <tr className="bio-row">
                <td colSpan="2">
                  <p>
                    Dr. Arvind Rao completed his MBBS from Maulana Azad Medical College, New Delhi, and pursued his DM in Neurology.
                    He further specialized with a fellowship in Neurocritical Care.
                  </p>
                  <p>
                    Currently, he works as a Senior Neurologist at Sneharika Hospital and is actively involved in both clinical and academic research in the field of Neurosciences.
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

export default DrArvindRao;
