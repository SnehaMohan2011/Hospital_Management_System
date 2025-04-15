const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");
const Booking = require("../models/Booking");


router.get("/available", async (req, res) => {
  const { department, date } = req.query;

  if (!department || !date) {
    return res.status(400).json({ message: "Department and date are required" });
  }
  try {
    const allDoctors = await Doctor.find({ department });
    const bookedDoctors = await Booking.find({ date }).distinct("doctorId");
    const availableDoctors = allDoctors.filter(doc =>
      !bookedDoctors.includes(doc._id.toString())
    );

    res.status(200).json(availableDoctors); 
  } catch (error) {
    res.status(500).json({ message: "Error fetching available doctors", error: error.message });
  }
});

router.post("/add-many", async (req, res) => {
  try {
    const doctors = req.body.doctors;

    if (!Array.isArray(doctors)) {
      return res.status(400).json({ message: "Doctors must be an array" });
    }

    for (const doc of doctors) {
      if (!doc.name || !doc.email || !doc.department || !doc.qualification) {
        return res.status(400).json({ message: "Each doctor must have name, email, department, and qualification" });
      }
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


router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors); 
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctors", error: error.message });
  }
});

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
