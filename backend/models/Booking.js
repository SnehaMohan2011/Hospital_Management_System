// controllers/booking.js
const Appointment = require('../models/AppointmentModel');
const mongoose = require('mongoose');

// Function to book an appointment
const bookAppointment = async (req, res) => {
  const { name, email, phone, age, gender, date, time, department, doctor } = req.body;

  try {
    // Check if the doctor already has 4 appointments for the chosen date
    const existingAppointments = await Appointment.find({ doctor, date });

    if (existingAppointments.length >= 4) {
      return res.status(400).json({ message: 'Doctor has reached the maximum number of appointments for this day.' });
    }

    // Create a new appointment
    const newAppointment = new Appointment({
      name,
      email,
      phone,
      age,
      gender,
      date,
      time,
      department,
      doctor,
    });

    await newAppointment.save();

    return res.status(201).json({ message: 'Appointment booked successfully!', appointment: newAppointment });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Function to get all appointments for a specific doctor on a particular date
const getAppointmentsByDoctor = async (req, res) => {
  const { doctor, date } = req.params;

  try {
    const appointments = await Appointment.find({ doctor, date });
    return res.status(200).json(appointments);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  bookAppointment,
  getAppointmentsByDoctor,
};
