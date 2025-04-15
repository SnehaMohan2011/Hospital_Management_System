// routes/stats.js
const express = require('express');
const router = express.Router();
const AppointmentModel = require('../models/AppointmentModel'); 
const Doctor = require('../models/Doctor'); 
const Patient = require('../models/Patient'); 


router.get('/appointments/today', async (req, res) => {
    try {
      const start = new Date();
      start.setHours(0, 0, 0, 0); 
  
      const end = new Date();
      end.setHours(23, 59, 59, 999); 
  
      const count = await AppointmentModel.countDocuments({
        date: { $gte: start, $lte: end },
      });
  
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  


router.get('/appointments/total', async (req, res) => {
  try {
    const count = await AppointmentModel.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/doctors/total', async (req, res) => {
  try {
    const count = await Doctor.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/patients/total', async (req, res) => {
  try {
    const count = await Patient.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




module.exports = router;
