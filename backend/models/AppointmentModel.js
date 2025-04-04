const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    gender: String,
    age: String,
    department: String,
    doctor: String,
    date: String,
    time: String
});

module.exports = mongoose.model("Appointment", appointmentSchema);
