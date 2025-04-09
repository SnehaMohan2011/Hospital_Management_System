const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: Number,
  gender: String,
});

module.exports = mongoose.model("Doctor", doctorSchema);
