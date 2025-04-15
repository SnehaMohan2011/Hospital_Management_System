
const Appointment = require('../models/AppointmentModel');
const mongoose = require('mongoose');

const bookAppointment = async (req, res) => {
  const { name, email, phone, age, gender, date, time, department, doctor } = req.body;

  try {
   
    const existingAppointments = await Appointment.find({ doctor, date });

    if (existingAppointments.length >= 4) {
      return res.status(400).json({ message: 'Doctor has reached the maximum number of appointments for this day.' });
    }

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
