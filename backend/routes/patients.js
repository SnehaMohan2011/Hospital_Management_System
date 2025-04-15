const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient'); 


router.post('/add-offline-patient', async (req, res) => {
  const { name, email, phone, gender, age, doctorId, notes } = req.body;
  try {
    const newPatient = new Patient({
      name,
      email,
      phone,
      gender,
      age,
      doctorId,
      source: 'offline', 
      status: 'pending', 
      notes,
    });
    await newPatient.save();
    res.status(201).json({
      message: 'Offline patient added successfully',
      patient: newPatient,
    });
  } catch (error) {
    console.error('Error adding offline patient:', error);
    res.status(500).json({ message: 'Failed to add offline patient' });
  }
});


router.put('/patients/:id', async (req, res) => {
  const { id } = req.params;
  const { name, age, gender, phone, address, visitDate, doctorId, notes, status, source } = req.body;

  try {
   
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
        status: status || 'pending', 
        source: source || 'offline',  
      },
      { new: true } // Return the updated patient
    );

    if (!updatedPatient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json(updatedPatient);
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ message: 'Failed to update patient' });
  }
});

router.get('/patients/all', async (req, res) => {
    try {
      const patients = await Patient.find(); 
      res.status(200).json(patients); 
    } catch (error) {
      console.error('Error fetching patients:', error);
      res.status(500).json({ message: 'Failed to fetch patients' });
    }
  });

module.exports = router;
