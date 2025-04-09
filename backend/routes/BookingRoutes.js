const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Book a doctor
router.post("/book", async (req, res) => {
  const { doctorId, patientName, date, time } = req.body;

  if (!doctorId || !patientName || !date) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Check if already booked
    const alreadyBooked = await Booking.findOne({ doctorId, date });
    if (alreadyBooked) {
      return res.status(409).json({ message: "Doctor already booked on this date" });
    }

    const newBooking = new Booking({ doctorId, patientName, date, time });
    await newBooking.save();

    res.status(200).json({ message: "Doctor booked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error: error.message });
  }
});

module.exports = router;
