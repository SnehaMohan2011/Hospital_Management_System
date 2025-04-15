import React from "react";
import { useNavigate } from "react-router-dom";
import "../DoctorList.css";
import doctor2 from "../../../assets/doc3.jpeg"; 

const DrNileshKumar = () => {
  const navigate = useNavigate();

  return (
    <div className="doctor-profile-container">
      {/* Header Section */}
      <div className="doctor-header">
        <h2>Doctor</h2>
        <p>
          <span className="highlight">Dr. NILESH KUMAR</span>
        </p>
      </div>

      {/* Doctor Info Section */}
      <div className="doctor-info">
        {/* Left - Image & Button */}
        <div className="doctor-left">
          <img src={doctor2} alt="Dr. Nilesh Kumar" className="doctor-image" />
          <h3>Dr. NILESH KUMAR</h3>
          <p>SENIOR NEUROLOGIST</p>
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
                <td>MS, MD (Neurology)</td>
              </tr>
              <tr>
                <td className="label">Experience</td>
                <td>13 Years</td>
              </tr>
              <tr>
                <td className="label">Designation</td>
                <td>Senior Neurologist, Neurology Department</td>
              </tr>
              <tr>
                <td className="label">Availability</td>
                <td>MON – SAT (02:00 PM – 5:00 PM)</td>
              </tr>
              <tr className="bio-row">
                <td colSpan="2">
                  <p>
                    Dr. Nilesh Kumar is an accomplished neurologist with over 13 years of experience. He obtained his MS and MD in Neurology from <strong>Sri Ramachandra Institute of Medical Sciences, Chennai</strong>.
                  </p>
                  <p>
                    Renowned for his clinical expertise and dedication to patient care, he currently serves as a Senior Neurologist at Sneharika Hospital. Dr. Kumar is committed to offering personalized treatment plans and stays updated with the latest advancements in neurological sciences.
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

export default DrNileshKumar;
