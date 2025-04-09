const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const Booking = require("../models/Booking");

// Get doctors by department and available on a given date
router.get("/available", async (req, res) => {
  const { department, date } = req.query;
  if (!department || !date) {
    return res.status(400).json({ message: "Department and date are required" });
  }

  try {
    // Find all doctors in the department
    const allDoctors = await Doctor.find({ department });

    // Get bookings for that date
    const bookedDoctors = await Booking.find({ date }).distinct("doctorId");

    // Filter only unbooked doctors
    const availableDoctors = allDoctors.filter(doc =>
      !bookedDoctors.includes(doc._id.toString())
    );

    res.status(200).json(availableDoctors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching available doctors", error: error.message });
  }
});

// routes/doctorRoutes.js
router.post("/add-many", async (req, res) => {
    try {
      const doctors = req.body.doctors;
  
      if (!Array.isArray(doctors)) {
        return res.status(400).json({ message: "Doctors must be an array" });
      }
  
      await Doctor.insertMany(doctors);
      res.status(201).json({ message: "Doctors added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to add doctors", error: error.message });
    }
  });
  



module.exports = router;
