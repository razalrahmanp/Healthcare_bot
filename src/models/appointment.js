const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  doctorName: { type: String, required: true },
  appointmentTime: { type: String, required: true },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
