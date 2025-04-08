import React from "react";
import { useNavigate } from "react-router-dom";
import "../DoctorList.css";
 // Link the CSS file here

const  DrJohn= () => {
  const navigate = useNavigate();

  return (
     

    <div className="doctor-profile-container">
      {/* Header Section */}
      <div className="doctor-header">
        <h2>Doctor</h2>
        <p>
          Home • Doctor • <span className="highlight">Dr. JOHN</span>
        </p>
      </div>

      {/* Doctor Info Section */}
      <div className="doctor-info">
        {/* Left Side - Image and Button */}
        <div className="doctor-left">
          <img
            src="/doctor-image.jpg" // replace with actual image path
            alt="Dr. John"
            className="doctor-image"
          />
          <h3>Dr. JOHN</h3>
          <p>CARDIOLOGIST</p>
          <button
            onClick={() => navigate("/booking")}
            className="appointment-btn"
          >
            BOOK APPOINTMENT
          </button>
        </div>

        {/* Right Side - Details Table */}
        <div className="doctor-right">
          <table className="details-table">
            <tbody>
              <tr>
                <td className="label">Qualifications</td>
                <td>MD (Cardiology)</td>
              </tr>
              <tr>
                <td className="label">Experience</td>
                <td>27 Years</td>
              </tr>
              <tr>
                <td className="label">Availability</td>
                <td>MON – SAT (08:00 AM – 4:00 PM)</td>
              </tr>
              
            
            </tbody>
          </table>
        </div>
      </div>

      {/* Bio Section */}
      <div className="doctor-bio">
        <p>
          Dr. John has completed her undergraduate from P.S.G. Institute of Medical Sciences & Research, Coimbatore...
        </p>
        <p>
          Currently, he heads the department of Cardiology at Sneharika Hospital with team of fourteen Consultants...
        </p>
       
      </div>
    </div>
  
  );
};

export default DrJohn;
