
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './OfflinePatients.css';

const OfflinePatientRecords = () => {
  const [offlinePatients, setOfflinePatients] = useState([]);

  useEffect(() => {
    const fetchOfflinePatients = async () => {
      try {
        const res = await axios.get('http://localhost:5001/offline-patients/all');
        setOfflinePatients(res.data);
      } catch (err) {
        console.error('Error fetching offline patients:', err);
      }
    };
    fetchOfflinePatients();
  }, []);

  return (
    <div className="patient-records-section">
      <h2 className="records-title">🩺 Detailed Offline Patient Records</h2>

      {offlinePatients.length === 0 ? (
        <p className="no-records">No records found.</p>
      ) : (
        <div className="records-wrapper">
          {offlinePatients.map((p) => (
            <div key={p._id} className="record-card">
              <p><span className="label">👤 Name:</span> <span className="value">{p.name}</span></p>
              <p><span className="label">📞 Phone:</span> <span className="value">{p.phone}</span></p>
              <p><span className="label">🎂 Age:</span> <span className="value">{p.age}</span></p>
              <p><span className="label">⚧ Gender:</span> <span className="value">{p.gender}</span></p>
              <p><span className="label">🏠 Address:</span> <span className="value">{p.address}</span></p>
              <p><span className="label">📌 Status:</span> <span className="value">{p.source === 'offline' ? 'Offline' : 'Online'}</span></p>
              <p><span className="label">🗓️ Added On:</span> <span className="value">{p.createdAt ? new Date(p.createdAt).toLocaleString() : 'N/A'}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OfflinePatientRecords;
