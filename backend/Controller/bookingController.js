const Appointment = require('../models/AppointmentModel'); 

const handleBooking = async (req, res) => {
  const { doctorId, patientName, patientEmail, patientPhone, appointmentDate } = req.body;

  try {
    
    const newAppointment = new Appointment({
      doctor: doctorId,
      patientName,
      patientEmail,
      patientPhone,
      appointmentDate
    });

  
    await newAppointment.save();

    res.status(200).json({ message: 'Booking successful', booking: newAppointment });
  } catch (error) {
    res.status(500).json({ error: 'Error processing booking' });
  }
};

module.exports = { handleBooking };
