// routes/stats.js
const express = require('express');
const router = express.Router();
const AppointmentModel = require('../models/AppointmentModel'); // Adjust path if necessary
const Doctor = require('../models/Doctor'); // Adjust path if necessary
const Patient = require('../models/Patient'); // Adjust path if necessary

// Get appointments for today
router.get('/appointments/today', async (req, res) => {
    try {
      const start = new Date();
      start.setHours(0, 0, 0, 0); // Start of today
  
      const end = new Date();
      end.setHours(23, 59, 59, 999); // End of today
  
      const count = await AppointmentModel.countDocuments({
        date: { $gte: start, $lte: end },
      });
  
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Get total appointments
router.get('/appointments/total', async (req, res) => {
  try {
    const count = await AppointmentModel.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get total doctors
router.get('/doctors/total', async (req, res) => {
  try {
    const count = await Doctor.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get total patients
router.get('/patients/total', async (req, res) => {
  try {
    const count = await Patient.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get appointment stats for the last 7 days
router.get('/appointments/stats', async (req, res) => {
  try {
    const last7Days = [];
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      last7Days.push(date.toISOString().split('T')[0]);
    }

    const stats = await Promise.all(
      last7Days.map(async (date) => {
        const appointmentsCount = await AppointmentModel.countDocuments({ date });
        return { date, appointments: appointmentsCount };
      })
    );
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
