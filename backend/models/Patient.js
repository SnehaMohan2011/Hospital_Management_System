const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }, // Reference to doctor
    source: { 
      type: String, 
      required: true, 
      enum: ['online', 'offline'], // To differentiate between online and offline booking
    },
    status: { 
      type: String, 
      default: 'pending', // Can be 'pending', 'confirmed', 'cancelled', etc.
    },
    notes: { type: String, default: '' },  // Notes field for patient record
  },
  { timestamps: true }
);

module.exports = mongoose.model('Patient', patientSchema);
