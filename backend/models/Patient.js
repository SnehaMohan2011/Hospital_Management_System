const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' }, 
    source: { 
      type: String, 
      required: true, 
      enum: ['online', 'offline'], 
    },
    status: { 
      type: String, 
      default: 'pending', 
    },
    notes: { type: String, default: '' },  
  },
  { timestamps: true }
);

module.exports = mongoose.model('Patient', patientSchema);
