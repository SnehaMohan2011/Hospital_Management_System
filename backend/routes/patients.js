const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient'); // Assuming this is the correct path to your Patient model

// Route to manually add offline patient
router.post('/add-offline-patient', async (req, res) => {
  const { name, email, phone, gender, age, doctorId, notes } = req.body;

  try {
    // Create a new patient instance with 'offline' source and 'pending' status
    const newPatient = new Patient({
      name,
      email,
      phone,
      gender,
      age,
      doctorId,
      source: 'offline', // Indicating the patient came through the offline method
      status: 'pending', // Default status for offline patient
      notes,
    });

    // Save the new patient to the database
    await newPatient.save();

    // Respond with the new patient data
    res.status(201).json({
      message: 'Offline patient added successfully',
      patient: newPatient,
    });
  } catch (error) {
    console.error('Error adding offline patient:', error);
    res.status(500).json({ message: 'Failed to add offline patient' });
  }
});

// Route to update patient details (including offline patient)
router.put('/patients/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, gender, phone, address, visitDate, doctorId, notes, status, source } = req.body;

  try {
    // Find the patient by ID and update their details
    const updatedPatient = await Patient.findByIdAndUpdate(
      id,
      {
        name,
        age,
        gender,
        phone,
        address,
        visitDate,
        doctorId,
        notes,
        status: status || 'pending', // Default to 'pending' if no status is provided
        source: source || 'offline',  // Default to 'offline' if no source is provided
      },
      { new: true } // Return the updated patient
    );

    // If the patient is not found, return a 404 error
    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Respond with the updated patient data
    res.status(200).json(updatedPatient);
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ message: 'Failed to update patient' });
  }
});

// Route to get all patients
router.get('/patients/all', async (req, res) => {
    try {
      const patients = await Patient.find(); // Fetch all patients
      res.status(200).json(patients); // Send the list of patients as JSON response
    } catch (error) {
      console.error('Error fetching patients:', error);
      res.status(500).json({ message: 'Failed to fetch patients' });
    }
  });

module.exports = router;
