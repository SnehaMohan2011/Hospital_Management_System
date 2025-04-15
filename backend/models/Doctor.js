const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: Number, default: 0 }, 
  gender: { type: String, enum: ["Male", "Female", "Other"], default: "Other" }, 
  timeSlots: {
    type: [String],
    default: [], 
  }, 
});



module.exports = mongoose.model("Doctor", doctorSchema);
