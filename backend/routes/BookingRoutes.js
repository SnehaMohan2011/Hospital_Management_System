// routers/bookingRoutes.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/AppointmentModel'); 
const { handleBooking } = require('../Controller/bookingController'); 


router.post("/book", async (req, res) => {
  const { name, email, phone, department, doctor, date, time } = req.body;

  try {
   
    const existingAppointments = await Appointment.find({ doctor, date });

    if (existingAppointments.length >= 4) {
      return res.status(400).json({ message: 'This doctor is fully booked for the selected date.' });
    }

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
