const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },  // Reference to doctor
    source: { type: String, required: true },
    notes: { type: String, default: '' },  // Notes field for patient record
  },
  { timestamps: true }
);

module.exports = mongoose.model('Patient', patientSchema);
