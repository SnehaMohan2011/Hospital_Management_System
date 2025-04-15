// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/AppointmentModel');
const sendMail = require('../utils/sendMail');

// Get all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});

// Get appointments by doctor
router.get('/doctor/:doctorName', async (req, res) => {
  try {
    const appointments = await Appointment.find({ doctor: req.params.doctorName });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});

router.post('/send-confirmation', async (req, res) => {
  const { email, name, date, time, department, doctor } = req.body;

  const html = `
    <h3>Hi ${name},</h3>
    <p>Your appointment has been confirmed with the following details:</p>
    <ul>
      <li><strong>Department:</strong> ${department}</li>
      <li><strong>Doctor:</strong> Dr. ${doctor}</li>
      <li><strong>Date:</strong> ${date}</li>
      <li><strong>Time:</strong> ${time}</li>
    </ul>
    <p>Thank you for choosing Sneharika Hospitals.</p>
  `;

  try {
    await sendMail({
      to: email,
      subject: 'Your Appointment Confirmation',
      html
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send email' });
  }
});

router.put('/:id/cancel', async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'cancelled' },
      { new: true }
    );

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Send cancellation email
    const emailContent = `
      <p>Dear ${appointment.name},</p>
      <p>Your appointment scheduled on <strong>${appointment.date}</strong> at <strong>${appointment.time}</strong> with <strong>Dr. ${appointment.doctor}</strong> in <strong>${appointment.department}</strong> department has been <span style="color: red;"><strong>cancelled</strong></span>.</p>
      <p><strong>We will reschedule your booking and reach out to you soon. Kindly wait for our response.</strong></p>
      <p>Thank you,<br>Sneharika Hospitals</p>
    `;

    await sendMail({
      to: appointment.email,
      subject: 'Your Appointment has been Cancelled',
      html: emailContent,
    });

    res.status(200).json({ message: 'Appointment cancelled and email sent.' });
  } catch (error) {
    console.error('Error cancelling appointment:', error);
    res.status(500).json({ message: 'Failed to cancel appointment.' });
  }
});
module.exports = router;
