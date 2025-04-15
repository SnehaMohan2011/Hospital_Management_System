import React from "react";
import { useNavigate } from "react-router-dom";
import "../DoctorList.css";
import doctor3 from "../../../assets/doc17.jpeg"; 

const DrKaranBhatia = () => {
  const navigate = useNavigate();

  return (
    <div className="doctor-profile-container">
      {/* Header Section */}
      <div className="doctor-header">
        <h2>Doctor</h2>
        <p>
          <span className="highlight">Dr. KARAN BHATIA</span>
        </p>
      </div>

      {/* Doctor Info Section */}
      <div className="doctor-info">
        {/* Left - Image & Button */}
        <div className="doctor-left">
          <img src={doctor3} alt="Dr. Karan Bhatia" className="doctor-image" />
          <h3>Dr. KARAN BHATIA</h3>
          <p>CARDIOLOGIST</p>
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
                <td>MD (Cardiology), Fellowship in Interventional Cardiology</td>
              </tr>
              <tr>
                <td className="label">Experience</td>
                <td>10 Years</td>
              </tr>
              <tr>
                <td className="label">Availability</td>
                <td>MON – SAT (09:00 AM – 1:00 PM)</td>
              </tr>
              <tr className="bio-row">
                <td colSpan="2">
                  <p>
                    Dr. Karan Bhatia completed his undergraduate studies at Vardhman Mahavir Medical College (VMMC), New Delhi.
                    He later pursued advanced training in interventional cardiology to deepen his expertise in cardiac procedures.
                  </p>
                  <p>
                    Currently, he is a senior consultant in the Department of Cardiology at Sneharika Hospital,
                    where he is well-regarded for his diagnostic accuracy and patient-first approach.
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

export default DrKaranBhatia;
