const OfflinePatient = require('../models/OfflinePatientModel');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');  // Import Doctor model

// Add an offline patient (and also to main Patient collection)
const addOfflinePatient = async (req, res) => {
  try {
    const { name, phone, gender, age, address, visitDate, doctorId, notes } = req.body;

    // Step 1: Fetch doctor details, including department
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    const doctorDepartment = doctor.department;

    // Step 2: Save to OfflinePatient collection
    const newOffline = new OfflinePatient({
      name,
      phone,
      gender,
      age,
      address,
      visitDate,
      doctorId,
      department: doctorDepartment,  // Save department to the offline patient
      notes,
      source: 'offline',
    });
    await newOffline.save();

    // Step 3: Save to main Patient collection
    const newPatient = new Patient({
      name,
      email: `${phone}@offline.local`,
      phone,
      gender,
      age,
      doctorId,
      department: doctorDepartment,  // Save department to patient record as well
      notes,
      source: 'offline',
    });
    await newPatient.save();

    res.status(201).json({ message: "Offline patient added", patient: newOffline });
  } catch (err) {
    res.status(500).json({ message: "Error adding offline patient", error: err.message });
  }
};

// Get total offline patients for today
const getTodayOfflinePatients = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const count = await OfflinePatient.countDocuments({
      createdAt: { $gte: start, $lte: end },
    });

    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: "Error fetching offline patient count", error: err.message });
  }
};

// Get all offline patients
const getAllOfflinePatients = async (req, res) => {
  try {
    const patients = await OfflinePatient.find().sort({ createdAt: -1 });
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ message: "Error fetching offline patients", error: err.message });
  }
};

module.exports = {
  addOfflinePatient,
  getTodayOfflinePatients,
  getAllOfflinePatients
};
