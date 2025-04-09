const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  patientName: String,
  date: { type: String, required: true }, // format: "YYYY-MM-DD"
  time: String
});

module.exports = mongoose.model("Booking", bookingSchema);
