const mongoose = require('mongoose');

const offlinePatientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    visitDate: { type: Date, required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },  
    notes: { type: String, default: '' }, 
    source: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('OfflinePatient', offlinePatientSchema);
