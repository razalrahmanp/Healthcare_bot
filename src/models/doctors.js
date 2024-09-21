const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  availableSlots: [String], // Time slots in "HH:MM AM/PM" format
});

module.exports = mongoose.model('Doctor', doctorSchema);
