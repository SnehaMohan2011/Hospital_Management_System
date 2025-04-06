// backend/routes/appointmentRoutes.js or wherever your routes are
const express = require("express");
const router = express.Router();
const Appointment = require("../models/AppointmentModel");

// GET all appointments
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
