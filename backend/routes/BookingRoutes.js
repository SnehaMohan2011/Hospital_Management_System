// routers/bookingRoutes.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/AppointmentModel'); // Reference the Appointment model
const { handleBooking } = require('../Controller/bookingController'); 

// Book an appointment with a 4-person-per-day-per-doctor limit
router.post("/book", async (req, res) => {
  const { name, email, phone, department, doctor, date, time } = req.body;

  try {
    // Count appointments for the same doctor on the same date
    const existingAppointments = await Appointment.find({ doctor, date });

    if (existingAppointments.length >= 4) {
      return res.status(400).json({ message: 'This doctor is fully booked for the selected date.' });
    }

    // Save the new appointment
    const newAppointment = new Appointment({
      name,
      email,
      phone,
      department,
      doctor,
      date,
      time,
    });

    await newAppointment.save();

    res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});


router.post('/',handleBooking);



module.exports = router;
