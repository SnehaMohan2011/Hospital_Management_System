import React from "react";
import { useNavigate } from "react-router-dom";
import "../DoctorList.css";
import doctor10 from "../../../assets/doc6.jpg"; // Replace with an appropriate image for Dr. Ramesh Iyer

const DrRameshIyer = () => {
  const navigate = useNavigate();

  return (
    <div className="doctor-profile-container">
      {/* Header Section */}
      <div className="doctor-header">
        <h2>Doctor</h2>
        <p>
          <span className="highlight">Dr. RAMESH IYER</span>
        </p>
      </div>

      {/* Doctor Info Section */}
      <div className="doctor-info">
        {/* Left - Image & Button */}
        <div className="doctor-left">
          <img src={doctor10} alt="Dr. Ramesh Iyer" className="doctor-image" />
          <h3>Dr. RAMESH IYER</h3>
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
                <td>20 Years</td>
              </tr>
              <tr>
                <td className="label">Availability</td>
                <td>MON – SAT (09:30 AM – 12:30 PM)</td>
              </tr>
              <tr className="bio-row">
                <td colSpan="2">
                  <p>
                    Dr. Ramesh Iyer is a highly experienced pediatrician with two decades of expertise in child health care. He completed his MBBS from Madras Medical College and pursued his MD in Pediatrics from Grant Medical College, Mumbai.
                  </p>
                  <p>
                    He specializes in the diagnosis and treatment of childhood illnesses, vaccinations, growth monitoring, and nutritional counseling. Known for his warm approach and deep understanding of children's health, Dr. Iyer is currently serving as a Senior Pediatric Consultant at Sneharika Hospital.
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

export default DrRameshIyer;
