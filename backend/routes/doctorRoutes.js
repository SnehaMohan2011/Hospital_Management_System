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

    res.status(200).json(availableDoctors); // timeSlots will be included
  } catch (error) {
    res.status(500).json({ message: "Error fetching available doctors", error: error.message });
  }
});

// Add multiple doctors with email and timeSlots
router.post("/add-many", async (req, res) => {
  try {
    const doctors = req.body.doctors;

    if (!Array.isArray(doctors)) {
      return res.status(400).json({ message: "Doctors must be an array" });
    }

    // Validate each doctor has required fields
    for (const doc of doctors) {
      if (!doc.name || !doc.email || !doc.department || !doc.qualification) {
        return res.status(400).json({ message: "Each doctor must have name, email, department, and qualification" });
      }

      // Optional: Validate timeSlots if provided
      if (doc.timeSlots && !Array.isArray(doc.timeSlots)) {
        return res.status(400).json({ message: "timeSlots must be an array of strings" });
      }
    }

    const createdDocs = await Doctor.insertMany(doctors);
    res.status(201).json({ message: "Doctors added successfully", doctors: createdDocs });
  } catch (error) {
    res.status(500).json({ message: "Failed to add doctors", error: error.message });
  }
});

// Get all doctors with timeSlots included
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors); // timeSlots included by default
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctors", error: error.message });
  }
});

// Node.js/Express route example
router.put('/appointments/:id/cancel', async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Appointment.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error cancelling appointment' });
  }
});


module.exports = router;
