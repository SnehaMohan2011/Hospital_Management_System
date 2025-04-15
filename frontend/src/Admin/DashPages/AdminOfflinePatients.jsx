import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Add useParams for accessing the patient ID
import axios from 'axios';
import './OfflinePatients.css';

const AdminOfflinePatients = () => {
  const navigate = useNavigate();
  const { patientId } = useParams(); // For editing specific patient (if ID exists)

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    visitDate: new Date().toISOString().split('T')[0],
    doctorId: '',
    notes: '',
  });

  const fetchDoctors = async () => {
    try {
      const res = await axios.get('http://localhost:5001/doctors');  // Assuming this API exists
      setDoctors(res.data);
    } catch (err) {
      console.error('Error fetching doctors:', err);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await axios.get('http://localhost:5001/patients/all');
      setPatients(res.data);
    } catch (err) {
      console.error('Error fetching patients:', err);
    }
  };

  const fetchPatientToEdit = async () => {
    if (patientId) {
      try {
        const res = await axios.get(`http://localhost:5001/patients/${patientId}`);
        setFormData({
          ...res.data,
          visitDate: res.data.visitDate.split('T')[0],  // Ensure visitDate is formatted correctly
        });
      } catch (err) {
        console.error('Error fetching patient details:', err);
      }
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
    fetchPatientToEdit();  // Fetch patient data if in "edit mode"
  }, [patientId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = patientId
      ? `http://localhost:5001/patients/${patientId}` // URL for updating existing patient
      : 'http://localhost:5001/offline-patients/add'; // URL for adding new patient

    const method = patientId ? 'put' : 'post'; // Use PUT for updating, POST for adding

    try {
      const response = await axios[method](url, formData);
      if (response.status === 201 || response.status === 200) {
        fetchPatients(); // Re-fetch patients after update/add
        setFormData({
          name: '',
          age: '',
          gender: '',
          phone: '',
          address: '',
          visitDate: new Date().toISOString().split('T')[0],
          doctorId: '',
          notes: '',
        });
        alert(patientId ? 'Patient updated successfully' : 'Patient added successfully');
        navigate('/admin/offline-records'); // Redirect after success
      } else {
        console.error('Error saving patient data');
      }
    } catch (err) {
      console.error('Error handling patient data:', err);
    }
  };

  return (
    <div className="offline-patient-container">
      <h2 className="page-title">{patientId ? '✏️ Edit Patient' : '📝 Add Offline Patient'}</h2>

      <form className="offline-patient-form" onSubmit={handleSubmit}>
        <label className="form-label">Patient Name:</label>
        <input
          className="form-input"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className="form-label">Age:</label>
        <input
          className="form-input"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label className="form-label">Gender:</label>
        <select
          className="form-input"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label className="form-label">Phone Number:</label>
        <input
          className="form-input"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label className="form-label">Address:</label>
        <input
          className="form-input"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label className="form-label">Visit Date:</label>
        <input
          className="form-input"
          type="date"
          name="visitDate"
          value={formData.visitDate}
          onChange={handleChange}
          required
        />

        <label className="form-label">Doctor:</label>
        <select
          className="form-input"
          name="doctorId"
          value={formData.doctorId}
          onChange={handleChange}
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map(doctor => (
            <option key={doctor._id} value={doctor._id}>
              {doctor.name} ({doctor.department})
            </option>
          ))}
        </select>

        <label className="form-label">Notes:</label>
        <textarea
          className="form-input"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="4"
          placeholder="Add patient notes here..."
        ></textarea>

        <button className="submit-btn" type="submit">
          {patientId ? 'Update Patient' : 'Add Patient'}
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={() => navigate('/admin/offline-records')} className="view-records-btn">
          View Patient Record
        </button>
      </div>
    </div>
  );
};

export default AdminOfflinePatients;
