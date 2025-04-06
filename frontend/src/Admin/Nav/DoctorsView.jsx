import React from "react";


const DoctorsView = () => {
  const doctors = [
    { name: "Dr. Anjali Mehta", department: "Cardiology", experience: "10 years" },
    { name: "Dr. Rajesh Kumar", department: "Orthopedics", experience: "8 years" },
    { name: "Dr. Priya Sharma", department: "Neurology", experience: "12 years" },
  ];

  return (
    <div className="view-container">
      <h2>Our Doctors</h2>
      <table className="view-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Department</th>
            <th>Experience</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc, index) => (
            <tr key={index}>
              <td>{doc.name}</td>
              <td>{doc.department}</td>
              <td>{doc.experience}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorsView;
