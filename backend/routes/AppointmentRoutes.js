const express = require('express');
const router = express.Router();
const Appointment = require('../models/AppointmentModel'); // Adjust path as needed

// GET appointments by doctor name
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});

// Get appointments for a specific doctor
router.get('/doctor/:doctorName', async (req, res) => {
  const doctorName = req.params.doctorName;

  try {
    const appointments = await Appointment.find({ doctor: doctorName });
    res.json(appointments);
  } catch (err) {
    console.error('Error fetching appointments for doctor:', err);
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});




router.get('/all', async (req, res) => {
  try {
    const appointments = await Appointment.find(); // fetch all
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching all appointments' });
  }
});


module.exports = router;
