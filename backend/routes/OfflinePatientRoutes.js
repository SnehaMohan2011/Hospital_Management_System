const express = require('express');
const router = express.Router();
const {
  addOfflinePatient,
  getTodayOfflinePatients,
  getAllOfflinePatients
} = require('../Controller/OfflinePatientController');

// Route to add a new offline patient
router.post('/add', addOfflinePatient);

// Route to get all offline patients
router.get('/all', getAllOfflinePatients);

// Route to get total offline patients for today
router.get('/today', getTodayOfflinePatients);

module.exports = router;
